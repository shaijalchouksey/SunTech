# ⚡ Soluris

Soluris is a modern web application built to help users contact and connect with solar energy providers through a seamless and responsive user interface. The project consists of a Node.js/Express backend and a frontend likely using HTML/CSS/JS or a JavaScript framework.

## 🌐 Features

- Contact form integration
- Sends confirmation via:
  - Email
  - WhatsApp
- Google Form data storage
- API-based communication between frontend and backend
- Environment variable configuration for secure keys

## 🗂 Project Structure

```
Soluris-main/
├── backend/           # Node.js Express backend
│   ├── controllers/   # Handles logic for incoming requests
│   ├── server.js      # Entry point of the server
│   ├── .env           # Environment variables (not tracked in Git)
│   ├── package.json   # Backend dependencies
│
├── frontend/          # Frontend files (HTML/CSS/JS or framework based)
│   └── index.html     # (Assuming typical structure)
│
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file:
   ```env
   PORT=5000
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE=whatsapp:+14155238886
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   GOOGLE_FORM_URL=your_google_form_url
   ```

4. Start the server:
   ```bash
   node server.js
   ```

### Frontend

You can open the `index.html` (located in the frontend folder) in any modern browser. Make sure the backend server is running for full functionality.

## 📬 Contact Form Flow

1. User submits the contact form.
2. Data is sent to:
   - Google Form
   - Email (via nodemailer)
   - WhatsApp (via Twilio)
3. Backend handles routing and API logic.

## 🔒 Security

- Make sure not to commit `.env` files.
- All credentials should be stored securely.

## 📦 Deployment

To deploy this project, consider using:

- **Frontend:** Vercel / Netlify / GitHub Pages
- **Backend:** Render / Railway / Heroku

Ensure your `.env` variables are set correctly in your hosting dashboard.

## 👨‍💻 Author

Developed by [TUSHAL JOSHI]

## 📝 License

This project is licensed under the MIT License.
