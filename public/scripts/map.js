$(() => {
  const mymap = L.map("mapid").setView([45.5017, -73.5673], 9);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiYWFyb25tYXBib3giLCJhIjoiY2swaTcxYzhiMGFjZjNjcDdhbTAwamdjdCJ9.VWSP7Q-2MxofHRFWUZFyQA'
  }).addTo(mymap)

  const url = document.location.href;
  const urlParts = url.split("/");
  const mapID = urlParts[urlParts.length - 1];

  $.ajax({
    url: `/api/locations/${mapID}`
  }).done(locations => {
    for (let location of locations) {
      const marker = L.marker(location.latitude, location.longitude).addTo(mymap)
      marker.bindPopup(`<b>${location.title}</b>
                        <br>${location.description}`)
    }
  }).fail(err => console.log(err))
})
