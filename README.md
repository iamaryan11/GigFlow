
# GigFlow: Full-Stack Freelance Marketplace

PROJECT REPORT: [https://drive.google.com/file/d/1J7d97Qj3COKYHf2Pptb1_Vecb68G_LbG/view?usp=sharing]

VIDEO DEMONSTRATION:[https://drive.google.com/file/d/1uOQGZWL5JmreReSAaT2P7-S7142HlDas/view?usp=sharing]

LIVE URL: [https://gigflow-m9to.onrender.com/]

## Setup & Installation:
Clone the Repository: git clone [https://github.com/iamaryan11/GigFlow]

## Install Dependencies: 
For Backend:
`cd backend && npm install`

For Frontend:
`cd client && npm install`

Environment Variables: Create a .env file in the /backend directory based on the .env.example provided.

# Server Configuration
PORT=1111

## Database
### Use a local or Atlas MongoDB URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/gigflow

## Authentication
### Any random long string for JWT signing
JWT_KEY=your_super_secret_jwt_random_string

# Frontend URL (For CORS if needed)
CLIENT_URL=http://localhost:1111
Run the Project:

Backend: `node server.js `(Runs on port 1111)

Frontend: `npm run dev`



## ABout GigFlow

GigFlow is a comprehensive service-based marketplace built to connect talented sellers with buyers. The platform handles everything from gig discovery and secure ordering to real-time messaging and seller analytics.

## Tech Stack:
### Frontend
React: Declarative UI development.

TanStack Query (React Query): Server-state management, caching, and automated re-fetching.

Redux Toolkit (RTK): Global client-side state management for user authentication.

Daisy UI & Tailwind CSS: Modern, responsive styling with accessible components.

## Backend
Node.js & Express: Scalable server-side logic using MVC Architecture.

MongoDB & Mongoose: NoSQL database for flexible data modeling.

JWT (JSON Web Tokens): Secure, cookie-based authentication and Role-Based Access Control (RBAC).

Cloudinary: Cloud-based image hosting for Gigs and user avatars.

## System Architecture
The backend follows the MVC (Model-View-Controller) design pattern to ensure a clean separation of concerns, making the codebase maintainable and scalable:
Models: Define the schemas for Users, Gigs, Orders, Conversations, Messages, and Reviews.
Views: Represented by the React frontend which consumes the REST API.
Controllers: House the business logic, such as calculating seller revenue or processing payments.


Security & Middleware
Beyond the functional requirements, I have implemented industry-standard security practices to ensure the API is robust and production-ready:
Helmet.js: Configured to set secure HTTP headers, protecting the app from well-known web vulnerabilities like XSS, Clickjacking, and MIME-sniffing.
Rate Limiting: Integrated express-rate-limit to prevent brute-force attacks and API abuse. I specifically applied stricter limits to the auth/login and auth/register routes.
CORS Management: Securely configured Cross-Origin Resource Sharing to ensure that only authorized frontend domains can interact with the API.
Data Sanitization: Implemented logic to prevent NoSQL injection by validating and sanitizing user inputs before they reach the MongoDB queries.
 System Engineering & DevOps
 Security Middleware: * Helmet.js for HTTP header hardening and Rate-Limiting to prevent API abuse and brute-force attacks.
 Background Automation (Cron Jobs): * Integrated Node-Cron for internal database maintenance, such as cleaning up expired "Pending" orders.
 High Availability (UptimeRobot): * Configured UptimeRobot to monitor the API's health. This ensures the backend (hosted on Render/Railway) remains "warm" and prevents cold-start latency, providing a seamless experience for the hiring team during the review process.




# 🚀 API Documentation

## Authentication (/auth):

Method,Endpoint,Description

POST,/register,Create a new account.

POST,/login,Authenticate user and set secure JWT cookie.

POST,/logout,Clear session and authentication cookies.


## 👤 User & Analytics (/api/users)


Method,Endpoint,Description

GET,/stats,(Protected) Uses MongoDB Aggregation to calculate total revenue and sales.

GET,/:id,Fetch public profile data for any user.

DELETE,/:id,(Protected) Allows users to delete their own account (Ownership verified).




## 🎨 Gig Management (/api/gigs)
Base URL: /api/gigs


Method,Path,Description

GET,/view/gigs,"Fetch all gigs with filtering (category, price, search)."

GET,/buyer/gig/:id,Get detailed information for a specific gig.

POST,/seller/publish-gigs,(Protected) Create a new gig listing.

DELETE,/seller/:id,(Protected) Delete a specific gig listing.


## 💳 Orders & Payments (/api/orders)
Base URL: /api/orders

Method,Endpoint,Description

POST,/:gigId,"Create an initial ""Pending"" order with a payment_intent."

GET,/,Fetch all completed orders for the logged-in user.

PUT,/,(Confirm Order) Flips status to completed and increments Gig sales count.



## 💬 Conversations & Chat
Base URLs: /api/conversations & /api/messages

Method,Endpoint,Description

GET,/api/conversations,List all active chat threads for the user.

GET,/api/conversations/single/:id,Fetch a specific chat using a Composite Seller-Buyer ID.

POST,/api/messages,Send a new message within a conversation.

GET,/api/messages/:id,Retrieve full message history for a specific thread.



## ⭐ Reviews (/api/reviews)
Base URL: /api/reviews

Method,Endpoint,Description

POST,/,Post a review for a completed order.

GET,/:gigId,Get all reviews and ratings for a specific gig.



Key Technical Challenges Solved:

1. Atomic Sales Synchronization
To ensure the dashboard remains accurate, I implemented an atomic update in the confirmOrder logic. When a payment is confirmed, the system simultaneously updates the order status and increments the sales field in the Gig model using MongoDB's $inc operator.
2. Composite Chat IDs
To prevent duplicate chat rooms between the same buyer and seller, I designed a unique ID generation strategy: id: sellerId + buyerId. This ensures that no matter who initiates the contact, both users are directed to the same consistent thread.
3. Complex Data Aggregation
The Seller Dashboard utilizes MongoDB Aggregation Pipelines to filter, match, and sum up financial data across hundreds of potential documents, providing a high-performance analytics experience.


