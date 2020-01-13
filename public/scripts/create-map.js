$(() => {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  const disableSaveDelete = () => {
    $('#delete-map').prop('disabled', true)
    $('#save-map').prop('disabled', true)
  }

  const enableSaveDelete = () => {
    $('#delete-map').prop('disabled', false)
    $('#save-map').prop('disabled', false)
  }

  const emptyMarkerArrays = () => {
    arrayOfLatLng = [];
    arrayOfMarkers = [];
  }

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  createNewMap(mymap);

  let arrayOfLatLng = [];
  let arrayOfMarkers = [];

  const onMapClick = (e) => {

    disableSaveDelete();

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

      <textarea class="form-control" rows="3" name="description" placeholder="Short and sweet description of your space"></textarea>

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

        enableSaveDelete();
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

        enableSaveDelete();
      })

    })
    //--------------------------------------------------------------

    //--------------------------------------------------------------
    //If 'NO' Button is Pressed - Removes form/marker
    $("#no-marker").click(() => {
      mymap.on('click', onMapClick)
      $("#yes-no-keep-marker").remove()
      mymap.removeLayer(marker)
      $('#delete-map').prop('disabled', false)
      $('#save-map').prop('disabled', false)
    })
    //--------------------------------------------------------------
  }
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  //Save Map and Delete Map buttons


  //----------------------------------------------------
  //Delete button
  let deleteClickCounter = 0;

  $("#delete-map").click(() => {

    mymap.off('click', onMapClick);

    console.log('hi')
    if (deleteClickCounter % 2 === 0) {
      $('.save-map-container').toggle()
      $('.are-you-sure').prepend('<p> Are you sure? The current map will be lost forever... much like your youth.</p>')
    } else {
      arrayOfMarkers.forEach(marker => mymap.removeLayer(marker))
      mymap.setView([45.5017, -73.5673], 9)
      $('.are-you-sure').empty()
      $('.save-map-container').toggle()
      mymap.on('click', onMapClick)
      emptyMarkerArrays();
    }
    return deleteClickCounter++
  })
  //----------------------------------------------------
  //Save button
  let saveClickCounter = 0;

  const mapNameFormInjection = `
  <input class="form-control" id="map-name-input" type="text" name="map-name" placeholder="The name of your map">
  `

  $("#save-map").click(() => {

    mymap.off('click', onMapClick);

    if (saveClickCounter % 2 === 0) {
      $('.delete-map-container').toggle()
      $('.are-you-sure').prepend('<p> Is the map to your liking? Saved maps can be edited later as well!</p>')
      $(".save-map-name-form").append(mapNameFormInjection)
      //const mapName = escape($('.save-map-name-form').find('input[name="map-name"]').val())
    } else {
      arrayOfMarkers.forEach(marker => mymap.removeLayer(marker))
      mymap.setView([45.5017, -73.5673], 9)
      $('.are-you-sure').empty()
      $('.delete-map-container').toggle()
      mymap.on('click', onMapClick)
      $(".save-map-name-form").empty()
      emptyMarkerArrays();
    }
    return saveClickCounter++
  })

  //----------------------------------------------------


  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


  mymap.on('click', onMapClick);
});



