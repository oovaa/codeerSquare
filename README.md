# Codersquare

Codersquare is a social web app for sharing learning resources in a hackernews-style experience. It allows users to post links to articles, videos, channels, or other public resources on the web, and other users to vote and comment on those resources.

## Table of Contents

- [Codersquare](#codersquare)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Posts](#posts)
    - [Likes](#likes)
    - [Comments](#comments)
  - [Environment Variables](#environment-variables)
  - [Database Schema](#database-schema)
    - [Users](#users)
    - [Posts](#posts-1)
    - [Likes](#likes-1)
    - [Comments](#comments-1)
  - [License](#license)

## Installation

To install dependencies, run:

```bash
bun install
```

## Running the Project

To start the development server, run:

```bash
bun ./server/server.ts
```

To start the server with `nodemon` for automatic restarts on file changes, run:

```bash
bun start
```

To start the server in production mode, run:

```bash
bun  start:prod
```

## API Endpoints

### Auth

- `POST /signup` - Sign up a new user
- `POST /signin` - Sign in an existing user

### Posts

- `GET /posts` - List all posts
- `POST /posts` - Create a new post

### Likes

- `POST /likes/new` - Like a post

### Comments

- `POST /comments/new` - Add a new comment
- `GET /comments/list` - List comments for a post
- `DELETE /comments/:id` - Delete a comment

## Environment Variables

The following environment variables are required to run the project:

- `PORT` - The port on which the server will run (default: 4000)
- `JWT_SECRET` - Secret key for signing JWT tokens
- `PASS_SALT` - Salt for hashing passwords

Create a `.env` file in the root directory and add the required variables:

```env
PORT=4000
JWT_SECRET=your_jwt_secret
PASS_SALT=your_password_salt
```

## Database Schema

The project uses SQLite for the database. The schema is defined as follows:

### Users

| Column    | Type   |
|-----------|--------|
| ID        | STRING |
| FirstName | STRING |
| LastName  | STRING |
| Username  | STRING |
| Email     | STRING |
| Password  | STRING |

### Posts

| Column   | Type   |
|----------|--------|
| ID       | STRING |
| Title    | STRING |
| URL      | STRING |
| UserID   | STRING |
| PostedAt | INTEGER|

### Likes

| Column | Type   |
|--------|--------|
| UserID | STRING |
| PostID | STRING |

### Comments

| Column   | Type   |
|----------|--------|
| ID       | STRING |
| UserID   | STRING |
| PostID   | STRING |
| Comment  | STRING |
| PostedAt | INTEGER|

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.