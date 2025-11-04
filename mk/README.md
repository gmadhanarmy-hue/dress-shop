# Dress Shop - Full Stack Application

A responsive online dress shop built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features
- Responsive design for mobile and desktop
- Product browsing and details
- Shopping cart functionality
- Checkout and order placement
- MongoDB database integration
- REST API backend

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB (if not running):
```bash
mongod
```

3. Seed the database with sample products:
```bash
node seed.js
```

4. Start the server:
```bash
npm start
```

5. Open browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `POST /api/orders` - Place an order
- `GET /api/orders/:id` - Get order details

## Project Structure
```
├── server.js          # Express server and API routes
├── public/            # Frontend files
│   ├── index.html     # Main HTML
│   ├── styles.css     # Responsive styles
│   └── app.js         # Frontend JavaScript
├── seed.js            # Database seeding script
├── package.json       # Dependencies
└── .env              # Environment variables
```
