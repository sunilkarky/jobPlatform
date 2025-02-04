## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/sunilkarky/jobPlatform.git
   cd jobPlatform
   ```

2. **Set up environment variables**:

   - Create a `.env` file in the [backend](http://_vscodecontentref_/23) directory based on the [.env.sample](http://_vscodecontentref_/24) file:
     ```sh
     cp backend/.env.sample backend/.env
     ```
   - Fill in the required environment variables in the [.env](http://_vscodecontentref_/25) file:
     ```env
     JWT_SECRET=your_jwt_secret
     MONGODB_URI=your_mongodb_uri
     ADMIN_PASSWORD=your_admin_password
     ADMIN1_PASSWORD=your_admin1_password
     ```

3. **Install dependencies**:
   - For the backend:
     ```sh
     cd backend
     npm install
     ```
   - For the frontend:
     ```sh
     cd ../frontend/frontend
     npm install
     ```

### Running the Application

1. **Run the backend**:

   - Start the backend server:
     ```sh
     cd backend
     npm start
     ```

2. **Run the frontend**:

   - Start the frontend development server:
     ```sh
     cd ../frontend/frontend
     npm run dev
     ```

3. **Access the application**:
   - Open your browser and navigate to `http://localhost:5173` to access the frontend.
   - The backend server will be running on `http://localhost:3000`.
