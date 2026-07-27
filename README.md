# CollabPad 🚀

CollabPad is a modern, real-time, infinite digital whiteboard designed for distributed teams to visually brainstorm, map workflows, and collaborate instantly. Say goodbye to fragmented feedback and static screenshots.

---

## 🛠️ Tech Stack

### Frontend
- **React (v19)**: Built with dynamic page routing and interactive states.
- **Vanilla CSS**: Styled with a vibrant, modern dark-mode aesthetic utilizing glassmorphism and subtle micro-animations.

### Backend
- **Spring Boot (v3.3.x)** & **Java 21/24**: Restful API backend architecture.
- **Spring Security 6 & BCrypt**: Robust authentication flow with secure password hashing.
- **MongoDB**: Used for persistence of user details and workspaces.
- **dotenv-java**: Manages database credentials and connection strings securely via `.env`.

---

## 📁 Project Structure

```text
CollabPad/
├── frontend/               # React client application
│   ├── src/
│   │   ├── App.js          # Core routing, Auth, & Canvas views
│   │   ├── App.css         # Component & custom canvas styling
│   │   └── index.css       # Core design system tokens and fonts
│   └── package.json
└── backend/                # Spring Boot REST API
    ├── src/main/java/com/collabpad/backend/
    │   ├── config/         # Security Config (CORS & OPTIONS routes)
    │   ├── controller/     # AuthController & GlobalExceptionHandler
    │   ├── dto/            # Request/Response Transfer Objects
    │   ├── model/          # MongoDB User Document
    │   └── repository/     # MongoRepository interface
    ├── src/main/resources/ # application.properties
    ├── .env                # MongoDB Connection URI properties
    └── pom.xml
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Java Development Kit (JDK) 17 or higher** (JDK 21/24 recommended)
- **Node.js** (v18+)
- **MongoDB** running locally or an Atlas connection URI

---

### 2. Running the Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create or customize the `.env` file in the root of the `backend/` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/collabpad
   ```
3. Run the Spring Boot application using the provided Maven wrapper:
   - **Windows (PowerShell)**:
     ```powershell
     .\maven\bin\mvn spring-boot:run
     ```
   - **Linux / macOS**:
     ```bash
     mvn spring-boot:run
     ```

The server will start on `http://localhost:8080`.

---

### 3. Running the Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install the node modules:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm start
   ```

Open `http://localhost:3000` in your browser to view the application.
