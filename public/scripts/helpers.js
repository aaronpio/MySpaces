
// const saveLocationToDatabase = (data, mapID) => {
//   $.ajax({
//     method: 'POST',
//     url: '/api/locations',
//     data: { ...data, mapID }
//   })
//     .done(function (result) {
//       console.log('Sent data for location', result)
//     })
//     .fail(function (error) {
//       console.log('Error: ' + error)
//     })
//     .always(function () {
//       console.log('Location request completed')
//     })
// }

// const escape = function (str) {
//   let div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

// const disableSaveDelete = () => {
//   $('#delete-map').prop('disabled', true)
//   $('#save-map').prop('disabled', true)
// }

// const enableSaveDelete = () => {
//   $('#delete-map').prop('disabled', false)
//   $('#save-map').prop('disabled', false)
// }

// const emptyMarkerArrays = () => {
//   arrayOfLatLng = [];
//   leafletMarkerObjects = [];
//   markers = [];
// }

// const secondDeletePressOrCancel = () => {
//   $('.warning').remove();
//   $('#cancel-delete').remove()
//   $('.save-delete-map').css('justify-content', 'space-between')
//   $('.save-map-container').toggle()
//   mymap.on('click', onMapClick)
// }

// const secondSavePressOrCancel = () => {
//   $('.delete-map-container').toggle()
//   $('#cancel-save').remove()
//   $('.save-delete-map').css('justify-content', 'space-between')
//   $(".create-map-form").empty()
//   mymap.on('click', onMapClick)
// }

// module.exports = { saveLocationToDatabase, escape, disableSaveDelete, enableSaveDelete, emptyMarkerArrays, secondDeletePressOrCancel, secondSavePressOrCancel }
