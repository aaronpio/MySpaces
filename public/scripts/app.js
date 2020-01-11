$(() => {
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

});


