# This guide will help you set up the project locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- Git
- Node.js (recommended version 18.x or later)
- npm (Node Package Manager)
- A GitHub account

## 1. Fork the Repository

1. Navigate to the project repository on GitHub
2. Click the "Fork" button in the top-right corner of the page
   - This creates a copy of the repository in your GitHub account
3. Choose your personal account as the destination for the fork

## 2. Clone Your Forked Repository

```bash
# Replace <your-username> with your GitHub username
git clone https://github.com/<your-username>/stuconnect.git

# Navigate to the project directory
cd stuconnect
```

## 3. Backend Setup

### 3.1 Environment Configuration

Navigate to the backend directory:

```bash
cd backend
```

Create a `.env` file with the following content:

```env
MONGODB_URI="mongodb+srv://jovialkanwadia:geimpPob0KJZJc7b@cluster0.eetfiei.mongodb.net/"
DB_NAME="stuconnect"
PORT=8000
CORS_ORIGIN="http://localhost:5173"

ACCESS_TOKEN_SECRET=13VnAJASy89xPLa7CCAOAh4lDx54JXss
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=xPxsTlzfiXdhCQArucCGeE7j8sTWkkEO
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME="dndtcrqmf"
CLOUDINARY_API_KEY="178886428461539"   
CLOUDINARY_API_SECRET="k4McFfI2W717ott4o1LzNBTN9tA" 

LIVEKIT_URL="wss://stuconnect-qnglxjxo.livekit.cloud"
LIVEKIT_API_KEY="APINFKDAUeHrhPK"
LIVEKIT_API_SECRET="2nmtFQuGqzh0Uj4xUYKmJeD9wlTOeT03dqMjrK7qbEu"

PINECONE_API_KEY="c626590f-efb4-4cf1-997d-52128d0ed8f8"
HUGGINGFACEHUB_API_KEY="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"
PINECONE_INDEX=test
```

> **Note:** These environment variables have been pre-configured for you. Do not share these credentials publicly.

### 3.2 Install Backend Dependencies

```bash
# Install required npm packages
npm install
```

## 4. Frontend Setup

### 4.1 Environment Configuration

Navigate to the frontend directory:

```bash
cd ../frontend
```

Create a `.env` file with the following content:

```env
VITE_BACKEND_URL="http://localhost:8000/api/v1"
VITE_LIVEKIT_URL="wss://stuconnect-qnglxjxo.livekit.cloud"
VITE_OPENAI_API_KEY=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
```

> **Note:** These environment variables have been pre-configured for you. Do not share these credentials publicly.

### 4.2 Install Frontend Dependencies

```bash
# Install required npm packages
npm install
```

## 5. Running the Application

### 5.1 Start Backend Server

```bash
# From the backend directory
cd backend
npm run build
npm run start
```

### 5.2 Start Frontend Development Server

```bash
# From the frontend directory
cd ../frontend
npm run dev
```

## 6. Accessing the Application

- Backend will typically run on `http://localhost:8000`
- Frontend will typically run on `http://localhost:5173`

## 7. Contributing

1. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-roll-no
   ```
2. Make your changes
3. Commit your changes
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request from your fork to the original repository
