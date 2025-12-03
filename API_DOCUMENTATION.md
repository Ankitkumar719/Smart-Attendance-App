
# Smart Attendance System - API Documentation

This document provides a complete reference for the backend API of the Smart Attendance System.

**Base URL:** `/api`

---

## 1. Authentication (`/auth`)

### `POST /auth/login`

- **Description:** Authenticates a user (admin, faculty, or student) and returns a JWT for session management.
- **Access:** Public
- **Request Body:**
  ```json
  {
    "username": "user_id_here",
    "password": "password_here",
    "role": "admin" | "faculty" | "student"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: Invalid credentials.
  - `500 Internal Server Error`: Server-side error.

### `POST /auth/register`

- **Description:** Registers a new faculty or student user. 
- **Access:** Private (Admin Only)
- **Headers:** `Authorization: Bearer <admin_jwt_token>`
- **Request Body:**
  ```json
  // For Faculty
  {
    "username": "new_faculty_id",
    "password": "new_password",
    "role": "faculty",
    "name": "Dr. Faculty Name",
    "department": "CSE"
  }

  // For Student
  {
    "username": "new_student_id",
    "password": "new_password",
    "role": "student",
    "name": "Student Name",
    "branch": "CSE",
    "semester": 5,
    "section": "A"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "msg": "User registered successfully"
  }
  ```
- **Error Responses:**
  - `403 Forbidden`: User is not an admin.
  - `500 Internal Server Error`.

---

## 2. Admin (`/admin`)

*All admin routes require an admin JWT.*

### `POST /admin/subject`

- **Description:** Adds a new subject to the system.
- **Request Body:**
  ```json
  {
    "name": "Artificial Intelligence",
    "course_code": "CS-601"
  }
  ```
- **Success Response (201 Created):** `{"msg": "Subject added successfully"}`

### `GET /admin/attendance`

- **Description:** Fetches aggregated attendance records with optional filters.
- **Query Parameters:** `branch`, `semester`, `section`, `subject_id`, `date`
- **Example:** `/admin/attendance?branch=CSE&semester=5&date=2023-10-27`
- **Success Response (200 OK):**
  ```json
  [
    {
      "student_name": "John Doe",
      "subject_name": "Data Structures",
      "session_date": "2023-10-27T00:00:00.000Z",
      "scan_time": "2023-10-27T10:05:15.000Z"
    }
  ]
  ```

---

## 3. Faculty (`/faculty`)

*All faculty routes require a faculty JWT.*

### `POST /faculty/sessions`

- **Description:** Creates a new class session to begin an attendance marking process.
- **Request Body:**
  ```json
  {
    "branch": "CSE",
    "semester": 5,
    "section": "A",
    "subject_id": 123,
    "date": "2023-10-27"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "sessionId": 42,
    "msg": "Session created successfully"
  }
  ```

### `GET /faculty/sessions/:id/token`

- **Description:** Generates a new short-lived (30s) JWT and corresponding QR code data for a specific class session.
- **Params:** `:id` (The `sessionId`)
- **Success Response (200 OK):**
  ```json
  {
    "token": "short_lived_qr_jwt",
    "expiresAt": "2023-10-27T10:00:30.000Z"
  }
  ```
- **Error Responses:**
  - `403 Forbidden`: If the faculty does not own the session.

### `GET /faculty/sessions/students`

- **Description:** Checks how many students are enrolled for a given class configuration.
- **Query Parameters:** `branch`, `semester`, `section`
- **Success Response (200 OK):**
  ```json
  {
    "count": 58
  }
  ```

### `GET /faculty/attendance`

- **Description:** Retrieves attendance for classes taught by the logged-in faculty.
- **Query Parameters:** `subject_id`, `date`
- **Success Response (200 OK):** Array of attendance records.

---

## 4. Student (`/student`)

*All student routes require a student JWT.*

### `POST /student/mark`

- **Description:** Submits a scanned QR token to mark attendance. This is the core of the student mobile app flow.
- **Request Body:**
  ```json
  {
    "token": "scanned_short_lived_qr_jwt"
  }
  ```
- **Success Response (201 Created):** `{"msg": "Attendance marked successfully"}`
- **Error Responses:**
  - `400 Bad Request`: Token not provided.
  - `401 Unauthorized`: Token is invalid, expired, or already used.
  - `403 Forbidden`: Student is not enrolled in the class.
  - `409 Conflict`: Attendance already marked for this session.

### `GET /student/attendance`

- **Description:** Retrieves the personal attendance history for the logged-in student, including an overall percentage.
- **Success Response (200 OK):**
  ```json
  {
    "overallPercentage": "85.71",
    "records": [
      {
        "subject": "Data Structures",
        "date": "2023-10-27T00:00:00.000Z",
        "status": "Present"
      },
      {
        "subject": "Data Structures",
        "date": "2023-10-26T00:00:00.000Z",
        "status": "Absent"
      }
    ]
  }
  ```
