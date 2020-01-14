$(() => {
  const loggedIn = document.cookie.includes("user-id");
  if (loggedIn) {
    $("#nav-login").remove();
    $("#nav-signup").remove();
    $('nav').append('<a href=/profile>My Profile</a>');
  }
});
