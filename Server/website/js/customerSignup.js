$(function () {
  $("#customerSignUpForm").submit(function (e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      type: "POST",
      async: false,
      data: form.serialize(),
      url: url
    })
      .done(res => {
        if (res == "SignupSuccess") {
          $("#signupSuccessPage").show();
          $("#customerCreatePage").hide();
        }
        else if (res == "usernameUsed") {
          alert("This username is already used!");
        }
        else if (res == "emailRegistered") {
          alert("This email is already registered!");
        }
        //form[0].reset();
      })
      .fail((jqXHR, textStatus, err) => {
        alert(err);
        //form[0].reset();
      });
  });
})
