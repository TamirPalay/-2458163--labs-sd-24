function getCountryInfo(){
    const searchCountry= document.getElementById("js-country-box").value;
    getCountries(searchCountry);
   
}

async function getCountries(searchCountry){
const response= await fetch("https://restcountries.com/v3.1/name/" + searchCountry);
const country= await response.json();
displayCountry(country);

}

function displayCountry(country){
    const cap=country[0].capital;
    const pop=country[0].population;
    const reg= country[0].region;
    const imglink=country[0].flags.png
    document.querySelector(".Name").innerText=country[0].name.common;
    document.querySelector(".Capital").innerText+=`  ${cap}` ;
    document.querySelector(".Population").innerText+=`  ${pop}` ;
    document.querySelector(".Region").innerText+=`  ${reg}` ;
   document.querySelector(".Flag").src=imglink;
const borders=country[0].borders;
const borderingCountriesSection = document.getElementById("BorderingCountries");
borders.forEach(async element => {
    const response= await fetch("https://restcountries.com/v3.1/alpha/" + element);
    const border= await response.json();

    const newBorder= border[0].name.common;
    const newImgLink=border[0].flags.png


newParagraph=document.createElement("p");
newImg=document.createElement("img");

   // countryElement.innerHTML = `${newBorder} <img src="${newImgLink}" >`;
    //sectionID.appendChild(countryElement);
    // Setting the text content of the new paragraph
   newParagraph.textContent = newBorder;
    newImg.src=newImgLink
    // Appending the new paragraph to the body of the document
   document.body.appendChild(newParagraph);
    document.body.appendChild(newImg);
   // sectionID.insertBefore(newParagraph,newImg);
});

}