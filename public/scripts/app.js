$(() => {
  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done(maps => {
    for (map of maps) {
      $(`<div class="map-list-item">
           <h3><a href=/maps/${map.id}>${map.name}</a></h3>
           <p>Created by <a href=/users/${map.owner_id}>${map.owner}</a></p>
         </div>`)
        .appendTo($("main"));
    }
  });

});


