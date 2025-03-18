# Student Management System API

## 📌 Project Overview

This is a **Student Management System API** built with **Express.js** and **TypeScript**, using **MongoDB Atlas** as the database. The system provides functionalities for **admin and students**, ensuring secure authentication via **JWT tokens**. Admins can add students and assign tasks, while students can log in to view and manage their assigned tasks.

## 🚀 Features

### **Admin Panel**

- ✅ Admin can log in using predefined credentials.
- ✅ Admin can add students with **name, email, department, and password**.
- ✅ Admin can assign tasks to students with a **due date**.
- ✅ Secure routes for admin-only actions.

### **Student Interface**

- ✅ Students can log in using their **email and password**.
- ✅ Students can view the **tasks assigned to them**.
- ✅ Students can update task status (**pending, overdue, completed**).

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Token (JWT)
- **Validation**: Express Validator
- **Logging**: Morgan
- **Deployment**: GitHub Actions

## 📦 Installation & Setup

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/shinasvb19/student-management-system.git
cd student-management-system
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**

Create a `.env` file and add the following:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ **Run the Server**

```sh
npm run serve
```

**Run server in production**

```sh
npm start
```

## 🔑 API Endpoints

### **Authentication**

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | admin/signin   | Admin Login   |
| POST   | student/signin | Student Login |

### **Admin Routes** (Protected ✅)

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | /admin/create-student | Add a new student       |
| GET    | /admin/students       | get all student details |
| POST   | /admin/assign-task    | assign task to students |

### **Student Routes**

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| GET    | /student/task         | Get tasks assigned to student |
| PATCH  | /student//update-task | Update task status            |

## 📜 API Documentation

📄 **Postman Collection**: [API Documentation] link click below

https://documenter.getpostman.com/view/23384305/2sAYkDPMEb

## 📝 Sample API Request

### **Admin Login**

```http
POST /auth/admin
Content-Type: application/json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

### **Response**

```json
{
  "token": "your_jwt_token"
}
```
