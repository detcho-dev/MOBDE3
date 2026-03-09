import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 1. وظيفة اختيار النوع (مبدع أم مشاهد)
window.selectRole = (role) => {
    sessionStorage.setItem('userRole', role);
    // إظهار قسم أزرار تسجيل الدخول بعد الاختيار
    document.getElementById('loginSection').style.display = 'block';
    // تمرير الشاشة للأسفل بسلاسة
    document.getElementById('loginSection').scrollIntoView({ behavior: 'smooth' });
};

// 2. دالة التعامل مع الدخول
const handleAuth = async (provider) => {
    try {
        await signInWithPopup(auth, provider);
        // التوجيه للوحة التحكم
        window.location.href = "dashboard.html";
    } catch (error) {
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
            alert("حدث خطأ: " + error.message);
        }
    }
};

// 3. أزرار الدخول
document.getElementById('btnGoogle').onclick = (e) => {
    e.preventDefault();
    handleAuth(new GoogleAuthProvider());
};

document.getElementById('btnGithub').onclick = (e) => {
    e.preventDefault();
    handleAuth(new GithubAuthProvider());
};import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 1. وظيفة اختيار النوع (مبدع أم مشاهد)
window.selectRole = (role) => {
    sessionStorage.setItem('userRole', role);
    // إظهار قسم أزرار تسجيل الدخول بعد الاختيار
    document.getElementById('loginSection').style.display = 'block';
    // تمرير الشاشة للأسفل بسلاسة
    document.getElementById('loginSection').scrollIntoView({ behavior: 'smooth' });
};

// 2. دالة التعامل مع الدخول
const handleAuth = async (provider) => {
    try {
        await signInWithPopup(auth, provider);
        // التوجيه للوحة التحكم
        window.location.href = "dashboard.html";
    } catch (error) {
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
            alert("حدث خطأ: " + error.message);
        }
    }
};

// 3. أزرار الدخول
document.getElementById('btnGoogle').onclick = (e) => {
    e.preventDefault();
    handleAuth(new GoogleAuthProvider());
};

document.getElementById('btnGithub').onclick = (e) => {
    e.preventDefault();
    handleAuth(new GithubAuthProvider());
};
