$(() => {
  const userID = /user-id=(\d+)/.exec(document.cookie)[1];
  $.ajax({
    url: `/api/users/${userID}/maps`
  }).done(maps => {
    // MAP ALL THE THINGS
    const $maps = maps.map(map => {
      return $(`<li>
        <a href="/maps/${map.id}">${map.name}</a>
      </li>`);
    });
    $("#my-maps").append($maps);
  });

  $.ajax({
    url: `/api/favorites`
  }).done(favorites => {
    // MAP ALL THE THINGS
    const $favorites = favorites.map(favorite => {
      return $(`<li>
        <a href="/maps/${favorite.map_id}">${favorite.name}</a>
      </li>`);
    });
    $("#favorite-maps").append($favorites);
  });
});
