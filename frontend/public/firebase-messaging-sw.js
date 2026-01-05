importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBFzCgl_8-o_iKjmqYNmyrFbiADfJwRdOc",
  authDomain: "mcc-delhi-4ba26.firebaseapp.com",
  projectId: "mcc-delhi-4ba26",
  messagingSenderId: "781980706862",
  appId: "1:781980706862:web:ddec8bccb068be8bcd17bf",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});