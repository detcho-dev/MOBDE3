import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- بيانات Firebase (ضع بياناتك هنا مرة واحدة فقط) ---
const firebaseConfig = {
    apiKey: "AIzaSyDRUvfgVfoqpIV6KE2mJa1c8jG6RTWmA7U",
    authDomain: "mobde3-portfolio.firebaseapp.com",
    projectId: "mobde3-portfolio",
    storageBucket: "mobde3-portfolio.firebasestorage.app",
    messagingSenderId: "16212463753",
    appId: "1:16212463753:web:b2037cfd01151ee249f658"
  };
// --- تعريف الثوابت (مرة واحدة فقط) ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 1. وظيفة اختيار النوع (مبدع أم مشاهد)
window.selectRole = (role) => {
    sessionStorage.setItem('userRole', role);
    const loginSection = document.getElementById('loginSection');
    loginSection.style.display = 'block';
    loginSection.scrollIntoView({ behavior: 'smooth' });
    
    // تحديث النص بناءً على الاختيار (اختياري)
    const title = document.getElementById('loginTitle');
    if (title) {
        title.innerText = role === 'creator' ? "أهلاً بك أيها المُبدع، سجل دخولك وابدأ النشر" : "أهلاً بك في عالم الإلهام، سجل دخولك للاستكشاف";
    }
};

// 2. دالة التعامل مع الدخول الموحدة
const handleAuth = async (provider) => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("تم الدخول بنجاح:", result.user.email);
        window.location.href = "dashboard.html";
    } catch (error) {
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
            alert("حدث خطأ أثناء تسجيل الدخول: " + error.message);
        }
    }
};

// 3. ربط أزرار الدخول
document.getElementById('btnGoogle').onclick = (e) => {
    e.preventDefault();
    handleAuth(new GoogleAuthProvider());
};

document.getElementById('btnGithub').onclick = (e) => {
    e.preventDefault();
    handleAuth(new GithubAuthProvider());
};
