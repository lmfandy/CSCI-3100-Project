$(function () {
  $.ajax({
    type: "post",
    async: false,
    url: "/checkLogin"
  })
  .done(res => {
    console.log(res);
    if(res.user != 'guest'){
      $('#loginSignupForm').hide();
      $('#userIcon').show();
      $('#userIcon').append(res.user.toUpperCase().charAt(0));
    }
  })
  .fail((jqXHR, textStatus, err) => {
    alert(err);
  });
});

$(function () {
  //store the pages to be toggled
  //add pages at the end of this array if needed
  // var pages = [$("#homePage"), $("#loginSignupPage"), $("#customerCreatePage"), $("#ownerCreatePage"), $("#signupSuccessPage")];

  //show the required page, hide all others
  //pages[0] is reserved for home page
  // so index should be >= 1
  // function togglePages(index) {
  //   pages.forEach((p, i) => (i == index) ? p.show() : p.hide());
  // }

  //toggle to the page depending button clicked
  // $("#loginSignupBtn").click(() => togglePages(1));
  // $("#createCustomerBtn").click(() => togglePages(2));
  // $("#createOwnerBtn").click(() => togglePages(3));

  $("#searchNowBtn").click(() => $("#mainSearchBar").slideDown("slow"));

  $("#mainSearchBarCloseBtn").click(() => $("#mainSearchBar").slideUp("slow"));

  $("#priceRange").on("input", () => $("#priceValue").html("Price: $" + $("#priceRange").val() + " / person"));

  $("#searchForm").submit(function (e) {
    var form = $(this);
    var url = form.attr('action');
    $.ajax({
      type: "GET",
      async: false,
      data: form.serialize(),
      url: url
    })
      .done(res => {
        alert(res);
        if (res == "SearchSuccess") {

          $("html").animate({ scrollTop: $("#scrollTo").offset().top }, 600);
        }
      })
      .fail((jqXHR, textStatus, err) => {
        alert(err);
      });
    e.preventDefault();
  });

  $("#addCard").click(() => {
    $("#searchResult").append(createCard("images/card-img.png",
      "Party Room No.1",
      "This is a longer card with supporting text below as a natural lead-in to additional content." +
      "This content is a little bit longer.",
      20, "CUHK", "FREE"
    ));
  });

});

function createCard(img, title, description, capacity, location, price) {
  let cardContainer = $("<div class='col-lg-4'></div>");
  let card = $("<div class='m-2 card'></div>");

  let cardImg = $("<img class='card-img-top'></img>");
  cardImg.attr("src", img);
  cardImg.attr("alt", "Card image cap");
  cardImg.attr("width", "256px");
  cardImg.attr("height", "200px");

  let cardBody = $("<div class='card-body'></div>");

  let cardTitle = $("<h5 class='card-title'></h5>").text(title);
  let cardDescription = $("<p class='card-text'></p>").text(description);

  let cardDetail = $("<ul class='list-group list-group-flush'></ul>");
  let cardCapacity = $("<li class='list-group-item'></li>").text("Capacity: " + capacity);
  let cardLocation = $("<li class='list-group-item'></li>").text("Location: " + location);
  let cardPrice = $("<li class='list-group-item'></li>").text("Price: " + price);
  cardDetail.append(cardCapacity, cardLocation, cardPrice);

  let cardButton = $("<div class='card-body'><button type='button' class='btn btn-success'>Book it!</button></div>");

  cardBody.append(cardTitle, cardDescription, cardDetail, cardButton);
  card.append(cardImg, cardBody);
  cardContainer.append(card);

  return cardContainer;
}
