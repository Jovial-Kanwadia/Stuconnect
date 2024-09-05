# Stuconnect

Developed an advanced social collaboration platform that replicates and extends the functionality of modern social media applications with several cutting-edge integrations:

1. RAG Application Integration: Implemented a sophisticated file and document interaction system. Users can upload various documents, which are embedded using Hugging Face models and stored in Pinecone DB. Leveraging OpenAI's LLM, users can query and interact with their documents in real-time, facilitating a dynamic user experience.

2. Robust JWT Authentication: Architected a secure authentication mechanism using JWT tokens (both access and refresh). Integrated API interceptors to ensure secure communication, managing both public and protected routes across the platform.

3. Dynamic Server and Channel Management: Engineered the ability for users to create and manage multiple servers and channels, including text, audio, and video channels, akin to contemporary social media platforms. Real-time chat and multimedia interactions are supported through the integration of Socket.IO and LiveKit, offering seamless communication and collaboration.

4. Comprehensive State Management: Utilized Redux Toolkit to handle complex state management across the frontend, ensuring a responsive and efficient user interface. Implemented cloud-based file and image uploads via Multer and Cloudinary, enabling users to manage content effectively.

5. Granular Access Control: Designed and enforced a multi-tiered access control system with roles such as Admin, Moderator, and Member. This system governs the creation of channels and modifications to servers, maintaining a secure and organized environment.

6. Modern UI/UX Design: Crafted a visually appealing and highly functional user interface using Tailwind CSS and Shadcn. Integrated smooth animations and transitions, enhancing the overall user experience and making the application both intuitive and engaging.


## This guide will help you set up the project locally.

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stuconnect.git
cd stuconnect

cd backend
```
```bash
MONGODB_URI="your_mongodb_uri"
DB_NAME="your_database_name"
PORT=your_port
CORS_ORIGIN="your_frontend_url"

ACCESS_TOKEN_SECRET="your_access_token_secret"
ACCESS_TOKEN_EXPIRY="your_access_token_expiry"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"
REFRESH_TOKEN_EXPIRY="your_refresh_token_expiry"

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

LIVEKIT_URL="your_livekit_url"
LIVEKIT_API_KEY="your_livekit_api_key"
LIVEKIT_API_SECRET="your_livekit_api_secret"
```
```bash
npm install
```
```bash
cd ../frontend
```
```bash
VITE_BACKEND_URL="your_backend_url"
VITE_LIVEKIT_URL="your_livekit_url"
VITE_OPENAI_API_KEY="your_openai_api_key"
```
```bash
npm install

```
