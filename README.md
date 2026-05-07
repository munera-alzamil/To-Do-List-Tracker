# To-Do List Tracker

A cloud-based To-Do List web application built for the CS335 Cloud Computing course at IMSIU. Users can sign up, log in, and manage their personal tasks from any device. Tasks are stored in the cloud using Firebase Firestore and synced in real time.

---

## What This App Does

- Sign up and log in securely using email and password
- Add tasks with a title, description, due date, and priority level
- Edit, delete, and mark tasks as complete
- Search and filter tasks
- Track completion progress with a progress bar
- Tasks are saved per user in the cloud and accessible from any device

---

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Database:** Firebase Firestore
- **Authentication:** Firebase Authentication (Email and Password)

---

## How It Works

Each user signs up with an email and password. Firebase Authentication handles login securely and automatically hashes passwords. Once logged in, the user's tasks are stored in Firestore under their unique user ID in a `users/{userId}/tasks` subcollection. The frontend reads and writes to Firestore in real time, so tasks appear instantly without page reloads.

---

## Authors
Munera Alzamil, Lara Aleidan, Rzan AlSaadoun, Dana AlBariqi, Heba Almotairi.

CS335 — Cloud Computing | Dr. Nasser Ahmed | IMSIU
