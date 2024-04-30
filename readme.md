# Quiz App using Node.js and MySQL

This project serves as an example of API development implementation using Node.js, MySQL, and Express.js. Each part of this project showcases sample code demonstrating how to:

- Establish a database connection with Node.js
- Create simple APIs
- Set up routes for necessary endpoints
- implement authentication and authorization
- Implement RBAC (Role Based Access Control)
- Implement the MVC (Model-View-Controller) concept

## Tech Stack:
- Node.js
- MySQL
- Express.js

## How to Use:

1. **Install Node.js:**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/)

2. **Install Dependencies:**
   - Run the following command to install required dependencies:
     ```bash
     npm install nodemon bcrypt dotenv expressjsonwebtoken mysql uuid
     ```

## Features:

- User authentication with JWT
- CRUD operations for quizzes and questions
- Role-based access control for different user roles
- MVC structure for organized codebase

## Setup:

1. Clone the repository:
   ```bash
   git clone https://github.com/your/repository.git

2. **Install Dependencies:**
   - Run the following command to install required dependencies:
     ```bash
     npm install nodemon bcrypt dotenvexpress jsonwebtoken mysql uuid
     ```

3. **Set Up Your MySQL Database:**
   - Create a MySQL database for the project.
   - Update the `.env` file with your MySQL database credentials:
     ```plaintext
     DB_HOST=your_database_host
     DB_USER=your_database_username
     DB_PASSWORD=your_database_password
     DB_NAME=your_database_name
     ```

4. **Run the Application:**
   - Once you've set up your database and updated the `.env` file, you can run the application using the following command:
     ```bash
     npm start
     ```

5. **Access the API Endpoints:**
   - You can access the API endpoints using a tool like Postman or any web browser.
   
Feel free to explore and modify the code according to your requirements. Happy coding!
