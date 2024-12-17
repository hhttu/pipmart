# PipMart: Full-Stack Online Marketplace

PipMart is a full-stack application that allows users to create, manage, and purchase items. It includes a **Django-based backend** (REST API) and a **Vite/React-based frontend**. The backend provides APIs for managing users, items, and purchases, while the frontend provides a user-friendly interface to interact with the backend.


## Features

- **Backend (Django REST Framework)**:
  - User registration, login, and authentication.
  - CRUD operations for items (create, retrieve, update, delete).
  - Search functionality for items by title.
  - Purchase management with item status updates.
  - Automatic database population for testing.

- **Frontend (React + Vite)**:
  - User interface for interacting with the backend.
  - Display of all items with search functionality.
  - User login and authentication using tokens.
  - Purchase items with validation checks.


## Technologies Used

- **Backend**: Django, Django REST Framework, SQLite
- **Frontend**: React, Vite, JavaScript


## Project Setup

To run the project locally, clone the repository to your local machine:

```bash 
git clone 
```

### A. Backend Setup

1. Navigate to the Backend Folder:

```bash 
cd backend
```

2. Install the requirements:

```bash 
pip install -r requirements.txt 
```

3. Run the development server:

```bash 
python manage.py runserver
```
The project will be available at http://127.0.0.1:8000/


### B. Frontend Setup 

1. Navigate to the Frontend Folder (open another terminal) :

```bash 
cd frontend
```

2. Install the dependencies:

```bash 
npm install
```

3. Run the development server:

```bash 
npm run dev
```

The project will be available at http://localhost:5173/


