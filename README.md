# Simple Image Uploader Web Application

This is a simple web application built using Next.js, MongoDB, Tailwind CSS, and React. It allows users to sign up, log in, and upload images securely.

## Features

- User authentication: Users can sign up for an account and log in securely.
- Image upload: Authenticated users can upload images to the platform.
- Secure storage: Uploaded images are securely stored in MongoDB.
- Authorization: Only authenticated users can access certain routes and upload images.

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js, Next.js, MongoDB (with Mongoose)
- Authentication: JWT (JSON Web Tokens), Bcrypt

## Project Setup

To run this project locally, follow these steps:

1. Extract the zip file or clone the repository using Git:

   ```
   git clone https://github.com/rachit-bharadwaj/simple-image-uploader.git
   ```

2. Install dependencies:

   ```
   cd simple-image-uploader
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```
   MONGO_URI = <your_mongodb_uri>
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. Sign up for a new account or log in if you already have an account.
2. Once logged in, you can view as well as upload images.
3. Uploaded images will be displayed on the platform.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Feel free to customize the content according to your project's specifics. This README provides basic information about the project, its features, installation instructions, and how to use it.