$(() => {
  const loggedIn = /user-id/.exec(document.cookie);

  $.ajax({ url: "/api/maps" }).done(maps => {
    for (map of maps) {
      const $card = $(`
        <div -data-id="${map.id}" class="card" style="min-width: 45%">
          <div class="card-body">
           <h5 class="card-title"><a href=/maps/${map.id}>${map.name}</a></h5>
           <p class="card-text">Created by
               <a href=/users/${map.owner_id}>${map.owner}</a>
             </p>
             </div>
           </div>`);

      $card.appendTo($("main"));
    }
  });
});
