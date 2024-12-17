# Authentication Application

A full-stack authentication application built with React (Vite) and NestJS, featuring secure user authentication, logging, and best security practices.

## Features

- User registration and authentication
- JWT-based authentication
- Secure password handling
- Rate limiting and CORS protection
- Comprehensive request logging
- Input validation and sanitization
- Responsive design with Tailwind CSS
- Type safety with TypeScript

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

## Project Structure

```bash
auth-app/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── logger/         # Logging module
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── lib/           # Utilities and hooks
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Root component
│   ├── .env               # Environment variables
│   └── package.json       # Frontend dependencies
│
└── README.md
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configurations:
```bash
MONGODB_URI=mongodb://localhost:27017/auth-app
JWT_SECRET=your-super-secret-key-here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_EXPIRATION=1d
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

5. Start MongoDB:
```bash
mongod
```

6. Start the development server:
```bash
npm run start:dev
```

The backend server will be running on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file:
```
VITE_API_URL=http://localhost:3001
```

5. Start the development server:
```bash
npm run dev
```

The frontend application will be running on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
  - Body: 
    ```json
    {
      "email": "user@example.com",
      "name": "John Doe",
      "password": "SecurePass123!"
    }
    ```
  - Response: `{ token: string, user: { id: string, email: string, name: string } }`

- `POST /auth/signin` - Authenticate user
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "SecurePass123!"
    }
    ```
  - Response: `{ token: string, user: { id: string, email: string, name: string } }`

## Password Requirements

- Minimum length of 8 characters
- Must contain at least 1 letter
- Must contain at least 1 number
- Must contain at least 1 special character (@$!%*#?&)

## Security Features

- JWT Authentication with secure token handling
- Password hashing using bcrypt with salt rounds
- Rate limiting to prevent brute force attacks
- CORS protection with configured origins
- Helmet security headers
- Input validation and sanitization using class-validator
- Request logging with timestamp and context
- Environment variable protection
- XSS protection
- CSRF protection

## Development

### Available Scripts

Backend:
```bash
npm run start:dev    # Start development server
npm run build       # Build for production
npm run start:prod  # Run production build
npm run lint        # Run ESLint
```

Frontend:
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Logging

The application includes comprehensive logging:
- Authentication attempts (success/failure)
- Security events
- API requests
- Error tracking
- Performance monitoring

### Error Handling

The application implements centralized error handling:
- Validation errors
- Authentication errors
- Database errors
- Network errors
- Rate limiting errors

## Built With

### Backend
- NestJS - Progressive Node.js framework
- MongoDB with Mongoose - Database
- JWT - Authentication
- Class-validator - Input validation
- Winston - Logging
- Helmet - Security headers
- Compression - Response compression
- Rate-limiting - Request limiting

### Frontend
- React 18 with Vite - UI framework
- React Router 6 - Routing
- React Query - Data fetching
- React Hook Form - Form handling
- Zod - Schema validation
- Tailwind CSS - Styling
- Axios - HTTP client
- TypeScript - Type safety

## Best Practices

- Clean code architecture
- Proper error handling
- Comprehensive logging
- Security best practices
- Type safety
- Code splitting
- Performance optimization
- Responsive design
- Proper state management
- Form validation

## Troubleshooting

Common issues and solutions:
1. MongoDB connection issues:
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify network connectivity

2. JWT token issues:
   - Check JWT_SECRET in .env
   - Verify token expiration
   - Clear browser storage

3. CORS issues:
   - Verify FRONTEND_URL in backend .env
   - Check browser console for errors
   - Ensure proper CORS configuration
