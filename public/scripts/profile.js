$(() => {
  const userID = /user-id=(\d+)/.exec(document.cookie)[1];
  $.ajax({
    url: `/api/users/${userID}/maps`
  }).done(maps => {
    // MAP ALL THE THINGS
    const $maps = maps.map(map => {
      return $(`<li>
        <a href="/maps/${map.id}">${map.name}</a>
      </li>`)
    })
    $("#my-maps").append($maps);
  })
})
