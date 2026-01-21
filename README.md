🏛️ MCC Delhi – Civic Complaint & Grievance Redressal Platform

MCC Delhi is a modern, full-stack civic grievance management system inspired by real municipal portals.
It provides a seamless experience for citizens to raise complaints and track resolutions, while MC Admins handle assignment and resolution through a secure admin panel.

This project is developed as a practice + portfolio project using production-level tools and architecture.

🔐 Authentication & User Management

👤 Citizen Authentication

Google Login using Firebase Authentication

Secure JWT-based session handling

Automatic user creation on first login

🏢 MC Admin Authentication

Admin users created via secure backend script

Role-based access control (citizen, mc)

Admin routes protected separately

🔔 Notifications System

Firebase Cloud Messaging (FCM) for push notifications

Socket.IO for real-time in-app notifications

Notifications triggered on:

Complaint creation

Status updates

Complaint assignment to officer

Persistent notification state using Redux Persist

✨ Key Features

Citizen Panel

Google Sign-In (Firebase)

Register civic complaints with images

Track real-time complaint status

Receive push + live notifications

Profile management

MC Admin Panel

View & manage complaints by ward/zone

Assign complaints to officers

Update complaint status

Trigger notifications to citizens

Secure admin dashboard

⚙️ Tech Stack

Frontend

Next.js (App Router)

React

Tailwind CSS

Framer Motion (animations)

State Management

Redux Toolkit

Redux Persist

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Real-Time & Notifications

Socket.IO (real-time updates)

Firebase Cloud Messaging (Push notifications)

Authentication

Firebase Authentication (Google Sign-In)

Role-based access control

🎯 Learning Outcomes

Firebase Auth + FCM integration

Role-based access & route protection

Real-time systems with Socket.IO

Secure admin-only workflows

Scalable full-stack architecture

SEO & Lighthouse optimized Next.js app

⚠️ Disclaimer

This project is created for learning and portfolio purposes only and is not an official government application.
