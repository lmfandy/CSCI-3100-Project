$(function () {
  // not finished
  $("#ownerValidateForm").submit(function (e) {
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
        if (res == "companyNameRegistered")
          alert("This company is already registered!");
        else if (res == "usernameUsed")
          alert("This username is already used!");
        else if (res == "emailRegistered")
          alert("This email is already registered!");
        else if (res == "pass") {
          $("#addPartyRoomPage").show();
          $("html").animate({ scrollTop: $("#scrollTo").offset().top }, 400);
        }
        //form[0].reset();
      })
      .fail((jqXHR, textStatus, err) => {
        alert(err);
        //form[0].reset();
      });
  });

  // not finished
  $("#partyroomValidateForm").submit(function (e) {
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
        if (res == "partyroomRegistered")
          alert("This partyroom is already registered!");
        else if (res == "pass") signUp();
        //form[0].reset();
      })
      .fail((jqXHR, textStatus, err) => {
        alert(err);
        //form[0].reset();
      });
  });
});

//not finished
function signUp() {
  $.ajax({
    type: "POST",
    async: false,
    dataType: "json",
    data: {owner: $("#ownerValidateForm").serialize(), partyroom: $("#partyroomValidateForm").serialize()},
    url: "/ownerSignup/signup"
  })
    .done(res => {
      if (res == "SignupSuccess") {
        $("#signupSuccessPage").show();
        $("#ownerCreatePage").hide();
        $("#addPartyRoomPage").hide();
      }
      else alert("Something strange happen...");
      //form[0].reset();
    })
    .fail((jqXHR, textStatus, err) => {
      alert(err);
      //form[0].reset();
    });
}

$(function () {
  var priceSettingNum = 1;
  $("#addPriceSettingBtn").click(() => {
    let day = $("<div class='form-group col-md-3'><label>Day: </label><select name='priceDay[]' class='form-control'><option value='Mondays to Thursdays'>Mondays to Thursdays</option><option value='Fridays'>Fridays</option><option value='Saturdays'>Saturdays</option><option value='Sunday'>Sunday</option></select></div>");
    let time = $("<div class='form-group col-auto'><label>Time: </label><div class='form-inline'><input name='priceStartTime[]' type='time' class='form-control' value='00:00:00'><label>&emsp;to&emsp;</label><input name='priceEndTime[]' type='time' class='form-control' value='00:00:00'></div></div>");
    let price = $("<div class='form-group col-md-3'><label>Price: </label><input name='price[]' type='text' class='form-control'></div>");
    let priceSettingDetail = $("<div class='form-row priceSettingDetail'></div>");
    priceSettingDetail.append(day, time, price);

    priceSettingNum++;
    let priceSettingTitle = $("<p class='priceSettingTitle'></p>").text("Price Setting " + priceSettingNum);
    let priceSettingBlock = $("<div class='priceSettingBlock'></div>");
    priceSettingBlock.append(priceSettingTitle, priceSettingDetail);

    $("#priceSetting").append(priceSettingBlock);
  });
});
