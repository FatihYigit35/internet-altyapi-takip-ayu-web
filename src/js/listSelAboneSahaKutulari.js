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
async function aboneSahaKutusuKayit() {
  var ref = doc(firestore, "Abone_Kutuları", newBox.value);

  await setDoc(
    ref, {
    fs_abone_kutusu: newBox.value,
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
async function aboneSahaKutusuSil() {
  console.log(selBox.value);
  var ref = doc(firestore, "Abone_Kutuları", selBox.value);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    alert("Abone saha kutusu mevcut değil")
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
    aboneSahaKutulari,
  ) {
    let tr = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');

  
    td1.innerHTML = ++sn;
    td2.innerHTML = aboneSahaKutulari;

  
    tr.appendChild(td1);
    tr.appendChild(td2);

  
    tbody.appendChild(tr);
  
  }
  
  function tabloyaTumVerileriEkleme(aboneSahaKutulari) {
    sn = 0;
    tbody.innerHTML = "";
    aboneSahaKutulari.forEach(element => {
      tabloyaVeriEkleme(
        element.fs_abone_kutusu,
      )
    });
  }
  
  async function tumVerileriGetir() {
    const arizalarRef= collection(firestore, "Abone_Kutuları");
    const arizalarQuery= query(arizalarRef, orderBy("fs_abone_kutusu"));
    const querySnapshot = await getDocs(arizalarQuery);
    var aboneSahaKutulari = [];
  
    querySnapshot.forEach(doc => {
        aboneSahaKutulari.push(doc.data());
    });
  
    tabloyaTumVerileriEkleme(aboneSahaKutulari);

      // Şebeke Abone Saha Kutulari
  const aboneSahaKutulariRef = collection(firestore, "Abone_Kutuları");
  const aboneSahaKutulariQuery = query(aboneSahaKutulariRef, orderBy("fs_abone_kutusu"));
  const querySnapshotaboneSahaKutulari = await getDocs(aboneSahaKutulariQuery);

  var fs_abone_kutusu = [];

  querySnapshotaboneSahaKutulari.forEach(doc => {
    fs_abone_kutusu.push(doc.data());
  });

  // Firestore Veri Tabanından Gelen Şebeke Abone Saha Kutulari Açılır Listesi
  var selaboneSahaKutulari = $('#selS');

  $.each(fs_abone_kutusu, function (val, text) {
    selaboneSahaKutulari.append(
      '<option value="' + text.fs_abone_kutusu + '">' + text.fs_abone_kutusu + '</option>');
  });

  newBtn.addEventListener("click", aboneSahaKutusuKayit);
  delBtn.addEventListener("click", aboneSahaKutusuSil);

  }

  window.onload = tumVerileriGetir;

  