$(() => {
  const loggedIn = /user-id/.exec(document.cookie);

  $.ajax({ url: "/api/maps" }).done(maps => {
    for (map of maps) {
      const $favoriteButton = $(`
       <a href="#" class="btn btn-outline-warning">Favorite</a>`)

      $favoriteButton.click(e => {
        // e.preventDefault()
        // const mapID = $card.data("id");
        $.ajax({
          url: `/api/favorites/${map.id}/toggle`,
          method: "POST"
        }).done(() => {
          const $card = $(this).closest(".card");
          if ($(this).hasClass(".btn-outline-warning")) {
            $(this).removeClass(".btn-outline-warning")
            $(this).addClass(".btn-outline-danger")
          } else {
            $(this).removeClass(".btn-outline-danger")
            $(this).addClass(".btn-outline-warning")
          }
        })
      })

      const $card = $(`<div -data-id="${map.id}" class="card" style="min-width: 45%">
           <div class="card-body">
             <h5 class="card-title"><a href=/maps/${map.id}>${map.name}</a></h5>
             <p class="card-text">Created by
               <a href=/users/${map.owner_id}>${map.owner}</a>
             </p>
           </div>
         </div>`)

      if (loggedIn) $card.find(".card-body").append($favoriteButton)
      $card.appendTo($("main"));
    }
  });
});
