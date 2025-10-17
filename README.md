#Agent Distribution MERN App

#Project Description
The Agent Distribution MERN App is a full-stack web application that enables an Admin to manage agents and distribute uploaded leads equally among them.

Admins can:
- Securely log in with JWT authentication.
- Add and delete agents with details (name, email, mobile, password).
- Upload CSV/XLSX files containing leads.
- Automatically distribute leads equally among all active agents.
- View a history of distribution runs** and inspect leads assigned to each agent.

Built using the MERN stack (MongoDB, Express, React, Node.js), it ensures a smooth workflow from upload to data visualization with a responsive frontend and robust backend logic.

---

#Setup and Execution Instructions

#Project Setup

#1. Clone the repository
#2. Backend Setup: 
cd backend
npm install

Create a .env file inside the backend directory:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPass123

Seed the admin user:
npm run seed

Start the backend server:
npm run dev

The backend will start at:
👉 http://localhost:5000

#3. Frontend Setup
cd frontend
npm install

Create a .env file inside the frontend directory:
REACT_APP_API_URL=http://localhost:5000/api

Start the frontend server:
npm start

The frontend will start at:
👉 http://localhost:3000

---

#Running the Application

#1. Login

Use the seeded admin credentials:

Email: admin@example.com
Password: AdminPass123

#2. Manage Agents

Go to the Agents page.
Add new agents (name, email, mobile, password).
Delete agents if needed.

#3. Upload CSV/XLSX/AXLS

Navigate to the Upload page.
Upload a valid CSV/XLSX/AXLS file (with columns FirstName, Phone, Notes).
The system will automatically distribute the leads equally among all existing agents.

#4. View Runs and Leads

Open the Runs page to see all distribution runs.
Click a run then view which agents received how many leads.
Click View Leads to see detailed leads assigned to each agent.

---

#Example CSV/XLSX Format:

FirstName,Phone,Notes
John,9876543210,VIP Customer
Emma,9876543211,Follow-up tomorrow
Liam,9876543212,Interested in product

---

#Demo Video

Watch the full working demo here:  
Google Drive Link: https://drive.google.com/file/d/1zvK3HevaGV7tauPXi8GD0v6tbFgoUb8w/view?usp=sharing

---
