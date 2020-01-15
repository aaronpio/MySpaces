$(() => {
  const loggedIn = /user-id/.exec(document.cookie);

  $.ajax({ url: "/api/maps" }).done(maps => {
    for (map of maps) {
      const favoriteButton = loggedIn ? `<a href="/api/favorites/${map.id}" class="btn btn-outline-warning">Favorite</a>` : "";
      $(`<div class="card" style="min-width: 45%">
           <div class="card-body">
             <h5 class="card-title"><a href=/maps/${map.id}>${map.name}</a></h5>
             <p class="card-text">Created by <a href=/users/${map.owner_id}>${map.owner}</a></p>
             ${favoriteButton}
           </div>
         </div>`)
        .appendTo($("main"));
    }
  });
});

