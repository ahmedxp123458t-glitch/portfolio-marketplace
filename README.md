# Portfolio Marketplace

A full-stack MERN application for creating portfolios, showcasing projects, client contact, ratings, and analytics.

## Features
- **Portfolio Creation**: Users create portfolios with skills and projects
- **Project Showcase**: Gallery view with project links
- **Client Contact**: Modal-based messaging system
- **Ratings**: User reviews with star ratings
- **Analytics**: Dashboard with portfolio counts, reviews, and average rating

## Architecture
- **Backend**: Express.js + MongoDB (Mongoose)
- **Frontend**: React (functional components, hooks, fetch API)
- **API**: RESTful routes at `/api/users`, `/api/portfolios`, `/api/projects`, `/api/reviews`

## How to Run
1. **Start MongoDB** locally on port 27017
2. **Seed the database**: `cd server && npm install && npm run seed`
3. **Start the server**: `npm start` (port 5000)
4. **Start the client**: `cd client && npm install && npm start` (port 3000, proxies to 5000)

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users |
| POST | /api/users | Create a user |
| GET | /api/users/:id | Get user by ID |
| GET | /api/portfolios | Get all portfolios |
| POST | /api/portfolios | Create a portfolio |
| GET | /api/portfolios/:id | Get portfolio by ID |
| PUT | /api/portfolios/:id | Update portfolio |
| DELETE | /api/portfolios/:id | Delete portfolio |
| GET | /api/projects | Get all projects |
| POST | /api/projects | Create a project |
| DELETE | /api/projects/:id | Delete project |
| GET | /api/reviews | Get all reviews |
| POST | /api/reviews | Create a review |

## Usage
Browse portfolios with ratings, create new portfolios with skills, view project showcase gallery, contact portfolio owners via modal, and check analytics dashboard.
