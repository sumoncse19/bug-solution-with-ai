# AI-Enhanced Feedback System (Frontend)

## Project Overview

A modern feedback system powered by AI that helps users get instant solutions for their bug reports and allows them to submit various types of feedback. The project is built using `Express.js`, `Mongoose`, `Zod` for validation, `Yarn` as the package manager and here used `Husky` for checking pre-commit.

## Features

- 🤖 AI-powered bug solution generator
- 📸 Image upload support for bug reports
- 💡 Multiple feedback types (Bug/Idea/Other)
- 📱 Responsive design
- ⚡ Real-time AI responses
- 📋 Feedback history view
- 📄 Pagination for feedback lists

## Live Preview and GitHub URL

[Live Preview Frontend](https://bug-solution.vercel.app/)
[Live Preview Backend](https://bug-solution.onrender.com/)
[GitHub Repository Frontend](https://github.com/sumoncse19/bug-solution-client)
[GitHub Repository Backend](https://github.com/sumoncse19/bug-solution-with-ai)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (v1.22 or later)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (v4.4 or later)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sumoncse19/bug-solution-with-ai.git
cd bug-solution-with-ai
```

### 2. Install Dependencies

Use Yarn to install the necessary dependencies:

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and configure the following environment variables:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/project_name
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=15m
```

### 4. Run MongoDB Locally

Ensure MongoDB is running locally. You can start MongoDB using the following command:

```bash
mongod
```

### 5. Start the Development Server

To start the server in development mode:

```bash
yarn start:dev
```

The server should now be running at `http://localhost:5000`.

### 6. Running the Project in Production

To run the project in production mode:

```bash
yarn build
yarn start
```

## API Endpoints

### Solution

- `POST /api/v1/ask-query/gemini-text`: Get solution with only prompt(text).
- `GET /api/v1/ask-query/gemini-text`: Get all previous asked question and solution.

- `POST /api/v1/ask-query/gemini-image`: Get solution with text and given image.
- `GET /api/v1/ask-query/gemini-image`: Get all previous asked question with image and solution.

## Linting

To check for linting errors, use:

```bash
yarn lint
```

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
