$(function () {
  //store the pages to be toggled
  //add pages at the end of this array if needed
  var pages = [$("#homePage"), $("#loginSignupPage"), $("#customerCreatePage"), $("#ownerCreatePage"), $("#signupSuccessPage")];

  //show the required page, hide all others
  //pages[0] is reserved for home page
  // so index should be >= 1
  function togglePages(index) {
    pages.forEach((p, i) => (i == index) ? p.show() : p.hide());
  }

  //toggle to the page depending button clicked
  $("#loginSignupBtn").click(() => togglePages(1));
  $("#createCustomerBtn").click(() => togglePages(2));
  $("#createOwnerBtn").click(() => togglePages(3));

  $("#searchNowBtn").click(function () {
    $("#mainSearchBar").slideDown("slow");
  });

  $("#mainSearchBarCloseBtn").click(function () {
    $("#mainSearchBar").slideUp("slow");;
  });

  $("#searchBtn").click(function () {
    $("html").animate({ scrollTop: $(searchResult).offset().top }, 1000);
  });

  $("#customerSignUpForm").submit(function(e) {
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      async: false,
      data: form.serialize(),
      url: url
    })
      .done((res) => {
        alert(res);
        if (res == "SignupSuccess") {
          togglePages(4);
        }
      })
      .fail(function (jqXHR, textStatus, err) {
        alert(err);
      });
    e.preventDefault();
  });
  
  $("#ownerSignUpForm").submit(function(e) {
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      async: false,
      data: form.serialize(),
      url: url
    })
      .done((res) => {
        alert(res);
        if (res == "SignupSuccess") {
          togglePages(4);
        }
      })
      .fail(function (jqXHR, textStatus, err) {
        alert(err);
      });
    e.preventDefault();
  });
});

function login(data) {
  //this is just a sample function.
  //we will not check the login info using this simple approach.
  var username = data.username.value;
  var password = data.password.value;
  switch (username) {
    case "customer":
      if (password == "123456")
        window.location.href = "customer_info.html";
      else
        alert("ERROR: Incorrect password. Try again.");
      break;
    case "owner":
      if (password == "qwerty")
        window.location.href = "owner_info.html";
      else
        alert("ERROR: Incorrect password. Try again.");
      break;
    default:
      alert("ERROR: The email is not registered. Try again.");
      break;
  }
  return false;
}
