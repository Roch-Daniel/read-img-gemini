<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Read Img API

ReadImg API is a NestJS-based application designed to process images and extract meter readings using the Google Gemini API. The project includes a service for handling image processing, managing image records, and storing results in a MySQL database.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Technologies](#technologies)
- [License](#license)

## Features

- **Image Processing**: Upload images and extract meter readings using the Google Gemini API.
- **CRUD Operations**: Create, read, update, and delete image data in the database.
- **Custom Filters and Interceptors**: Handle requests and responses efficiently with NestJS custom filters and interceptors.
- **Error Handling**: Graceful error handling for bad requests or API failures.

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- Node.js (>= v20)
- npm or yarn (preference npm)
- Docker (for running the MySQL database)

### Installation

1. **Clone the repository**:

```bash
  git clone
```

2. **Install dependencies:**:

```bash
  npm install
```

3. **Set up the environment variables Create a .env file in the root of the project and add the following**:

```bash
  GEMINI_API_KEY=your-gemini-api-key
  DATABASE_URL=mysql://root:root@localhost:3000/read_image
  MYSQL_ROOT_PASSWORD=your_password
  MYSQL_DATABASE=read_image
```

4. **Run the Docker container (if you're using MySQL as in the example)**:

```bash
  docker compose up -d
```

5. **Run the migrations**:

```bash
  npx prisma migrate dev
```

6. **Start the server**:

```bash
  npm run dev
```

## Usage

### Endpoints

All endpoints are prefixed with `/api` and are accessible via `http://localhost:3000/api`.

- **GET /api/read-img**: Get all stored images and their respective readings.
- **GET /api/read-img/:id**: Get a specific image by its ID.
- **POST /api/read-img**: Upload a new image and process it through the Gemini API.
- **PUT /api/read-img/:id**: Update an existing image record.
- **DELETE /api/read-img/:id**: Delete an image record by its ID.

### Example Request

To upload an image and get its meter reading:

### POST /api/read-img

```json
{
  "image": "your_base64",
  "customer_code": "example_customer",
  "measure_datetime": "exempla_date",
  "measure_type": "type"
}
```

### Response Example

A successful response from the API might look like this:

```json
{}
```

## Technologies

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.

- **Prisma**: An ORM that makes it easy to interact with the database.

- **Google Gemini API**: Used for processing images and extracting meter readings.

- **Docker**: Containerized database management.
