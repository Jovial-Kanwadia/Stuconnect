import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import * as fs from 'fs';
import * as path from 'path';
import { ApiResponse } from "../utils/ApiResponse";
import { v4 as uuidv4 } from 'uuid';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import 'dotenv/config';
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from "@langchain/pinecone";
import GPTfile from "../models/gptFile.model";

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!);

const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACEHUB_API_KEY,
    model: 'dunzhang/stella_en_1.5B_v5',
});

interface EmbeddedDataType {
    id: string;
    values: any;
    metadata: any;
}

let embeddedData: EmbeddedDataType[] = [];

async function getEmbeddings(texts: string[]) {
    try {
        console.log("Embedding Started");
        const embedding = await embeddings._embed(texts);
        console.log('Embedding:', embedding[0].length);
        return embedding[0];
    } catch (error) {
        console.error('Error fetching embeddings:', error);
        throw error;
    }
}

async function createChunksAndEmbed(data: string): Promise<EmbeddedDataType[]> {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 80,
    });

    // Ensure you await the splitText method if it returns a Promise
    const chunks = await splitter.splitText(data);

    const embeddedChunks = await Promise.all(
        chunks.map(async (chunk) => {
            const values = await getEmbeddings([chunk]);
            const metadata = { chunk, timestamp: new Date().toISOString() };

            return {
                id: uuidv4(),
                values,
                metadata,
            };
        })
    );

    // Add the embedded chunks to the global embeddedData array
    embeddedData = embeddedChunks;
    console.log("Chunks created and embedded data prepared.");
    console.log(embeddedData);

    return embeddedData;
}


const pushDataToPinecone = async (pineconeInput: EmbeddedDataType[]) => {
    try {
        const namespaceId = uuidv4();
        await pineconeIndex.namespace(namespaceId).upsert(pineconeInput);
        const stats = await pineconeIndex.describeIndexStats();
        console.log(stats);
        return namespaceId;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getFileCreateEmbeddingStoreInPinecone = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { filePath } = req.body;

    if (!filePath) {
        throw new ApiError(400, "Cannot Get File Path");
    }

    try {
        const file = path.resolve(filePath);
        const data = await fs.promises.readFile(file, 'utf8');

        if (data) {
            const pineconeInput = await createChunksAndEmbed(data);
            const namespaceId = await pushDataToPinecone(pineconeInput);

            // Save the file data in MongoDB
            const savedFile = await GPTfile.create({
                fileName: path.basename(filePath),
                pineconeNamespace: namespaceId,
            });

            return res.status(200).json(new ApiResponse(200, { savedFile }, "File processed and data stored in Pinecone successfully"));
        } else {
            throw new ApiError(404, "File content is empty.");
        }
    } catch (error) {
        console.error('Error processing file:', error);
        throw new ApiError(500, "Error processing file.");
    }
});

const fetchSimilarChunkFromPinecone = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { query, namespaceId } = req.body;
    if(!query){
        throw new ApiError(400, "Cannot get Query");
    }
    if(!namespaceId){
        throw new ApiError(400, "Cannot get NamespaceId");
    }
    try {
        const queryEmbeddings = await getEmbeddings([query])
        const queryResponse = await pineconeIndex.namespace(namespaceId).query({
            topK: 5,
            vector: queryEmbeddings,
            includeMetadata: true
        });
        // queryResponse.matches.map((data) => {
        //     console.log(data.score);
        //     console.log(data.metadata);
        // })
        return res.status(200).json(new ApiResponse(200, { queryResponse }, "Query to Pinecone successfull"));
    } catch (error) {
        console.log(error);
    }
})

export {
    getFileCreateEmbeddingStoreInPinecone,
    fetchSimilarChunkFromPinecone,
};
