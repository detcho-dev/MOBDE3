import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const db = getFirestore(app);

// منع العودة لصفحة الدخول فوراً (حل مشكلة الحلقة المفرغة)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("تم التحقق من المستخدم:", user.email);
        setupUI(user);
    } else {
        // إذا لم يكن هناك مستخدم، ننتظر ثانية للتأكد قبل التحويل
        setTimeout(() => {
            if (!auth.currentUser) window.location.href = "index.html";
        }, 1500);
    }
});

function setupUI(user) {
    document.getElementById('userName').innerText = user.displayName || "مستخدم مُبدع";
    
    // الحصول على الدور من الـ Storage
    const role = sessionStorage.getItem('userRole');

    if (role === 'viewer') {
        // إذا كان مشاهد: إخفاء نموذج الإضافة وتغيير العناوين
        document.querySelector('.add-work').style.display = 'none';
        document.querySelector('.my-works h2').innerText = "استكشف أعمال المبدعين 🔍";
        document.getElementById('btnShareProfile').style.display = 'none';
        loadAllWorks(); // جلب كل أعمال الناس
    } else {
        // إذا كان مبدع: عرض أعماله فقط وإظهار نموذج الإضافة
        loadUserWorks(user.uid);
    }
}

// إضافة عمل جديد
document.getElementById('addProjectForm').onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btnSave');
    btn.disabled = true;
    btn.innerText = "جاري النشر...";

    try {
        await addDoc(collection(db, "projects"), {
            uid: auth.currentUser.uid,
            creatorName: auth.currentUser.displayName || "مبدع غير معروف",
            title: document.getElementById('pTitle').value,
            image: document.getElementById('pImage').value,
            desc: document.getElementById('pDesc').value,
            link: document.getElementById('pLink').value,
            createdAt: new Date()
        });
        alert("تم النشر بنجاح!");
        document.getElementById('addProjectForm').reset();
    } catch (err) {
        alert("خطأ: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = "نشر العمل";
    }
};

// جلب أعمال المستخدم الخاص (للمبدع)
function loadUserWorks(uid) {
    const q = query(collection(db, "projects"), where("uid", "==", uid));
    renderGrid(q);
}

// جلب جميع الأعمال (للمشاهد)
function loadAllWorks() {
    const q = query(collection(db, "projects"));
    renderGrid(q);
}

// دالة العرض الموحدة
function renderGrid(q) {
    const grid = document.getElementById('worksGrid');
    onSnapshot(q, (snapshot) => {
        grid.innerHTML = "";
        if (snapshot.empty) {
            grid.innerHTML = "<p>لا توجد أعمال لعرضها حالياً.</p>";
            return;
        }
        snapshot.forEach(doc => {
            const data = doc.data();
            grid.innerHTML += `
                <div class="work-item card">
                    <img src="${data.image}" onerror="this.src='https://via.placeholder.com/300x160?text=No+Image'">
                    <div class="work-info">
                        <h3>${data.title}</h3>
                        <p>${data.desc}</p>
                        <small>بواسطة: ${data.creatorName || 'مبدع'}</small>
                    </div>
                </div>
            `;
        });
    });
}

// تسجيل الخروج
document.getElementById('btnLogout').onclick = () => {
    signOut(auth).then(() => window.location.href = "index.html");
};
