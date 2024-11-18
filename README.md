# Contact Management App - CRM Mini Feature (SDE Internship Assignment)

This project is a Contact Management System that allows users to add, view, edit, and delete contacts. The app is built using the MERN stack (MongoDB, Express.js, React, Node.js) and uses Material UI for the frontend design.

## Setup Instructions

### Prerequisites
Ensure you have the following tools installed on your local machine:
- **Node.js**: [Download and install Node.js](https://nodejs.org/en/)
- **MongoDB**: You need access to a MongoDB instance, either local or through [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Clone the Repository

1. Clone the project to your local machine using the following command:
   ```bash
   git clone https://github.com/Dev-Reddy/Contact-Management.git
   cd Contact-Management-main
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and set the following environment variables:
   ```env
   MONGODB_URI=<Your_MongoDB_URI>
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

The application frontend will now be accessible at `http://localhost:3000`.

## Features

### 1. **Add New Contact**
   Users can easily add new contacts with the following details:
   - First Name
   - Last Name
   - Email
   - Phone Number
   - Company
   - Job Title

   This feature allows for smooth addition of new customer or client details.

### 2. **View Contacts**
   All contacts are displayed in a clean, tabular format with essential information. Pagination and sorting functionalities ensure that even large contact lists are easy to manage.

### 3. **Edit Contact Information**
   Users can update any existing contact’s details, such as changing the phone number, updating job titles, or correcting emails. This ensures that the data remains up-to-date.

### 4. **Delete Contact**
   If a contact is outdated, duplicate, or no longer relevant, users can easily remove it from the system.

### 5. **Sorting and Pagination**

   - **Sorting**: The app allows contacts to be sorted in ascending or descending order by the following fields:
     - **First Name**
     - **Last Name**
     - **Company**
     - **Job Title**
     - **Phone**
     - **Email**

     This sorting feature helps users quickly locate and manage contacts by any relevant field, which is especially useful when dealing with large contact lists. The user can click on any column header to toggle between ascending and descending order for that specific attribute.

     Example:
     - Clicking on the "First Name" column header will sort contacts alphabetically (A-Z or Z-A).
     - Sorting is persistent across page reloads, ensuring that users see contacts in the most relevant order every time.

   - **Pagination**: Pagination ensures that only a subset of contacts are displayed at any given time, reducing load times and improving the user experience. The contact list can be navigated page by page, with the ability to adjust the number of contacts displayed per page.

   This combination of sorting and pagination makes the app efficient and user-friendly, even with hundreds or thousands of contacts.

## Tech Stack

The application uses the following technologies:

- **Frontend**:
  - **React.js**: A JavaScript library for building user interfaces.
  - **Vite**: A build tool that provides a fast and optimized development environment.
  - **Material UI**: A popular React component library for building modern, responsive UI elements.
  - **Tailwind CSS**: A utility-first CSS framework that helps create custom, responsive layouts quickly.
  
- **Backend**:
  - **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used to build the backend API.
  - **Express.js**: A fast and minimalist web framework for Node.js, used to create the backend server and handle routing.
  - **MongoDB**: A NoSQL database for storing contact data, accessed using the Mongoose ODM (Object Document Mapper).
  - **Express Validator**: A validation library for handling input validation in the backend.




## Checklist of Evaluation Criteria

### 1. **Functionality**: 
   All CRUD operations (Create, Read, Update, Delete) work as expected. The system supports sorting and pagination seamlessly, and validation for form fields is implemented.

### 2. **UI Consistency**: 
   The interface is clean, intuitive, and uses Material UI components. Tailwind CSS provides responsive and adaptable styling for different screen sizes.

### 3. **Code Quality**: 
   The code follows a modular structure with a clear separation between the model, controller, and router in the backend. Best practices in Express.js, React, and MongoDB integration have been adhered to.

### 4. **Problem-Solving Approach**: 
   The app addresses all functionality requirements in a simple, effective manner. Challenges such as implementing pagination, sorting, and smooth UX transitions have been handled using efficient backend queries and frontend state management.

## Database Setup

The app uses **MongoDB** as the database. MongoDB is a NoSQL database that stores data in a flexible, JSON-like format, making it well-suited for handling the dynamic and varied nature of contact details.

The backend connects to MongoDB via the `MONGODB_URI` environment variable set in the `.env` file.

## License

This project is licensed under the MIT License.

## Conclusion

This project demonstrates a fully functional contact management system designed to streamline the organization and handling of customer or client data. The MERN stack, combined with Material UI and Tailwind CSS, provides a modern and efficient solution for managing contacts. The application is intuitive, responsive, and easy to set up, making it an ideal starting point for any CRM system.

## Challenges & Solutions

- **Challenge**: Sorting contacts based on various fields.
  - **Solution**: React states (`order` and `orderBy`) were used to track sorting preferences. Any changes in these values trigger `useEffect`, which fetches data from the backend with the correct sorting applied.

- **Challenge**: Maintaining a smooth and simple UI/UX on a single page.
  - **Solution**: The app keeps all operations (add, update, delete) on the same page without requiring any page navigation. React and Material UI components were used to create a seamless user experience, ensuring that users can manage contacts without interruptions.


This app provides an easy-to-use, scalable solution for managing contacts in a business environment. The use of modern technologies like MERN, Material UI, and Tailwind CSS ensures that it is both efficient and visually appealing.

