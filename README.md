# New County Suite

## Overview
New County Suite is a modern web application designed for seamless apartment rental management. It features a public-facing page for potential guests to explore suite details and make reservations, along with a secure private admin dashboard for managing bookings and user accounts.

## Features:

### Public Page
- **Suite Details**: View detailed suite information, including high-quality images and descriptions.
- **Contact Button**: Opens a popup with options to contact via email or phone.
- **Reservation Button**: Opens a popup for selecting available dates and entering guest details.

### Admin Dashboard (Private)
- **Secure Login**: Accessible only to authenticated users.
- **Reservation Management**: View reservations in a **list view** or a **calendar view**, and accept or cancel reservations with ease.
- **Admin Management**: Add or manage additional admins to help oversee the booking system.

## Installation
Follow these steps to set up the project locally:

- **Prerequisites**: Ensure you have Node.js (v16 or later) and Firebase CLI installed for hosting.

Clone the repository:
```bash
git clone https://github.com/<your-username>/new-county-suite.git
```

Navigate to the project directory:

```bash
cd new-county-suite
```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
Build the project for production:
```bash
npm run build
```
## Deployment
To deploy on Firebase Hosting:

Install the Firebase CLI:

```bash
npm install -g firebase-tools
```
Login to Firebase:
```bash
firebase login
```
Initialize Firebase Hosting:
```bash
firebase init hosting
```
Deploy the application:
```bash
firebase deploy
```
## Technologies Used
- **Frontend**: React.js, Tailwind CSS.
- **Backend**: Firebase Authentication, Firestore.
- **Calendar**: react-big-calendar.
- **Date Picker**: react-datepicker.
  
### Contributing
Fork the repository, create a feature branch, and commit your changes:
```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```
Open a pull request to submit your contribution.












