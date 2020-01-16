$(() => {
  const loggedIn = document.cookie.includes("user-id");
  if (loggedIn) {
    $("#nav-login").remove();
    $("#nav-signup").remove();
    $("#nav-user1").remove();
    $("#nav-user2").remove();
    $("nav").append("<a href=/profile>My Profile</a>");
  } else {
    $("#nav-logout").remove();
  }
});
