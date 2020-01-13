$(() => {
  const userID = /user-id=(\d+)/.exec(document.cookie)[1];
  $.ajax({
    url: `/users/${userID}/maps`
  }).done(res => {
    const maps = JSON.parse(res);
    const $maps = maps.map(map => {
      $(`<li>
        <a href="/maps/${map.id}">${map.name}</a>
      </li>`)
    })
    $("#my-maps").append($maps);
  })
})
