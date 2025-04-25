# School Management API

## Overview

The School Management API allows users to manage school data. It provides two main functionalities:

1. **Add a New School** - Allows users to add a new school with its name, address, latitude, and longitude.
2. **List Schools** - Fetches a list of schools sorted by proximity to the user's location based on latitude and longitude.

The system is built with Node.js, Express.js, and MySQL.

---

## Features

- **Add School API**: Adds new school data to the database.
- **List Schools API**: Fetches and sorts schools by proximity to a given location using geographical distance (Haversine formula).
- **Validation**: Ensures that all inputs (name, address, latitude, longitude) are properly validated before insertion.

---

## Database Setup

The database used in this project is MySQL. You need to create a table called `schools` with the following structure:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

##Installation
Prerequisites

-Node.js (v12 or higher)
-MySQL or any MySQL-compatible database
-Postman (for testing the APIs)

--------------------------------------------------------------------------------

##Steps to Set Up
Clone the Repository:
```
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```
Install Dependencies:

Ensure that you have npm or yarn installed, and then run:
```
npm install
```
Set Up MySQL Database:

Create a MySQL database and use the schema provided above to create the schools table.

Update the database configuration in config/db.js:
```
module.exports = {
  host: 'localhost', // Database host
  user: 'your-username', // MySQL username
  password: 'your-password', // MySQL password
  database: 'your-database-name' // Database name
};
```
Run the Application:

Start the Node.js application by running:
```
npm start
```
This will start the server on http://localhost:3000 by default.
