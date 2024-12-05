# **Healthify - Your AI Disease Predictor**

Healthify is an innovative platform that leverages AI to predict diseases based on symptoms. It provides a seamless experience for patients and doctors through dynamic designs, real-time interaction, and efficient appointment management.

---

## **Features**

### **For Patients:**
- Predict diseases by entering symptoms using a trained AI model.
- Book appointments with doctors dynamically.
- Provide feedback after consultations.
- Engage in real-time chat with doctors.
- **Google Sign-In with Firebase** for quick and secure authentication.

### **For Doctors:**
- View and manage patient appointments.
- Provide feedback and advice to patients.
- Chat with patients to clarify health concerns.

---

## **Technology Stack**

### **Frontend:**
- **React**: For creating dynamic and responsive UI.
- **CSS & Tailwind**: For elegant and responsive styling.
- **Axios**: To facilitate seamless communication with the backend.

### **Backend:**
- **Django & Django REST Framework**: For secure data handling and API creation.
- **AI Integration**: Trained AI model for accurate disease prediction.

### **Authentication:**
- **Google Sign-In via Firebase**: Simplifies authentication for users.
- **JWT (JSON Web Tokens)**: For secure user login and session management.

### **Database:**
- **PostgreSQL**: Flexible database options based on scale and preference.

### **Real-Time Features:**
- **WebSockets**: Enables real-time chat functionality.

---

## **Installation and Setup**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Code-Hacker26/Healthify-AI.git
   cd healthify

## **Backend Setup**

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt

 2. **Apply migrations:**
    ```bash
    python manage.py migrate
  3. **Start the Django server:**
     ```bash
     python manage.py runserver


## **Frontend Setup**

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend


 2. **Install dependencies:**
    ```bash
    npm install

  3. **Start the React development server:**
     ```bash
     npm start
