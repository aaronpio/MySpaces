$(() => {
  const loggedIn = /user-id/.exec(document.cookie);

  $.ajax({ url: "/api/maps" }).done(maps => {
    for (map of maps) {
      const $favBtn = $(`
       <a href="#" class="btn btn-outline-warning">Add to favorites</a>`);

      $favBtn.click(e => {
        // e.preventDefault()
        // const mapID = $card.data("id");
        $.ajax({
          url: `/api/favorites/${map.id}/toggle`,
          method: "POST"
        }).done(() => {
          $favBtn.toggleClass("btn-outline-warning");
          $favBtn.toggleClass("btn-outline-danger");
          $favBtn.hasClass("btn-outline-warning")
            ? $favBtn.text("Add to favorites")
            : $favBtn.text("Remove from favorites");
        });
      });

      const $card = $(`
        <div -data-id="${map.id}" class="card" style="min-width: 45%">
          <div class="card-body">
           <h5 class="card-title"><a href=/maps/${map.id}>${map.name}</a></h5>
           <p class="card-text">Created by
               <a href=/users/${map.owner_id}>${map.owner}</a>
             </p>
             </div>
           </div>`);

      if (loggedIn) $card.find(".card-body").append($favBtn);
      $card.appendTo($("main"));
    }
  });
});
