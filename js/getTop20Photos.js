//Srikanth Chelluri
//October 2015

var client_id = "73880779b8354f348b5d66e73df16a00";

var tag = "capitalone";

$.ajax({
  type: "GET",
  cache: false,
  dataType: "jsonp",
  url: "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=" + client_id,

  success: function(response) {

    // Tag #capitalone has at least 20 recent posts, so no check imposed

    for (var x = 0; x < 4; x++) {
      var imgUser = response.data[x].user.username;
      var imgLikes = response.data[x].likes.count;
      var imgSrc = response.data[x].images.low_resolution.url;

      // Convert so number has commas
      imgLikes = numberToCommaNumber(imgLikes);

      $('#row1-top20photos').append('<div class="col-md-2"> <img width="100%" style="margin: 6px; margin-bottom: 25px; border-style: solid; border-width: 4px;" src="' + imgSrc + '"/> <br> <p align="center" style="padding-top: 0px; margin-top: 0px; line-height: 0%;"><a href="https://instagram.com/' + imgUser + '/" target="_blank">'  + imgUser + '</a>, ♥ ' + imgLikes + '</p> <br><br> </div>');
    }
    for (var x = 4; x < 8; x++) {
      var imgUser = response.data[x].user.username;
      var imgLikes = response.data[x].likes.count;
      var imgSrc = response.data[x].images.low_resolution.url;

      imgLikes = numberToCommaNumber(imgLikes);

      $('#row2-top20photos').append('<div class="col-md-2"> <img width="100%" style="margin: 6px; margin-bottom: 25px; border-style: solid; border-width: 4px;" src="' + imgSrc + '"/> <br> <p align="center" style="padding-top: 0px; margin-top: 0px; line-height: 0%;"><a href="https://instagram.com/' + imgUser + '/" target="_blank">'  + imgUser + '</a>, ♥ ' + imgLikes + '</p> <br><br> </div>');
    }
    for (var x = 8; x < 12; x++) {
      var imgUser = response.data[x].user.username;
      var imgLikes = response.data[x].likes.count;
      var imgSrc = response.data[x].images.low_resolution.url;

      imgLikes = numberToCommaNumber(imgLikes);

      $('#row3-top20photos').append('<div class="col-md-2"> <img width="100%" style="margin: 6px; margin-bottom: 25px; border-style: solid; border-width: 4px;" src="' + imgSrc + '"/> <br> <p align="center" style="padding-top: 0px; margin-top: 0px; line-height: 0%;"><a href="https://instagram.com/' + imgUser + '/" target="_blank">'  + imgUser + '</a>, ♥ ' + imgLikes + '</p> <br><br> </div>');
    }
    for (var x = 12; x < 16; x++) {
      var imgUser = response.data[x].user.username;
      var imgLikes = response.data[x].likes.count;
      var imgSrc = response.data[x].images.low_resolution.url;

      imgLikes = numberToCommaNumber(imgLikes);

      $('#row4-top20photos').append('<div class="col-md-2"> <img width="100%" style="margin: 6px; margin-bottom: 25px; border-style: solid; border-width: 4px;" src="' + imgSrc + '"/> <br> <p align="center" style="padding-top: 0px; margin-top: 0px; line-height: 0%;"><a href="https://instagram.com/' + imgUser + '/" target="_blank">'  + imgUser + '</a>, ♥ ' + imgLikes + '</p> <br><br> </div>');
    }
    for (var x = 16; x < 20; x++) {
      var imgLikes = response.data[x].likes.count;
      var imgUser = response.data[x].user.username;
      var imgSrc = response.data[x].images.low_resolution.url;

      imgLikes = numberToCommaNumber(imgLikes);

      $('#row5-top20photos').append('<div class="col-md-2"> <img width="100%" style="margin: 6px; margin-bottom: 25px; border-style: solid; border-width: 4px;" src="' + imgSrc + '"/> <br> <p align="center" style="padding-top: 0px; margin-top: 0px; line-height: 0%;"><a href="https://instagram.com/' + imgUser + '/" target="_blank">'  + imgUser + '</a>, ♥ ' + imgLikes + '</p> <br><br> </div>');
    }

  }

});

// Convert so number has commas
function numberToCommaNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
