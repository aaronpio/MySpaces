const mymap = L.map("mapid").setView([45.5017, -73.5673], 9);

const createNewBlankMap = (mymap) => {
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiYWFyb25tYXBib3giLCJhIjoiY2swaTcxYzhiMGFjZjNjcDdhbTAwamdjdCJ9.VWSP7Q-2MxofHRFWUZFyQA'
  }).addTo(mymap)
}

const saveLocationToDatabase = (data, mapID) => {
  $.ajax({
    method: 'POST',
    url: '/api/locations',
    data: { ...data, mapID }
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

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
  leafletMarkerObjects = [];
  markers = [];
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
