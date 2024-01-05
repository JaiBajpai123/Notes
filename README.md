# Secure Notes App

Secure Notes App is a simple application built with Express.js and MongoDB. It provides secure user authentication, note creation, updating, deleting, and searching functionalities.

## Tools Used

- **Express.js**: A web application framework for Node.js that simplifies the development of robust APIs.

- **MongoDB**: A NoSQL database used to store user information and notes.

- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution to model application data.

- **JWT (JSON Web Token) Authentication**: Used for secure user authentication and authorization.

- **Request Throttling and Rate Limiting**: Implemented to handle high traffic and improve performance.

- **Text Indexing for Search**: Utilized MongoDB's text indexing for efficient keyword-based searches.

- **Testing with Mocha**: A JavaScript testing framework for writing unit and integration tests.

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/secure-notes-app.git
2.Switch to master branch.

3.cd secure-notes-app

4.npm install

5.Create a .env file in the project root with the following content:
  MONGODB_URI=mongodb://localhost:27017/secure-notes-db
  
6.npm start to start the server.


