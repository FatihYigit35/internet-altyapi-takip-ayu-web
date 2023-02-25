// Firebase foknsiyonalrı için import
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

import {
  getFirestore,
  getDocs,
  collection,
  addDoc,
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
let nameLnameBox = document.getElementById("nameLname");
let telBox = document.getElementById("tel");
let adresBox = document.getElementById("adres");
let homepassBox = document.getElementById("homepass");
let selBox = document.getElementById("sel");
let sel2Box = document.getElementById("sel2");
let sel3Box = document.getElementById("sel3");
let sel4Box = document.getElementById("sel4");
let sel5Box = document.getElementById("sel5");
let sel6Box = document.getElementById("sel6");
let sel7Box = document.getElementById("sel7");
let sel8Box = document.getElementById("sel8");
let sel9Box = document.getElementById("sel9");
let gonderBtn = document.getElementById("gonder");

// Veri ekleme
async function arizaFormuKayit() {
  var ref = collection(firestore, "Arızalar");

  const tarih = new Date();
  let gun = tarih.getDate();
  let gunR = "";
  if (gun < 10) {
    gunR = "0" + gun;
  } else {
    gunR = gun;
  }
  let ay = tarih.getMonth() + 1;
  let ayR = "";
  if (ay < 10) {
    ayR = "0" + ay;
  } else {
    ayR = ay;
  }
  let yil = tarih.getFullYear();
  let bugunTarih = yil + "-" + ayR + "-" + gunR;

  await addDoc(
    ref, {
    Ad_Soyad: nameLnameBox.value,
    Tel: telBox.value,
    Bina_adresi: adresBox.value,
    Homepass: homepassBox.value,
    Bina_en_yakın_altyapıya_bağlımı: sel5Box.value,
    Binada_dairelere_obk_çekilimi: sel6Box.value,
    Bina_girişinde_elektrik_panosu_mevcutmu: sel7Box.value,
    Bina_önünde_altyapı_logarı_varmı: sel8Box.value,
    Binada_rakip_firma_altyapısı_varmı: sel9Box.value,
    Şebeke_santrali: sel2Box.value,
    Şebeke_saha_dolabı: sel3Box.value,
    Şebeke_abone_saha_kutusu: sel4Box.value,
    Arıza_tipi: selBox.value,
    Tarih: bugunTarih
  }
  )
    .then(() => {
      alert("Yeni arıza kaydı oluşturuldu");
      location.reload(true);
    })
    .catch((e) => {
      alert("Hata: " + e);
    });
}

gonderBtn.addEventListener("click", arizaFormuKayit);


// Firestore Veri Tabanından Gelen Açılır Listeler
async function firestoreAcilirListeleriGetir() {

  // Arıza Tipleri
  const arizaTipleriRef = collection(firestore, "Arıza_Tipleri");
  const arizaTipleriQuery = query(arizaTipleriRef, orderBy("fs_ariza_tipi"));
  const querySnapshotArizaTipleri = await getDocs(arizaTipleriQuery);

  var fs_ariza_tipi = [];

  querySnapshotArizaTipleri.forEach(doc => {
    fs_ariza_tipi.push(doc.data());
  });

  var selArizaTipleri = $('#sel');

  $.each(fs_ariza_tipi, function (val, text) {
    selArizaTipleri.append(
      '<option value="' + text.fs_ariza_tipi + '">' + text.fs_ariza_tipi + '</option>');
  });

  // Santraller
  const santrallerRef = collection(firestore, "Santraller");
  const santrallerQuery = query(santrallerRef, orderBy("fs_santral"));
  const querySnapshotSantraller = await getDocs(santrallerQuery);

  var fs_santral = [];

  querySnapshotSantraller.forEach(doc => {
    fs_santral.push(doc.data());
  });

  var selSantraller = $('#sel2');

  $.each(fs_santral, function (val, text) {
    selSantraller.append(
      '<option value="' + text.fs_santral + '">' + text.fs_santral + '</option>');
  });

  // Saha Dolapları
  const sahaDolaplariRef = collection(firestore, "Saha_Dolapları");
  const sahaDolaplariQuery = query(sahaDolaplariRef, orderBy("fs_saha_dolabi"));
  const querySnapshotSahaDolaplari = await getDocs(sahaDolaplariQuery);

  var fs_saha_dolabi = [];

  querySnapshotSahaDolaplari.forEach(doc => {
    fs_saha_dolabi.push(doc.data());
  });

  var selSahaDolaplari = $('#sel3');

  $.each(fs_saha_dolabi, function (val, text) {
    selSahaDolaplari.append(
      '<option value="' + text.fs_saha_dolabi + '">' + text.fs_saha_dolabi + '</option>');
  });

  // Abone Kutuları
  const aboneKutulariRef = collection(firestore, "Abone_Kutuları");
  const aboneKutulariQuery = query(aboneKutulariRef, orderBy("fs_abone_kutusu"));
  const querySnapshotAboneKutulari = await getDocs(aboneKutulariQuery);

  var fs_abone_kutusu = [];

  querySnapshotAboneKutulari.forEach(doc => {
    fs_abone_kutusu.push(doc.data());
  });

  var selAboneKutulari = $('#sel4');

  $.each(fs_abone_kutusu, function (val, text) {
    selAboneKutulari.append(
      '<option value="' + text.fs_abone_kutusu + '">' + text.fs_abone_kutusu + '</option>');
  });

}

window.onload = firestoreAcilirListeleriGetir;
