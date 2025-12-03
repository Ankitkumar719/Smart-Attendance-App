
# Smart Attendance System

This is a full-stack Smart Attendance System built with a Node.js backend, a React-based web frontend, and a React Native mobile app for students.

## Project Structure

```
/
├── backend/          # Node.js, Express, an API
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── server.js
├── frontend/         # React Web App
│   └── src/
│       ├── components/
│       └── pages/
├── mobile/           # React Native App
│   └── screens/
├── schema.sql        # PostgreSQL database schema
└── README.md         # This file
```

---

## 1. Backend Setup (Node.js)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install express pg jsonwebtoken bcryptjs cors qrcode
    ```

3.  **Set up the PostgreSQL Database:**
    *   Make sure you have PostgreSQL installed and running.
    *   Create a new database named `smart_attendance`.
    *   Run the `schema.sql` file provided in the root directory to create all the necessary tables and roles.

4.  **Configure Database Connection:**
    *   Open `backend/config/db.js`.
    *   Update the connection details with your PostgreSQL username and password.

5.  **Configure JWT Secrets:**
    *   In `backend/controllers/authController.js`, replace `'yourSecretKey'` with a strong, unique secret for user authentication.
    *   In `backend/controllers/facultyController.js`, replace `'yourQrSecretKey'` with a different strong, unique secret for QR code generation.

6.  **Start the backend server:**
    ```bash
    node server.js
    ```
    The API server should now be running on `http://localhost:5000`.

---

## 2. Frontend Setup (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install react react-dom react-router-dom axios qrcode.react
    ```

3.  **Set up API Proxy:**
    *   In your `frontend/package.json`, add a proxy to forward API requests to the backend:
        ```json
        "proxy": "http://localhost:5000"
        ```

4.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    The React app should now be running, and you can access it in your browser, typically at `http://localhost:3000`.

---

## 3. Mobile App Setup (React Native with Expo)

1.  **Navigate to the mobile directory:**
    ```bash
    cd ../mobile
    ```

2.  **Install dependencies:**
    ```bash
    npm install expo @react-native-async-storage/async-storage expo-barcode-scanner axios
    ```

3.  **Configure the API Endpoint:**
    *   You **must** replace the placeholder `YOUR_COMPUTER_IP` in `mobile/screens/LoginScreen.js`, `mobile/screens/ScanQRScreen.js`, and `mobile/screens/ViewAttendanceScreen.js`.
    *   Find your computer's local network IP address (e.g., `192.168.1.10`). The mobile app needs this to communicate with your local backend server.

4.  **Start the Expo development server:**
    ```bash
    npm start
    ```

5.  **Run the app:**
    *   Install the **Expo Go** app on your physical iOS or Android device.
    *   Scan the QR code generated in the terminal with your phone's camera or the Expo Go app.
    *   This will open the Smart Attendance mobile app on your device.

---

## Core System Flow

1.  **Login:** Users select their role (Admin, Faculty, or Student) and log in.
2.  **Faculty:** A faculty member creates a class session, which generates a dynamic, refreshing QR code.
3.  **Student:** Students use the mobile app to scan the QR code, marking their attendance in real-time.
4.  **Admin/Faculty/Student:** All roles can view relevant attendance data through their respective dashboards.
