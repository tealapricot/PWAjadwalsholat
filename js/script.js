//menarik list kota-kota diindonesia
window.addEventListener("load", getCoord());

function getCoord(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(coordFound);
   
  }
  else {
    //default akan menjadi jakarta apabila geoloc gagal
    cariKota(-6.175392,106.827153)
  }
}
function coordFound(pos){
  cariKota(pos.coords.latitude,pos.coords.longitude)
}

function cariKota(lat,lon){
  fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+lat+"&longitude="+lon+"&localityInfo=administrative&administrative=2")
  .then((Response) => Response.json())
  .then((data) => {
    console.log("Kota = "+data.localityInfo.administrative[2].name);
    getIdKota(data.localityInfo.administrative[2].name)
  })
}

function getIdKota(kota) {
  fetch("https://api.myquran.com/v1/sholat/kota/cari/"+kota)
  .then((Response) => Response.json())
  .then((data) => {
    console.log("ID Kota = "+data.data[0].id);
    getJamSholat(data.data[0].id);
})
}

function getJamSholat(idkota){
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  fetch("https://api.myquran.com/v1/sholat/jadwal/"+idkota+"/"+year+"/"+month)
  .then((Response) => Response.json())
  .then((data) => {
    console.log(data.data.jadwal);
})
}


//funtion untuk menampilkan tanggal hari ini
function showDate() {
  let today = new Date().toLocaleDateString();
  document.getElementById("todaydate").innerHTML = today;
}

function shalattime() {
  let date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
}
showDate();
