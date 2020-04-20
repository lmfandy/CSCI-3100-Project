$(function () {
  var ownerData = "";

  $("#ownerInfoForm").submit(function (e) {
    // var form = $(this);
    // var url = form.attr('action');
    // ownerData = form.serialize();
    // console.log(ownerData);

    $("#addPartyRoomPage").show();
    $("html").animate({ scrollTop: $("#scrollTo").offset().top }, 400);
    // $("#ownerCreatePage").hide();

    // $.ajax({
    //   type: "POST",
    //   async: false,
    //   data: form.serialize(),
    //   url: url
    // })
    // .done(res => {
    //   if (res == "SignupSuccess") {
    //     $("#signupSuccessPage").show();
    //     $("#ownerCreatePage").hide();
    //   }
    //   form[0].reset();
    // })
    // .fail((jqXHR, textStatus, err) => {
    //   alert(err);
    //   form[0].reset();
    // });
    e.preventDefault();
  });

  $("#ownerSignUpForm").submit(function (e) {
    var form = $(this);
    var url = form.attr('action');
    ownerData = $("#ownerInfoForm").serialize() + "&" + form.serialize();
    // alert($("#ownerInfoForm").serialize());
    // alert(form.serialize());
    //alert(ownerData);

    $.ajax({
      type: "POST",
      async: false,
      data: ownerData,
      url: url
    })
      .done(res => {
        if (res == "SignupSuccess") {
          $("#signupSuccessPage").show();
          $("#ownerCreatePage").hide();
          $("#addPartyRoomPage").hide();
        }
        //form[0].reset();
      })
      .fail((jqXHR, textStatus, err) => {
        alert(err);
        //form[0].reset();
      });

    e.preventDefault();
  });
});

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
