$(() => {
  const loggedIn = /user-id/.exec(document.cookie);

  $.ajax({ url: "/api/maps" }).done(maps => {
    for (map of maps) {
      const favoriteButton = loggedIn
        ? `<form method="POST" action="/api/favorites/${map.id}">
          <button class="btn btn-outline-warning">Favorite</button>
        </form>`
        : "";
      const removeFavoriteButton = loggedIn
        ? `<form method="POST" action="/api/favorites/${map.id}/delete">
          <button class="btn btn-outline-danger">Remove</button>
        </form>`
        : "";
      $(`<div class="card" style="min-width: 45%">
           <div class="card-body">
             <h5 class="card-title"><a href=/maps/${map.id}>${map.name}</a></h5>
             <p class="card-text">Created by
               <a href=/users/${map.owner_id}>${map.owner}</a>
             </p>
             ${favoriteButton}
           </div>
         </div>`).appendTo($("main"));
    }
  });
});
