# zeotap_assignment_1

This repository contains the code for the Zeotap assignment. It includes a backend server for rule management and a frontend application for rule evaluation and visualization.

## Prerequisites

Ensure to have met the following requirements:

- Node.js and npm installed on machine. You can download them from [Node.js](https://nodejs.org/).
- MongoDB installed and running. You can download it from [MongoDB](https://www.mongodb.com/).

## Cloning the Repository

To clone the repository, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:

git clone https://github.com/Vermaji8620/zeotap_assignment_1.git

-----------------------------------------------------------------------------------------------

## ( FOR ROOT FOLDER, i.e, backend part)

Make an account on MongoDB and copy your own connection string from there after making an instance of database ( it should be of the below form )

mongodb+srv://username:password@cluster0.yvftnur.mongodb.net

Run 'cd zeotap_assignment_1' in the terminal or open VSCode and run in its own terminal

Again run 'npm install' in the terminal

Make a .env file in the root folder and copy paste the .env.sample file variables into the .env file ( such as below )

eg. - MONGODB_URI=mongodb+srv://username:password@cluster0.yvftnur.mongodb.net/zeotap_assignment_1
    - PORT=3000

Again run 'nodemon ./server.js' in the terminal

Again run 'npm install' in the terminal

After running the above command, something as such should appear

- Server is running on port 3000
- MongoDB connected successfully

The above means that backend is successfully running 

-------------------------------------------------------------------------------------------------

