$(() => {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $.ajax({
    method: "GET",
    url: "/maps"
  }).done(maps => {
    for (map of maps) {
      $(`<div class="map-list-item">
           <h3>${map.name}</h3>
           <p>Created by ${map.owner}</p>
         </div>`)
        .appendTo($("body"));
    }
  });

  const mymap = L.map("mapid").setView([45.5017, -73.5673], 9);

  const marker = L.marker([45.527519, -73.596536]).addTo(mymap);

  marker.bindPopup("<b>Yo Friends!</b><br>Come here").openPopup();

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiYWFyb25tYXBib3giLCJhIjoiY2swaTcxYzhiMGFjZjNjcDdhbTAwamdjdCJ9.VWSP7Q-2MxofHRFWUZFyQA'
  }).addTo(mymap)

  const onMapClick = (e) => {
    alert("You clicked the map at " + e.latlng);
  }

  mymap.on('click', onMapClick);

});


