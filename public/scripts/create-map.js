$(() => {

  const mymap = L.map("mapid").setView([45.5017, -73.5673], 9);

  const createNewBlankMap = (mymap) => {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiYWFyb25tYXBib3giLCJhIjoiY2swaTcxYzhiMGFjZjNjcDdhbTAwamdjdCJ9.VWSP7Q-2MxofHRFWUZFyQA'
    }).addTo(mymap)
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const saveMapToDatabase = (url, data) => {

    $.ajax({
      method: "POST",
      url: "/api/maps",
      data
    })
      .done(function (result) {
        console.log('Sent data for map name', result)
        //
      })
      .fail(function (error) {
        console.log('Error: ' + error)
      })
      .always(function () {
        console.log('Map request completed')
      })

  }

  const saveLocationToDatabase = (url, data) => {
    $.ajax({
      method: 'POST',
      url: '/api/locations',
      data
    })
      .done(function (result) {
        console.log('Sent data for location', result)
      })
      .fail(function (error) {
        console.log('Error: ' + error)
      })
      .always(function () {
        console.log('Location request completed')
      })
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

  const secondDeletePressOrCancel = () => {
    $('.warning').remove();
    $('#cancel-delete').remove()
    $('.save-delete-map').css('justify-content', 'space-between')
    $('.save-map-container').toggle()
    mymap.on('click', onMapClick)
  }

  const secondSavePressOrCancel = () => {
    $('.delete-map-container').toggle()
    $('#cancel-save').remove()
    $('.save-delete-map').css('justify-content', 'space-between')
    $(".create-map-form").empty()
    mymap.on('click', onMapClick)
  }

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  createNewBlankMap(mymap);

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
      <button type="button" id="cancel-marker" class="btn btn-basic"> Cancel </button>
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

        saveLocationToDatabase({ markerTitle, markerDescription, markerImageURL })

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

    console.log(deleteClickCounter)
    if (deleteClickCounter % 2 === 0) {
      $('.save-map-container').toggle()
      $('.save-delete-map')
        .prepend('<p class="warning"><b>The map and markers will forever be lost in time, like tears in the rain.<b></p>')
        .css('justify-content', 'flex-end')
        .append('<button id="cancel-delete" type="button" class="btn">Cancel</button>')

      $('#cancel-delete').click(() => {
        secondDeletePressOrCancel();
        deleteClickCounter++
      })

    } else {
      arrayOfMarkers.forEach(marker => mymap.removeLayer(marker))
      mymap.setView([45.5017, -73.5673], 9)
      secondDeletePressOrCancel();
      emptyMarkerArrays();
    }
    return deleteClickCounter++
  })

  //----------------------------------------------------
  //Save button
  let saveClickCounter = 0;

  const mapNameFormInjection = `
  <input class="form-control" id="map-name-input" type="text" name="map-name" placeholder="The name of your map">
  <p id="save-are-you-sure"> Is the map to your liking? Saved maps can be edited later as well!</p>
  `

  $("#save-map").click(() => {

    mymap.off('click', onMapClick);

    if (saveClickCounter % 2 === 0) {
      $('.delete-map-container').toggle()

      $('.save-delete-map')
        .append('<button id="cancel-save" type="button" class="btn">Cancel</button>')
        .css('justify-content', 'flex-start')

      $(".create-map-form").append(mapNameFormInjection)

      $('#cancel-save').click(() => {
        secondSavePressOrCancel();
        saveClickCounter++
      })

    } else {
      const mapName = escape($('.save-map-name-form').find('input[name="map-name"]').val())

      saveMapToDatabase({ mapName })

      arrayOfMarkers.forEach(marker => mymap.removeLayer(marker))
      mymap.setView([45.5017, -73.5673], 9)
      secondSavePressOrCancel();
      emptyMarkerArrays();
    }
    return saveClickCounter++
  })

  //----------------------------------------------------


  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


  mymap.on('click', onMapClick);
});



