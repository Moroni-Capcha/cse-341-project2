# CSE 341 - Project 2: E-Commerce API (Part 2 - Authentication)

REST API built with Node.js, Express, MongoDB, Swagger, and GitHub OAuth 2.0 authentication.

---

## 🌐 Live Deployment Links
- **API Documentation (Swagger UI):** [https://cse-341-project2-vodf.onrender.com//api-docs](https://cse-341-project2-vodf.onrender.com//api-docs)
- **Base API URL:** [https://cse-341-project2-vodf.onrender.com/](https://cse-341-project2-vodf.onrender.com/)

---

## 🔐 Authentication & Endpoints
This API implements GitHub OAuth 2.0 authentication:
- **Public Routes:**
  - `GET /` - Check current authentication status
  - `GET /api-docs` - Interactive Swagger API documentation
  - `GET /products` - List all products
  - `GET /products/:id` - Get single product by ID
  - `GET /categories` - List all categories
  - `GET /categories/:id` - Get single category by ID
- **Authentication Routes:**
  - `GET /login` - Initiates GitHub OAuth login flow
  - `GET /logout` - Terminates session and logs out user
- **Protected Routes (Requires GitHub Login):**
  - `POST /products` - Create product (validated)
  - `PUT /products/:id` - Update product (validated)
  - `DELETE /products/:id` - Delete product
  - `POST /categories` - Create category (validated)
  - `PUT /categories/:id` - Update category (validated)
  - `DELETE /categories/:id` - Delete category

---

## 🚀 Environment Variables
The following environment variables are required in `.env` and Render:
- `PORT` - Port number (e.g., 8080)
- `MONGODB_URI` - MongoDB Atlas connection string
- `SESSION_SECRET` - Secret key for express-session
- `GITHUB_CLIENT_ID` - GitHub OAuth Application Client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth Application Client Secret
- `CALLBACK_URL` - GitHub OAuth callback URL (`https://cse-341-project2-vodf.onrender.com/github/callback` in production)
