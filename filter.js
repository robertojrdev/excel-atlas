
let typeofclinic = document.getElementById("check-typeofclinic");
let typeofintervention = document.getElementById("check-typeofintervention");

// types of clinics
let toggleAestheticCentre = document.getElementById("check-aestheticcentre");
let toggleAestheticMedicine = document.getElementById("check-aestheticmedicine");

//types of intervention
let toggleAntiAging = document.getElementById("check-antiaging");
let toggleBodyshaping = document.getElementById("check-bodyshaping");
let toggleEthnic = document.getElementById("check-ethnic");
let toggleFaceSurgery = document.getElementById("check-facesurgery");
let toggleGenital = document.getElementById("check-genital");
let toggleMommy = document.getElementById("check-mommy");
let toggleCircuit = document.getElementById("check-circuit");

function getMarkersFromFilter() {
    var list = [];

    Object.keys(databaseData).forEach(function (key) {
        var item = databaseData[key];
        if(item.marker == undefined)
            return;
        
        var sliderRange = slider.noUiSlider.get();

        if(item.dateopen < sliderRange[0] || item.dateopen > sliderRange[1])
            return;

        if(typeofclinic.checked == true)
        {
            if (toggleAestheticCentre.checked == true && item.aestheticcentre == "false")
                return;
            if (toggleAestheticMedicine.checked == true && item.aestheticmedicine == "false")
                return;
        }

        if(typeofintervention.checked == true)
        {
            if (toggleCircuit.checked == true && item.circuit == "false")
                return;
            if (toggleMommy.checked == true && item.mommy == "false")
                return;
            if (toggleAntiAging.checked == true && item.antiaging == "false")
                return;
            if (toggleGenital.checked == true && item.genital == "false")
                return;
            if (toggleEthnic.checked == true && item.ethnic == "false")
                return;
            if (toggleBodyshaping.checked == true && item.bodyshaping == "false")
                return;
            if (toggleFaceSurgery.checked == true && item.facesurgery == "false")
                return;
        }

        list.push(item.marker);
    });

    return list;
}

function updateMarkers()
{
    var clinicsMarkers = getMarkersFromFilter();
    showMarkers(clinicsMarkers);
}