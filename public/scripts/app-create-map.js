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

  // const marker = L.marker([45.527519, -73.596536]).addTo(mymap);

  //marker.bindPopup("<b>Yo Friends!</b><br>Come here").openPopup();

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiYWFyb25tYXBib3giLCJhIjoiY2swaTcxYzhiMGFjZjNjcDdhbTAwamdjdCJ9.VWSP7Q-2MxofHRFWUZFyQA'
  }).addTo(mymap)

  const mapZoomCentered = () => {
    // work with leaflets api to center view on pointers
    //called after every change
  }

  const saveMapToDatabase = (map) => {
    //db query
  }

  const saveLocationToDatabase = (location) => {
    //db query
  }

  const onMapClick = (e) => {

    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

    const keepMarkerInjection =
      `
      <article class="yes-no-keep-marker">
      <h5>Want to keep this marker?</h5>
      <h6>Latitude: ${e.latlng.lat.toFixed(4)}, Longitude: ${e.latlng.lng.toFixed(4)}</h6>
      <button type="button" id="yes-marker" class="btn btn-primary">Yes!</button>
      <button type="button" id="no-marker" class="btn btn-danger">  No  </button>
      </article>`

    $(".create-map-form").append(keepMarkerInjection)

    mymap.off('click', onMapClick);

    $("#yes-marker").click(() => {
      $(".yes-no-keep-marker").remove()

    })

    $("#no-marker").click(() => {
      mymap.on('click', onMapClick)
      $(".yes-no-keep-marker").remove()
      mymap.removeLayer(marker)
    })

    //marker.bindPopup("<b>new</b><br>yo").openPopup();

  }

  mymap.on('click', onMapClick);

});

{/* <section class="map-form">
  <h5>Want to keep this marker?</h5>
  <h6>latitude, longitude</h6>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <form id="tweetForm">
    <textarea name="text" placeholder="What are you humming about?"></textarea>
    <div>
      <input type="submit" value="Tweet" />
      <span class="counter">140</span>
    </div>
  </form>
</section> */}


