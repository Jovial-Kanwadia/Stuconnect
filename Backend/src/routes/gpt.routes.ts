import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { 
    getFileCreateEmbeddingStoreInPinecone,
    fetchSimilarChunkFromPinecone
} from '../controllers/embedding.controller'

const router = Router()

router.route("/getFileCreateEmbeddingStoreInPinecone").post( getFileCreateEmbeddingStoreInPinecone)

router.route("/fetchSimilarChunkFromPinecone").post( fetchSimilarChunkFromPinecone)

export default router