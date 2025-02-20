# React & Express Microservices Application

## Overview
This project is a microservices-based web application built with React for the frontend and Express.js for the backend. It includes authentication using JWT and allow users to do this:

### User can login using his email, password
![Screenshot from 2025-02-20 11-39-25](https://github.com/user-attachments/assets/13cb7e7e-a549-4ca9-b882-757e3085c4cf)


### User can register if he don't have an account
![Screenshot from 2025-02-20 11-39-15](https://github.com/user-attachments/assets/6840ad47-3650-42ff-9521-09fffabc0e6d)

### View available prodcuts and view the posted products by user and can post new products (can delere the posted products by user)
![Screenshot from 2025-02-20 12-05-27](https://github.com/user-attachments/assets/931824cf-7c40-484c-a950-0ca6cb094200)

![Screenshot from 2025-02-20 11-44-40](https://github.com/user-attachments/assets/ede4e02c-b3f9-4a0d-8904-1ab962a8c35d)
![Screenshot from 2025-02-20 11-43-43](https://github.com/user-attachments/assets/71168070-76c1-4d5b-bf45-f8cb1490246a)

### Place and manage commands (view the total price for every command, can delete the command)
![Screenshot from 2025-02-20 11-54-10](https://github.com/user-attachments/assets/284a478d-c68a-447f-b82f-19ffc3f9106e)


## Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend (Express)
- Express.js
- JWT for authentication
- Microservices architecture using separate services for authentication, products, and commands

## Microservices Architecture
The backend is split into different microservices:
1. **user-services** - Handles user login with JWT and registration and also logout.
2. **product-services** - Manages product creation, listing, and deletion and also price total for every command.
3. **command-services** - Handles user commands, calculating total prices by sending requests to product-services and managing order deletions.

Each service communicates through REST APIs.

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB

### Clone the Repository
```sh
git clone https://github.com/sofyanBoukir/Mern-microservices.git
cd Mern-microservices
```

### Backend Setup
1. Navigate to each microservice directory (`user-services`, `product-services`, `command-services`).
2. Install dependencies:
```sh
npm install
```
3. The .env is already setted up in backend for every service

4. Run each service:
```sh
npm start
```

### Frontend Setup
1. Navigate to the React app directory:
```sh
cd frontend
```
2. Install dependencies:
```sh
npm install
```
3. Set up the .env file in front-end
  ```
  VITE_USER_SERVER=http://localhost:3000
  VITE_PRODUCT_SERVER=http://localhost:3001
  VITE_COMMAND_SERVER=http://localhost:3002
```
3. Start the React development server:
```sh
npm run dev
```

## API Endpoints
### user-services ```http://localhost:3000```
- **POST** `/login` -  Authenticate a user (email,password) and return a JWT token
- **POST** `/register` - Register new user (Full name, username, email, password)
- **POST** `/logout` - Logout a user (jwt token needed)

> *Note:* All the next endpoints needs a valid JWT token (needs to be authenticated)

### product-services ```http://localhost:3001```
- **GET** `/getProducts` - Retrieve all products
- **GET** `/getMyProducts` - Get all my posted products
- **GET** `/getPriceTotal` - Get the price total for a command (list of products)
- **POST** `/addProduct` - Post new product (name,description,image,price)
- **DELETE** `/deleteProduct/:productId` - Delete a product

### command-services ```http://localhost:3002```
- **GET** `/getCommands` - Get the user commands
- **POS** `/addCommand` - Command products requires (list of products)
- **DELETE** `/deleteCommand/:commandId` - Delete a command

### HOPE YOU LIKE IT 
