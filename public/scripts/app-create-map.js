$(() => {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // $.ajax({
  //   method: "GET",
  //   url: "/maps"
  // }).done(maps => {
  //   for (map of maps) {
  //     $(`<div class="map-list-item">
  //          <h3>${map.name}</h3>
  //          <p>Created by ${map.owner}</p>
  //        </div>`)
  //       .appendTo($("body"));
  //   }
  // });


  const mymap = L.map("mapid").setView([45.5017, -73.5673], 9);

  const createNewMap = (mymap) => {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiYWFyb25tYXBib3giLCJhIjoiY2swaTcxYzhiMGFjZjNjcDdhbTAwamdjdCJ9.VWSP7Q-2MxofHRFWUZFyQA'
    }).addTo(mymap)
  }

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


  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  createNewMap(mymap);

  const arrayOfLatLng = [];
  const arrayOfMarkers = [];

  const onMapClick = (e) => {

    const marker = new L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);

    const keepMarkerInjection =
      `
      <article id="yes-no-keep-marker">
      <h5>Want to keep this marker?</h5>
      <h6>Latitude: ${e.latlng.lat.toFixed(4)}, Longitude: ${e.latlng.lng.toFixed(4)}</h6>
      <button type="button" id="yes-marker" class="btn btn-primary">Yes!</button>
      <button type="button" id="no-marker" class="btn btn-danger">  No  </button>
      </article>`

    $(".create-map-form").append(keepMarkerInjection)

    mymap.off('click', onMapClick);

    //--------------------------------------------------------------
    //If click for marker location is accepted (User clicks 'YES' button)
    $("#yes-marker").click(() => {

      const formInjection =
        `
      <article id="marker-form">
      <input class="form-control" type="text" name="title" placeholder="The name of your space">
      <input class="form-control" type="text" name="description" placeholder="A short and sweet description">
      <input class="form-control" type="text" name="image_url" placeholder="An Image URL you'd like to share of the space">
      <button type="button" id="submit-marker" class="btn btn-primary">Submit Marker</button>
      <button type="button" id="cancel-marker" class="btn btn-danger"> Cancel </button>
      </article>`

      $("#yes-no-keep-marker").remove()
      $(".create-map-form").append(formInjection)

      //If 'CANCEL' button is Pressed - Removes form/marker
      $("#cancel-marker").click(() => {
        mymap.on('click', onMapClick)
        $("#marker-form").remove()
        mymap.removeLayer(marker)
      })

      //If 'SUBMIT' button is Pressed
      $('#submit-marker').click(() => {
        const markerTitle = escape($('#marker-form').find('input[name="title"]').val())
        const markerDescription = escape($('#marker-form').find('input[name="description"]').val())
        const markerImageURL = escape($('#marker-form').find('input[name="image_url"]').val())
        console.log(markerTitle, markerDescription, markerImageURL)

        mymap.on('click', onMapClick)
        $("#marker-form").remove()

        marker.bindPopup(`<b>${markerTitle}</b><br>${markerDescription}`).openPopup();

        arrayOfMarkers.push(marker)

        arrayOfLatLng.push([e.latlng.lat, e.latlng.lng])
        if (arrayOfLatLng.length > 1) {
          mymap.fitBounds(arrayOfLatLng);
        }
      })

    })
    //--------------------------------------------------------------

    //--------------------------------------------------------------
    //If 'NO' Button is Pressed - Removes form/marker
    $("#no-marker").click(() => {
      mymap.on('click', onMapClick)
      $("#yes-no-keep-marker").remove()
      mymap.removeLayer(marker)
    })
    //--------------------------------------------------------------
  }
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  mymap.on('click', onMapClick);

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //Save Map and delete Map buttons

  //If 'CANCEL' button is Pressed - Removes form/marker
  $("#delete-map").click(() => {
    arrayOfMarkers.forEach(marker => mymap.removeLayer(marker))
    mymap.setView([45.5017, -73.5673], 9)
  })

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


});



