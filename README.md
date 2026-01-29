Automation Builder Backend

A Node.js + Express + MongoDB backend API for building and running email automation workflows with delay and action nodes.

🚀 Features

CRUD Automation Workflows

Email Sending (Gmail SMTP / Nodemailer)

Delay Scheduling Logic

Run Automation in Background

MongoDB Atlas Storage

CORS Ready for Production

Deployable on Render / Railway / Vercel Server

🛠 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

Nodemailer

dotenv

CORS

📁 Project Structure
server/
 ├── routes/
 ├── models/
 ├── services/
 ├── utils/
 ├── index.js
 └── .env

📦 Install Dependencies
npm install

⚙️ Environment Variables (.env)
PORT=5000
MONGO_URI=your_mongodb_connection
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

▶️ Run Project
npm start


or dev mode:

npm run dev

🔗 API Endpoints
Automations
Method	Route	Description
GET	/automations	Get all automations
POST	/automations	Create automation
GET	/automations/:id	Get single automation
PUT	/automations/:id	Update automation
DELETE	/automations/:id	Delete automation
POST	/automations/:id/test	Run automation
✉️ Email Flow Logic

Delay Node → waits based on input

Action Node → sends email

Runs async in background

🧪 Sample Test Payload
{
  "email": "test@gmail.com"
}

🌍 Production Deploy (Render Example)

Build command:

npm install


Start command:

node index.js
