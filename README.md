# Resume Generator

This is a web application that allows users to generate professional resumes.

-----

## Description

The Resume Generator is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Next.js for the frontend. It provides users with a simple and intuitive interface to create, customize, and download their resumes.

-----

## Features

  * **User Authentication**: Secure user authentication and authorization.
  * **Resume Creation**: Create and edit resumes with various sections like personal details, education, work experience, skills, and projects.
  * **Multiple Templates**: Choose from a variety of professional resume templates.
  * **Image Upload**: Upload a profile picture to be included in the resume, with support for Cloudinary.
  * **PDF Generation**: Download the generated resume as a PDF.

-----

## Tech Stack

### Frontend

  * **Framework**: Next.js
  * **UI Libraries**: React, Framer Motion, Tailwind CSS, Lucide React, React Icons
  * **HTTP Client**: Axios
  * **State Management**: React Hooks
  * **Other**: Three.js for 3D graphics, React Intersection Observer, React Scroll for smooth scrolling effects.

### Backend

  * **Framework**: Express.js
  * **Database**: MongoDB with Mongoose
  * **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
  * **File Uploads**: Multer and Cloudinary for image storage
  * **Validation**: Zod for data validation
  * **Other**: Cookie Parser for handling cookies, CORS for cross-origin resource sharing, Dotenv for environment variables.

-----

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * Node.js
  * npm
  * MongoDB

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/resume_genrator.git
    ```
2.  Install NPM packages for the client
    ```sh
    cd client
    npm install
    ```
3.  Install NPM packages for the server
    ```sh
    cd ../server
    npm install
    ```

### Running the application

1.  **Start the server:**
      * In the `server` directory, create a `.env` file with your environment variables (e.g., MongoDB connection string, JWT secret, Cloudinary credentials).
      * Run the following command to start the server:
        ```sh
        npm run dev
        ```
2.  **Start the client:**
      * In the `client` directory, create a `.env` file with your environment variables (e.g., API endpoint).
      * Run the following command to start the client:
        ```sh
        npm run dev
        ```

-----

## Available Scripts

### Client

  * `npm run dev`: Runs the app in the development mode.
  * `npm run build`: Builds the app for production.
  * `npm run start`: Starts the production server.
  * `npm run lint`: Lints the code.

### Server

  * `npm run dev`: Runs the server in development mode using `ts-node`.
  * `npm run build`: Compiles the TypeScript code to JavaScript.
  * `npm run start`: Starts the production server.
  * `npm test`: Runs the test suite.

-----

## Dependencies

### Client Dependencies

  * axios: ^1.12.2
  * cloudinary: ^1.41.3
  * dotenv: ^17.2.1
  * framer-motion: ^12.23.24
  * js-cookie: ^3.0.5
  * lucide-react: ^0.545.0
  * multer: ^2.0.2
  * multer-storage-cloudinary: ^4.0.0
  * next: 15.4.3
  * react: 19.1.0
  * react-dom: 19.1.0
  * react-icons: ^5.5.0
  * react-intersection-observer: ^9.16.0
  * react-scroll: ^1.9.3
  * scroll: ^3.0.1
  * three: ^0.167.1

### Server Dependencies

  * bcrypt: ^6.0.0
  * bcryptjs: ^3.0.2
  * cloudinary: ^2.7.0
  * cookie-parser: ^1.4.7
  * cors: ^2.8.5
  * dotenv: ^17.2.3
  * express: ^5.1.0
  * jsonwebtoken: ^9.0.2
  * mongoose: ^8.16.4
  * multer: ^2.0.2
  * multer-storage-cloudinary: ^4.0.0
  * zod: ^4.0.8

-----

## DevDependencies

### Client DevDependencies

  * @eslint/eslintrc: ^3
  * @tailwindcss/postcss: ^4
  * @types/multer: ^2.0.0
  * @types/node: ^20
  * @types/react: ^19
  * @types/react-dom: ^19
  * eslint: ^9
  * eslint-config-next: 15.4.3
  * tailwindcss: ^4
  * typescript: ^5

### Server DevDependencies

  * @types/bcrypt: ^6.0.0
  * @types/bcryptjs: ^2.4.6
  * @types/cookie-parser: ^1.4.9
  * @types/cors: ^2.8.19
  * @types/express: ^5.0.3
  * @types/jsonwebtoken: ^9.0.10
  * @types/multer: ^2.0.0
  * @types/node: ^24.1.0
  * nodemon: ^3.1.10
  * ts-node: ^10.9.2
  * ts-node-dev: ^2.0.0
  * typescript: ^5.9.3
