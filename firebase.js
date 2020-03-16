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

var databaseData;

function dataHandle(data) {
    databaseData = data.val().Sheet1;
}

function dataError(err) {
    console.log('Error');
    console.log(err);
}

function getClinicInfo(id) {
    let currentClinic;
    Object.keys(databaseData).forEach(function (key) {
        if(databaseData[key].ID == id) {
            currentClinic = databaseData[key];
            console.log(databaseData[key]);
        }
    });
    changeDescriptions(currentClinic);
}

function changeDescriptions(clinic) {
    clinicImage.src = clinic.ImageLink;
    clinicName.innerText = clinic.Name;
    clinicWebsite.innerText = clinic.Website;
    clinicPhone.innerText = clinic.Contacts;
    clinicAddress.innerText = clinic.Address;
    clinicDescription.innerText = clinic.Description;
    clinicResearch.innerText = clinic.Research;
}