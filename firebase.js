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

let clinicName = document.querySelector(".clinic-name");
let clinicWebsite = document.getElementById("clinic-website");
let clinicPhone = document.getElementById("clinic-phone");
let clinicAddress = document.getElementById("clinic-address");
let clinicDescription = document.getElementById("clinic-description");
let clinicResearch = document.getElementById("clinic-research");

let minMaxDates;

var databaseData;

function dataHandle(data) {
    databaseData = data.val().Sheet1;
    minMaxDates = getMinMaxDates();
    updateSlider();
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
    // clinicImage.src = clinic.imagelink;
    clinicName.innerText = clinic.name;
    clinicWebsite.innerText = clinic.website;
    clinicWebsite.href = clinic.website;
    clinicPhone.innerText = clinic.contacts;
    clinicAddress.innerText = clinic.address;
    clinicDescription.innerText = clinic.description;
    clinicResearch.innerText = clinic.research;
    SetTheInputs(clinic);
    SetImages(getImagesLinks(clinic));
    SetAudios(getAudiosLinks(clinic));
}

function SetTheInputs(clinic) {
    console.log("CALLED TOGGLE INPUTS")

    SetInput(clinic.antiaging, "has-antiaging");
    SetInput(clinic.bodyshaping, "has-bodyshaping");
    SetInput(clinic.ethnic, "has-ethnic");
    SetInput(clinic.facesurgery, "has-facesurgery");
    SetInput(clinic.genital, "has-genital");
    SetInput(clinic.mommy, "has-mommy");
}

function SetInput(clinicParam, elementId)
{
    var className = "hidden";
    var element = document.getElementById(elementId);
    console.log(element);
    console.log(clinicParam);
    console.log(clinicParam == false);

    if (clinicParam == false){
        element.classList.remove(className);
        element.classList.add(className);
    }
    else
        element.classList.remove(className);
}

// function GetInputString(clinicParam, name)
// {
//     var pattern = "<div class=\"checkbox-inside-container\"><input type=\"checkbox\"checked disabled=\"disabled\"/><label for=\"myChk\">{0}</label></div>";

// }

function getMinMaxDates() {
    var min = 3000;
    var max = -1;
    Object.keys(databaseData).forEach(function (key) {
        var dateopen = databaseData[key].dateopen;

        if (!isNaN(dateopen) && dateopen != "") {
            
            if (min >= dateopen)
                min = dateopen;

            if (max <= dateopen)
                max = dateopen;
        }
    });

    return [min, max];
}

function updateSlider()
{
    slider.noUiSlider.updateOptions({
        start: [minMaxDates[0], minMaxDates[1]],
        step: 1,
        connect: true,
        range: {
            'min': minMaxDates[0],
            'max': minMaxDates[1]
        },
        // Formats the numbers to integers
        format: {
            from: function (value) {
                return parseInt(value);
            },
            to: function (value) {
                return parseInt(value);
            }
        }
    });
}

function getImagesLinks(clinic)
{
    var imgs = [];
    for (let i = 0; i < 7; i++) {
        var link = clinic["imagelink" + i.toString()];
        if(link == "")
            continue;
            
        if(isGoogleDriveLink(link))
            link = getGoogleDownloadLinkFromId(extractGoogleFileIdFromLink(link));
            
        imgs[i] = link;
    }

    return imgs;
}

function getAudiosLinks(clinic)
{
    var audios = [];
    for (let i = 0; i < 7; i++) {
        var audioLink = clinic["audiolink" + i.toString()];
        if(audioLink == "")
            continue;

        if(isGoogleDriveLink(audioLink))
            audioLink = getGoogleDownloadLinkFromId(extractGoogleFileIdFromLink(audioLink));

        audios[i] = audioLink;
    }

    return audios;
}

function extractGoogleFileIdFromLink(link)
{
    var pattern = /\/d\/(.+)\//i;
    var match = pattern.exec(link);
    var id = match[1];
    return id;
}

function getGoogleDownloadLinkFromId(id)
{
    return "https://docs.google.com/uc?export=download&id=" + id;
}

function isGoogleDriveLink(link)
{
    return link.includes("drive.google.com");
}