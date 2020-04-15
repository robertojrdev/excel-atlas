
let toggleHtInvasive = document.getElementById("check-htinvasive");
let toggleHtNonInvasive = document.getElementById("check-htnoninvasive");
let toggleLt = document.getElementById("check-lowtech");
let toggleCircuit = document.getElementById("check-circuit");
let toggleDermatology = document.getElementById("check-dermatology");
let toggleMommy = document.getElementById("check-mommy");
let toggleAntiAging = document.getElementById("check-antiaging");
let toggleGenital = document.getElementById("check-genital");
let toggleEthnic = document.getElementById("check-ethnic");

function getMarkersFromFilter() {
    var list = [];

    Object.keys(databaseData).forEach(function (key) {
        var item = databaseData[key];
        if(item.marker == undefined)
            return;
        
        var sliderRange = slider.noUiSlider.get();

        if(item.dateopen < sliderRange[0] || item.dateopen > sliderRange[1])
            return;
        if (toggleHtInvasive.checked == true && item.htinvasive == "false")
            return;
        if (toggleHtNonInvasive.checked == true && item.htnoninvasive == "false")
            return;
        if (toggleLt.checked == true && item.lowtech == "false")
            return;
        if (toggleCircuit.checked == true && item.circuit == "false")
            return;
        if (toggleDermatology.checked == true && item.dermatology == "false")
            return;
        if (toggleMommy.checked == true && item.mommy == "false")
            return;
        if (toggleAntiAging.checked == true && item.antiaging == "false")
            return;
        if (toggleGenital.checked == true && item.genital == "false")
            return;
        if (toggleEthnic.checked == true && item.ethnic == "false")
            return;

        list.push(item.marker);
    });

    return list;
}

function updateMarkers()
{
    var clinicsMarkers = getMarkersFromFilter();
    showMarkers(clinicsMarkers);
}