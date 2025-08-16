# AgroConnect - Agricultural Marketplace Platform

## Overview
AgroConnect is a comprehensive agricultural marketplace platform that connects farmers with buyers, enabling direct trade of agricultural produce.

## Features
- **User Authentication**: Secure login and registration system
- **Farmer Dashboard**: Upload and manage produce listings
- **Buyer Dashboard**: Browse produce and manage cart
- **Order Management**: Complete order lifecycle management
- **Image Storage**: Secure image upload and storage for produce

## Technology Stack
- **Backend**: Spring Boot (Java)
- **Frontend**: Angular (TypeScript)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Build Tool**: Maven

## Project Structure
```
AgroConnect-3/
├── src/
│   ├── main/
│   │   ├── java/edu/amrita/agroconnect/
│   │   │   ├── controller/     # REST API controllers
│   │   │   ├── service/        # Business logic services
│   │   │   ├── model/          # Data models/entities
│   │   │   ├── repository/     # Data access layer
│   │   │   ├── security/       # JWT authentication
│   │   │   └── config/         # Configuration classes
│   │   ├── resources/          # Configuration files
│   │   └── agroconnect-frontend/ # Angular frontend
│   └── test/                   # Test files
├── pom.xml                     # Maven configuration
└── uploads/                    # Image storage directory
```

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 18+ and npm
- MySQL 8.0+

### Backend Setup
1. Navigate to the project root: `cd AgroConnect-3`
2. Run: `mvn spring-boot:run`

### Frontend Setup
1. Navigate to frontend: `cd src/agroconnect-frontend`
2. Install dependencies: `npm install`
3. Run development server: `ng serve`

## API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/produce` - List all produce
- `POST /api/produce` - Upload new produce
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart

## Contributing
This project is developed as part of the CSE22152 course at Amrita Vishwa Vidyapeetham.

## License
Educational project - not for commercial use. 