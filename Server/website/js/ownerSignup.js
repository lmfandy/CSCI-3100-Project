$(function (){
  $("#ownerSignUpForm").submit(function (e) {
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
        $("#ownerCreatePage").hide();
      }
      form[0].reset();
    })
    .fail((jqXHR, textStatus, err) => {
      alert(err);
      form[0].reset();
    });
    e.preventDefault();
  });
});
