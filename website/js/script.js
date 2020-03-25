$(function () {
  $("#searchButton").click(function () {
    $("#searchButton").hide();
    $("#searchForm").show();
  });
});

$(function () {
  $("#loginSignupBtn").click(function () {
    $("#loginSignupPage").show();
    $("#homePage").hide();
    $("#customerCreatePage").hide();
    $("#ownerCreatePage").hide();
  });
});

$(function () {
  $("#createCustomerBtn").click(function () {
    $("#customerCreatePage").show();
    $("#ownerCreatePage").hide();
    $("#homePage").hide();
    $("#loginSignupPage").hide();
  });
});

$(function () {
  $("#createOwnerBtn").click(function () {
    $("#ownerCreatePage").show();
    $("#customerCreatePage").hide();
    $("#homePage").hide();
    $("#loginSignupPage").hide();
  });
});

$(function () {
  $("#loginBtn").click(function () {
    //this is just a sample function.
    //we will not check the login info using this simple approach.
    var email = document.getElementById("exampleInputEmail1").value;
    var password = document.getElementById("exampleInputPassword1").value;
    switch (email) {
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
  });
});
