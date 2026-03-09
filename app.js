import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    OAuthProvider, 
    sendSignInLinkToEmail 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDRUvfgVfoqpIV6KE2mJa1c8jG6RTWmA7U",
    authDomain: "mobde3-portfolio.firebaseapp.com",
    projectId: "mobde3-portfolio",
    storageBucket: "mobde3-portfolio.firebasestorage.app",
    messagingSenderId: "16212463753",
    appId: "1:16212463753:web:b2037cfd01151ee249f658"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Login
document.getElementById('btnGoogle').onclick = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(() => window.location.href = "dashboard.html");
};

// GitHub Login
document.getElementById('btnGithub').onclick = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then(() => window.location.href = "dashboard.html");
};



// Passless Email Login
document.getElementById('passlessForm').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('userEmail').value;
    const actionCodeSettings = {
        url: window.location.href.replace('index.html', 'dashboard.html'),
        handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            window.localStorage.setItem('emailForSignIn', email);
            alert("تم إرسال رابط الدخول! تفقد بريدك الإلكتروني.");
        });
};
