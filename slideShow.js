

function SetImages(imagesRef)
{
    let container = document.querySelector(".carousel-inner");

    let pattern = "<div class=\"carousel-item {0}\"> <img class=\"d-block w-100\" src=\"{1}\" alt=\"First slide\"></div>";
    let totalHtml = "";

    for (let i = 0; i < imagesRef.length; i++) 
    {
        const img = imagesRef[i];
        if(img == "")
            continue;

        var htmlItem = pattern.replace("{0}", i === 0 ? "active" : "").replace("{1}", img);
        totalHtml += "\n" + htmlItem;
    }

    container.innerHTML = totalHtml;
}

function SetAudios(audiosRef)
{
    let container = document.querySelector(".audios");

    let pattern = "<audio controls class=\"audio-player\"><source src=\"{0}\" type=\"audio/mpeg\">{1}</audio>";
    let totalHtml = "";

    for (let i = 0; i < imagesRef.length; i++) 
    {
        const audio = audiosRef[i];
        if(audio == "")
            continue;

        var htmlItem = pattern.replace("{0}", audio).replace("{1}", i === 0 ? "Your browser does not support the audio element." : "");
        totalHtml += "\n" + htmlItem;
    }

    container.innerHTML = totalHtml;
}