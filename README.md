# request-tracker-backend
Backend API for the Feature Request Tracker web application using Node.js, Express, and MySQL

# Feature Request Tracker - Backend

This repository contains the backend API for the Feature Request Tracker application. It provides endpoints to manage feature requests including creating, updating, deleting, and filtering by status.

## ⚙️ Technology Stack

-     Node.js    - JavaScript runtime
-     Express.js    - Web framework for building RESTful APIs
-     MySQL     - Relational database for storing feature requests
-     dotenv    - For environment variable management
-     nodemon    (dev) - Auto-restarting server during development

## 🧩 Features / Endpoints

- `GET /features` - Retrieve all feature requests
- `GET /features/:id` - Retrieve a single feature request by ID
- `POST /features` - Create a new feature request
- `PUT /features/:id` - Update a feature request
- `PATCH /features/:id` - Update only the status of a feature request
- `DELETE /features/:id` - Delete a feature request

Each feature request includes:

- `title` (string)
- `description` (string)
- `priority` (Low / Medium / High)
- `status` (Open / In Progress / Completed)
- `created_at` (datetime)

## 🚀 Setup Instructions

1. Clone the repository:

```bash
git clone <repo-url>
cd feature-request-tracker-backend
    2. Install dependencies:
npm install
    3. Create a .env file with your database configuration:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=request_tracker
T_NAME=request_tracker
PORT=9000
    4. Import the database schema (database.sql) to MySQL.
    5. Start the backend server:

npx nodemon server.js
The API will run on http://localhost:9000.

