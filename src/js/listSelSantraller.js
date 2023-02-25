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
async function santralKayit() {
  var ref = doc(firestore, "Santraller", newBox.value);

  await setDoc(
    ref, {
    fs_santral: newBox.value,
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
async function santralSil() {
  console.log(selBox.value);
  var ref = doc(firestore, "Santraller", selBox.value);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    alert("Santral mevcut değil")
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
  santraller,
) {
  let tr = document.createElement("tr");
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');


  td1.innerHTML = ++sn;
  td2.innerHTML = santraller;


  tr.appendChild(td1);
  tr.appendChild(td2);


  tbody.appendChild(tr);

}

function tabloyaTumVerileriEkleme(santraller) {
  sn = 0;
  tbody.innerHTML = "";
  santraller.forEach(element => {
    tabloyaVeriEkleme(
      element.fs_santral,
    )
  });
}

async function tumVerileriGetir() {
  const arizalarRef = collection(firestore, "Santraller");
  const arizalarQuery = query(arizalarRef, orderBy("fs_santral"));
  const querySnapshot = await getDocs(arizalarQuery);
  var santraller = [];

  querySnapshot.forEach(doc => {
    santraller.push(doc.data());
  });

  tabloyaTumVerileriEkleme(santraller);

  // Santraller
  const santrallerRef = collection(firestore, "Santraller");
  const santrallerQuery = query(santrallerRef, orderBy("fs_santral"));
  const querySnapshotSantraller = await getDocs(santrallerQuery);

  var fs_santral = [];

  querySnapshotSantraller.forEach(doc => {
    fs_santral.push(doc.data());
  });

  // Firestore Veri Tabanından Gelen Santraller Açılır Listesi
  var selSantraller = $('#selS');

  $.each(fs_santral, function (val, text) {
    selSantraller.append(
      '<option value="' + text.fs_santral + '">' + text.fs_santral + '</option>');
  });

  newBtn.addEventListener("click", santralKayit);
  delBtn.addEventListener("click", santralSil);

}

window.onload = tumVerileriGetir;

