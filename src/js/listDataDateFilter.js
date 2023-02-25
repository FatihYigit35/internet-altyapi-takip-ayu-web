// Firebase foknsiyonalrı için import
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

import {
  getFirestore,
  getDocs,
  collection,
  orderBy,
  query,
  startAt,
  endAt,
  where
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

// Tablo oluşturma
var sn = 0;
var tbody = document.getElementById("tbody1");

function tabloyaVeriEkleme(
  namelname, tel, adres, homepass, sel5, sel6, sel7, sel8, sel9, sel2, sel3, sel4, sel, timestamp
) {
  let tr = document.createElement("tr");
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');
  let td6 = document.createElement('td');
  let td7 = document.createElement('td');
  let td8 = document.createElement('td');
  let td9 = document.createElement('td');
  let td10 = document.createElement('td');
  let td11 = document.createElement('td');
  let td12 = document.createElement('td');
  let td13 = document.createElement('td');
  let td14 = document.createElement('td');
  let td15 = document.createElement('td');

  td1.innerHTML = ++sn;
  td2.innerHTML = namelname;
  td3.innerHTML = tel;
  td4.innerHTML = adres;
  td5.innerHTML = homepass;
  td6.innerHTML = sel5;
  td7.innerHTML = sel6;
  td8.innerHTML = sel7;
  td9.innerHTML = sel8;
  td10.innerHTML = sel9;
  td11.innerHTML = sel2;
  td12.innerHTML = sel3;
  td13.innerHTML = sel4;
  td14.innerHTML = sel;
  td15.innerHTML = timestamp;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);
  tr.appendChild(td8);
  tr.appendChild(td9);
  tr.appendChild(td10);
  tr.appendChild(td11);
  tr.appendChild(td12);
  tr.appendChild(td13);
  tr.appendChild(td14);
  tr.appendChild(td15);

  tbody.appendChild(tr);

}

function tabloyaTumVerileriEkleme(arizalar) {
  sn = 0;
  tbody.innerHTML = "";
  arizalar.forEach(element => {
    tabloyaVeriEkleme(
      element.Ad_Soyad,
      element.Tel,
      element.Bina_adresi,
      element.Homepass,
      element.Bina_en_yakın_altyapıya_bağlımı,
      element.Binada_dairelere_obk_çekilimi,
      element.Bina_girişinde_elektrik_panosu_mevcutmu,
      element.Bina_önünde_altyapı_logarı_varmı,
      element.Binada_rakip_firma_altyapısı_varmı,
      element.Şebeke_santrali,
      element.Şebeke_saha_dolabı,
      element.Şebeke_abone_saha_kutusu,
      element.Arıza_tipi,
      element.Tarih
    )
  });
}


//Tablodan filtreli verileri getirme
async function verileriGetir() {

  var startDate = document.getElementById("dateStart");
  var endDate = document.getElementById("dateEnd");
  var arizaTipiListDate = document.getElementById("selDataList");

  let startDateV = startDate.value;
  let endDateV = endDate.value;
  let arizaTipiListDateV = arizaTipiListDate.value;

  const arizalarRef = collection(firestore, "Arızalar");

  var arizalar = [];

  console.log("ArizaTipi: " + arizaTipiListDateV + " -- Başlangıç " + startDateV + " -- Bitiş " + endDateV);

  if (startDateV === "" && endDateV === "" && arizaTipiListDateV == "") {
    const arizalarQuery = query(arizalarRef, orderBy("Tarih"));
    const querySnapshot = await getDocs(arizalarQuery);

    querySnapshot.forEach(doc => {
      arizalar.push(doc.data());
    });

    tabloyaTumVerileriEkleme(arizalar);

  } else if (endDateV === "" && arizaTipiListDateV == "") {
    const arizalarQuery = query(arizalarRef, orderBy("Tarih"), startAt(startDateV));
    const querySnapshot = await getDocs(arizalarQuery);

    querySnapshot.forEach(doc => {
      arizalar.push(doc.data());
    });

    tabloyaTumVerileriEkleme(arizalar);

  } else if (startDateV === "" && arizaTipiListDateV == "") {
    const arizalarQuery = query(arizalarRef, orderBy("Tarih"), endAt(endDateV));
    const querySnapshot = await getDocs(arizalarQuery);

    querySnapshot.forEach(doc => {
      arizalar.push(doc.data());
    });

    tabloyaTumVerileriEkleme(arizalar);

  } else if(arizaTipiListDateV == ""){
    const arizalarQuery = query(arizalarRef, orderBy("Tarih"), startAt(startDateV), endAt(endDateV));
    const querySnapshot = await getDocs(arizalarQuery);

    querySnapshot.forEach(doc => {
      arizalar.push(doc.data());
    });

  
    tabloyaTumVerileriEkleme(arizalar);

  }else  if (startDateV === "" && endDateV === "") {
    const arizalarQuery = query(arizalarRef, orderBy("Tarih"), where("Arıza_tipi", "==" , arizaTipiListDateV));
    const querySnapshot = await getDocs(arizalarQuery);


    querySnapshot.forEach(doc => {
      arizalar.push(doc.data());
    });

    tabloyaTumVerileriEkleme(arizalar);

  } else if (endDateV === "") {
    const arizalarQuery = query(arizalarRef, orderBy("Tarih"), where("Arıza_tipi", "==" , arizaTipiListDateV), startAt(startDateV));
    const querySnapshot = await getDocs(arizalarQuery);

    querySnapshot.forEach(doc => {
      arizalar.push(doc.data());
    });

    tabloyaTumVerileriEkleme(arizalar);

  } else if (startDateV === "") {
    const arizalarQuery = query(arizalarRef, orderBy("Tarih"), where("Arıza_tipi", "==" , arizaTipiListDateV), endAt(endDateV));
    const querySnapshot = await getDocs(arizalarQuery);

    querySnapshot.forEach(doc => {
      arizalar.push(doc.data());
    });

    tabloyaTumVerileriEkleme(arizalar);

  } else {
    const arizalarQuery = query(arizalarRef, orderBy("Tarih"), where("Arıza_tipi", "==" , arizaTipiListDateV), startAt(startDateV), endAt(endDateV));
    const querySnapshot = await getDocs(arizalarQuery);

    querySnapshot.forEach(doc => {
      arizalar.push(doc.data());
    });

  
    tabloyaTumVerileriEkleme(arizalar);

  }

}

let sorgulaBtn = document.getElementById("sorgula");
sorgulaBtn.addEventListener("click", verileriGetir);

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

  var selArizaTipleri = $('#selDataList');

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

  var selSantraller = $('#selDataList2');

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

  var selSahaDolaplari = $('#selDataList3');

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

  var selAboneKutulari = $('#selDataList4');

  $.each(fs_abone_kutusu, function (val, text) {
    selAboneKutulari.append(
      '<option value="' + text.fs_abone_kutusu + '">' + text.fs_abone_kutusu + '</option>');
  });

}

window.onload = firestoreAcilirListeleriGetir;
