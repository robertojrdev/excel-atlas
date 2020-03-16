// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA8YMUd65a3rc3l_pXMRfELEPUmN3nMtvY",
    authDomain: "excel-atlas.firebaseapp.com",
    databaseURL: "https://excel-atlas.firebaseio.com/",
    projectId: "excel-atlas",
    storageBucket: "excel-atlas.appspot.com",
    messagingSenderId: "38371300781",
    appId: "1:38371300781:web:1974138cdb07534d5bfd24"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var ref = database.ref('1ex4NhosRYg7NvCYOA0FdScx8tcdg39OFF51iXvx15Tw');
ref.on('value', dataHandle, dataError);

let clinicImage = document.querySelector(".img-slider");
let clinicName = document.querySelector(".clinic-name");
let clinicWebsite = document.getElementById("clinic-website");
let clinicPhone = document.getElementById("clinic-phone");
let clinicAddress = document.getElementById("clinic-address");
let clinicDescription = document.getElementById("clinic-description");
let clinicResearch = document.getElementById("clinic-research");

let hasHtInvasive = document.getElementById("has-htinvasive");
let hasHtNonInvasive = document.getElementById("has-htnoninvasive");
let hasLt = document.getElementById("has-lowtech");
let hasCircuit = document.getElementById("has-circuit");
let hasDermatology = document.getElementById("has-dermatology");
let hasMommy = document.getElementById("has-mommy");
let hasAntiAging = document.getElementById("has-antiaging");
let hasGenital = document.getElementById("has-genital");
let hasEthnic = document.getElementById("has-ethnic");

var databaseData;

var dates = dates_as_int.map(function(dateStr) {
    return new Date(dateStr).getTime();
});

function dataHandle(data) {
    databaseData = data.val().Sheet1;
    loadMarkers();
    showMarkers(markers);
    // console.log(val);
    // Object.keys(val).forEach(function (key) {
    //     console.log(key, val[key]);
    // });
}

function dataError(err) {
    console.log('Error');
    console.log(err);
}

function getClinicInfo(id) {
    let currentClinic;
    Object.keys(databaseData).forEach(function (key) {
        if (databaseData[key].id == id) {
            currentClinic = databaseData[key];
            console.log(databaseData[key]);
        }
    });
    changeDescriptions(currentClinic);
}

function changeDescriptions(clinic) {
    clinicImage.src = clinic.imagelink;
    clinicName.innerText = clinic.name;
    clinicWebsite.innerText = clinic.website;
    clinicWebsite.href = clinic.website;
    clinicPhone.innerText = clinic.contacts;
    clinicAddress.innerText = clinic.address;
    clinicDescription.innerText = clinic.description;
    clinicResearch.innerText = clinic.research;
    toggleInputs(clinic);
}

function toggleInputs(clinic) {
    if (clinic.htinvasive == "false")
        hasHtInvasive.classList.add("dspl-nn");
    else
        hasHtInvasive.classList.remove("dspl-nn");
    if (clinic.htnoninvasive == "false")
        hasHtNonInvasive.classList.add("dspl-nn");
    else
        hasHtNonInvasive.classList.remove("dspl-nn");
    if (clinic.lowtech == "false")
        hasLt.classList.add("dspl-nn");
    else
        hasLt.classList.remove("dspl-nn");
    if (clinic.circuit == "false")
        hasCircuit.classList.add("dspl-nn");
    else
        hasCircuit.classList.remove("dspl-nn");
    if (clinic.dermatology == "false")
        hasDermatology.classList.add("dspl-nn");
    else
        hasDermatology.classList.remove("dspl-nn");
    if (clinic.mommy == "false")
        hasMommy.classList.add("dspl-nn");
    else
        hasMommy.classList.remove("dspl-nn");
    if (clinic.antiaging == "false")
        hasAntiAging.classList.add("dspl-nn");
    else
        hasAntiAging.classList.remove("dspl-nn");
    if (clinic.enital == "false")
        hasGenital.classList.add("dspl-nn");
    else
        hasGenital.classList.remove("dspl-nn");
    if (clinic.ethnic == "false")
        hasEthnic.classList.add("dspl-nn");
    else
        hasEthnic.classList.remove("dspl-nn");
}


