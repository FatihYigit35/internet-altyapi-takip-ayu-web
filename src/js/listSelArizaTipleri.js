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
async function arizaTipiKayit() {
  var ref = doc(firestore, "Arıza_Tipleri", newBox.value);

  await setDoc(
    ref, {
    fs_ariza_tipi: newBox.value,
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
async function arizaTipiSil() {
  console.log(selBox.value);
  var ref = doc(firestore, "Arıza_Tipleri", selBox.value);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    alert("Arıza tipi mevcut değil")
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
    arizaTipleri,
  ) {
    let tr = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

  
    td1.innerHTML = ++sn;
    td2.innerHTML = arizaTipleri;

  
    tr.appendChild(td1);
    tr.appendChild(td2);

  
    tbody.appendChild(tr);
  
  }
  
  function tabloyaTumVerileriEkleme(arizaTipleri) {
    sn = 0;
    tbody.innerHTML = "";
    arizaTipleri.forEach(element => {
      tabloyaVeriEkleme(
        element.fs_ariza_tipi,
      )
    });
  }
  
  async function tumVerileriGetir() {
    const arizalarRef= collection(firestore, "Arıza_Tipleri");
    const arizalarQuery= query(arizalarRef, orderBy("fs_ariza_tipi"));
    const querySnapshot = await getDocs(arizalarQuery);
    var arizaTipleri = [];
  
    querySnapshot.forEach(doc => {
      arizaTipleri.push(doc.data());
    });
  
    tabloyaTumVerileriEkleme(arizaTipleri);

      // Ariza Tipleri
  const arizaTipleriRef = collection(firestore, "Arıza_Tipleri");
  const arizaTipleriQuery = query(arizaTipleriRef, orderBy("fs_ariza_tipi"));
  const querySnapshotarizaTipleri = await getDocs(arizaTipleriQuery);

  var fs_ariza_tipi = [];

  querySnapshotarizaTipleri.forEach(doc => {
    fs_ariza_tipi.push(doc.data());
  });

  // Firestore Veri Tabanından Gelen Ariza Tipleri Açılır Listesi
  var selArizaTipleri = $('#selS');

  $.each(fs_ariza_tipi, function (val, text) {
    selArizaTipleri.append(
      '<option value="' + text.fs_ariza_tipi + '">' + text.fs_ariza_tipi + '</option>');
  });

  newBtn.addEventListener("click", arizaTipiKayit);
  delBtn.addEventListener("click", arizaTipiSil);

  }

  window.onload = tumVerileriGetir;

  