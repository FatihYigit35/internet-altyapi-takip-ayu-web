// Firebase foknsiyonalrı için import
import {
    initializeApp
  } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
  
  import {
    getFirestore,
    getDoc,
    getDocs,
    doc,
    collection,
    setDoc,
    deleteDoc,
    orderBy,
    query
  } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

  // Firebase ayarları
  const firebaseConfig = {
    apiKey: "AIzaSyB8rfg9lsHKaxUmOcm24DZ7TO2dj6UiVS0",
    authDomain: "internet-altyapi-takip-ayu.firebaseapp.com",
    projectId: "internet-altyapi-takip-ayu",
    storageBucket: "internet-altyapi-takip-ayu.appspot.com",
    messagingSenderId: "398978972138",
    appId: "1:398978972138:web:4fe058c5ef2405a0425a93",
    measurementId: "G-2BHM5LCJKY"
  };
  
  // Firebase başlatma
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  
// Veri ekleme referansları
let newBox = document.getElementById("textNew");
let selBox = document.getElementById("selS");
let newBtn = document.getElementById("newBtn");
let delBtn = document.getElementById("delBtn");

// Veri ekleme
async function sahaDolabiKayit() {
  var ref = doc(firestore, "Saha_Dolapları", newBox.value);

  await setDoc(
    ref, {
    fs_saha_dolabi: newBox.value,
  }
  )
    .then(() => {
      alert("Yeni kayıt oluşturuldu");
      location.reload(true);
    })
    .catch((e) => {
      alert("Hata: " + e);
    });
}

// Veri silme
async function sahaDolabiSil() {
  console.log(selBox.value);
  var ref = doc(firestore, "Saha_Dolapları", selBox.value);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    alert("Saha dolabı mevcut değil")
    return;
  }
  await deleteDoc(ref)
    .then(() => {
      alert("Kayıt silindi");
      location.reload(true);
    })
    .catch((e) => {
      alert("Hata: " + e);
    });

}
  
  // Tablo oluşturma
  var sn = 0;
  var tbody = document.getElementById("tbody1");
  
  function tabloyaVeriEkleme(
    sahaDolaplari,
  ) {
    let tr = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

  
    td1.innerHTML = ++sn;
    td2.innerHTML = sahaDolaplari;

  
    tr.appendChild(td1);
    tr.appendChild(td2);

  
    tbody.appendChild(tr);
  
  }
  
  function tabloyaTumVerileriEkleme(sahaDolaplari) {
    sn = 0;
    tbody.innerHTML = "";
    sahaDolaplari.forEach(element => {
      tabloyaVeriEkleme(
        element.fs_saha_dolabi,
      )
    });
  }
  
  async function tumVerileriGetir() {
    const arizalarRef= collection(firestore, "Saha_Dolapları");
    const arizalarQuery= query(arizalarRef, orderBy("fs_saha_dolabi"));
    const querySnapshot = await getDocs(arizalarQuery);
    var sahaDolaplari = [];
  
    querySnapshot.forEach(doc => {
        sahaDolaplari.push(doc.data());
    });
  
    tabloyaTumVerileriEkleme(sahaDolaplari);

      // Şebeke Saha Dolaplari
  const sahaDolaplariRef = collection(firestore, "Saha_Dolapları");
  const sahaDolaplariQuery = query(sahaDolaplariRef, orderBy("fs_saha_dolabi"));
  const querySnapshotsahaDolaplari = await getDocs(sahaDolaplariQuery);

  var fs_saha_dolabi = [];

  querySnapshotsahaDolaplari.forEach(doc => {
    fs_saha_dolabi.push(doc.data());
  });

  // Firestore Veri Tabanından Gelen Şebeke Saha Dolaplari Açılır Listesi
  var selsahaDolaplari = $('#selS');

  $.each(fs_saha_dolabi, function (val, text) {
    selsahaDolaplari.append(
      '<option value="' + text.fs_saha_dolabi + '">' + text.fs_saha_dolabi + '</option>');
  });

  newBtn.addEventListener("click", sahaDolabiKayit);
  delBtn.addEventListener("click", sahaDolabiSil);

  }

  window.onload = tumVerileriGetir;

  