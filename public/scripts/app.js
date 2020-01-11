$(() => {
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done(maps => {
    for (map of maps) {
      $("<div>")
        .text(map.name)
        .appendTo($("body"));
    }
  });
});
