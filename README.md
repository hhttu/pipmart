# PipMart: Full-Stack Online Marketplace

PipMart is a full-stack application that allows users to create, manage, and purchase items. It includes a **Django-based backend** (REST API) and a **Vite/React-based frontend**. The backend provides APIs for managing users, items, and purchases, while the frontend provides a user-friendly interface to interact with the backend.


## Features

#### **Mandatory Features**

1. **User Accounts**  
   - Unregistered users can browse and search available items.  
   - Registered users can create accounts, authenticate via login, and manage their items.

2. **Backend API**  
   - A Django-based API serves JSON data for the web shop and HTML for the landing page.  
   - SQLite is used as the database.

3. **Frontend Interface**  
   - A dynamic, responsive user interface implemented using React.

4. **Automatic Database Population**  
   - A link allows any visitor to auto-populate the database with **6 users** (3 sellers and 10 items each).
   Three sellers are testuser1, testuser2, testuser3.
   - The database resets before each re-population.

5. **Browse Items**  
   - Any user can browse all available items for sale.  
   - Each item includes:  
      - Title  
      - Description  
      - Price  
      - Date Added  

6. **Account Management**  
   - Users can **sign up** with a username, password, and email.  
   - Registered users can **log in** to access personalized features.

7. **Add New Items**  
   - Authenticated users can list new items for sale with a title, description, and price.

8. **Add to Cart**  
   - Buyers can add items to their cart for purchase.  
   - Sellers cannot add their own items to the cart.

#### **Optional Features**

1. **Search Functionality**  
   - Users can search for items by title.

2. **Remove Items from Cart**  
   - Buyers can remove items from their cart.

3. **Payment Processing**  
   - Cart transactions halt if item prices change or items are no longer available.  
   - Successful payment marks items as **SOLD** and updates their status.

4. **SPA (Single Page Application) Routing**  
   - The application supports navigation to key pages:  
     - Home: `/`  
     - Sign Up: `/signup`  
     - Login: `/login`  
     - Edit Account: `/account`  
     - My Items: `/myitems`  

5. **Account Editing**  
   - Users can update their account password.

6. **Inventory Management**  
   - Authenticated users can view items categorized into:  
      - On Sale  
      - Sold  
      - Purchased  

7. **Edit Items**  
   - Sellers can edit the price of their items as long as they are available.

8. **Responsive Design**  
   - The web application is designed for a clean and user-friendly experience on desktop screens.


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


