//Srikanth Chelluri
//October 2015

//Get access_token and client_id
var currentURL = window.location.href;
var split = currentURL.split("=");
var access_token = split[1];
var client_id = "73880779b8354f348b5d66e73df16a00";

startDataCollection();

var arrayImgSrc = [];
var arrayUserName = [];
var arrayFullName = [];
var arrayUserID = [];
var arrayFollowingCount = [];
var arrayFollowersCount = [];
var arrayPostCount = [];
var arrayCaption = [];

var tag = "capitalone";

var imageCount = 0;
var userCount = 0;

function startDataCollection() {
  // Starting function, calls other functions when complete
  // Will call getPositivityData() at the end
  getImageData();
}

function getImageData() {

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=" + client_id,
    success: function(response) {

      arrayImgSrc[imageCount] = response.data[imageCount].images.low_resolution.url;
      arrayUserName[imageCount] = response.data[imageCount].user.username;
      arrayFullName[imageCount] = response.data[imageCount].user.full_name;
      arrayUserID[imageCount] = response.data[imageCount].user.id;
      arrayCaption[imageCount] = response.data[imageCount].caption.text;

      imageCount++;
      if (imageCount < 20)
        getImageData();
      else {
        getUserData();
      }
    }
  });
}

function getUserData() {

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: "https://api.instagram.com/v1/users/" + arrayUserID[userCount] + "/?access_token=" + access_token,
    success: function(countResponse) {

      // Check that user authenticated by checking if access_token is present
      if (access_token === undefined) {
        $('#top20photosUserInfo').append('<div class="row"><div class="col-md-3"></div><div class="col-md-6" align="center" style="color: #9A0000;">...did you authenticate?<br>If you did, try again because there\'s no <em>access_token</em> in the URL.</div></div><br>');
        $('#top20photosPositivity').append('<div class="row"><div class="col-md-3"></div><div class="col-md-6" align="center" style="color: #9A0000;">...did you authenticate?<br>If you did, try again because there\'s no <em>access_token</em> in the URL.</div></div><br>');
        return;
      }

      arrayFollowingCount[userCount] = countResponse.data.counts.follows;
      arrayFollowersCount[userCount] = countResponse.data.counts.followed_by;
      arrayPostCount[userCount] = countResponse.data.counts.media;

      arrayFollowingCount[userCount] = numberToCommaNumber(arrayFollowingCount[userCount]);
      arrayFollowersCount[userCount] = numberToCommaNumber(arrayFollowersCount[userCount]);
      arrayPostCount[userCount] = numberToCommaNumber(arrayPostCount[userCount]);

      userCount++;
      if (userCount < 20)
        getUserData();
      else {
        printData();
      }
    }
  });

}

function printData() {

  for (var index = 0; index < 4; index++) {
    $('#row1-top20photosUserInfo-userName').append('<div class="col-md-2" align="center" style="color: #3F729B"><a href="https://instagram.com/' + arrayUserName[index] + '/" target="_blank">' + arrayUserName[index] + '</a></div>');
    if (arrayFullName[index] == "") {
      $('#row1-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">[no name]</div>');
    } else
    $('#row1-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">' + arrayFullName[index] + '</div>');
    if (arrayPostCount[index] == 1) {
      $('#row1-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' post</div>');
    } else
    $('#row1-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' posts</div>');
    $('#row1-top20photosUserInfo-following').append('<div class="col-md-2" align="center">' + arrayFollowingCount[index] + ' following</div>');
    if (arrayFollowersCount[index] == 1) {
      $('#row1-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' follower</div>');
    } else
    $('#row1-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' followers</div>');
  }

  for (var index = 4; index < 8; index++) {
    $('#row2-top20photosUserInfo-userName').append('<div class="col-md-2" align="center" style="color: #3F729B"><a href="https://instagram.com/' + arrayUserName[index] + '/" target="_blank">' + arrayUserName[index] + '</a></div>');
    if (arrayFullName[index] == "") {
      $('#row2-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">[no name]</div>');
    } else
    $('#row2-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">' + arrayFullName[index] + '</div>');
    if (arrayPostCount[index] == 1) {
      $('#row2-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' post</div>');
    } else
    $('#row2-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' posts</div>');
    $('#row2-top20photosUserInfo-following').append('<div class="col-md-2" align="center">' + arrayFollowingCount[index] + ' following</div>');
    if (arrayFollowersCount[index] == 1) {
      $('#row2-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' follower</div>');
    } else
    $('#row2-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' followers</div>');
  }

  for (var index = 8; index < 12; index++) {
    $('#row3-top20photosUserInfo-userName').append('<div class="col-md-2" align="center" style="color: #3F729B"><a href="https://instagram.com/' + arrayUserName[index] + '/" target="_blank">' + arrayUserName[index] + '</a></div>');
    if (arrayFullName[index] == "") {
      $('#row3-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">[no name]</div>');
    } else
    $('#row3-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">' + arrayFullName[index] + '</div>');
    if (arrayPostCount[index] == 1) {
      $('#row3-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' post</div>');
    } else
    $('#row3-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' posts</div>');
    $('#row3-top20photosUserInfo-following').append('<div class="col-md-2" align="center">' + arrayFollowingCount[index] + ' following</div>');
    if (arrayFollowersCount[index] == 1) {
      $('#row3-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' follower</div>');
    } else
    $('#row3-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' followers</div>');
  }

  for (var index = 12; index < 16; index++) {
    $('#row4-top20photosUserInfo-userName').append('<div class="col-md-2" align="center" style="color: #3F729B"><a href="https://instagram.com/' + arrayUserName[index] + '/" target="_blank">' + arrayUserName[index] + '</a></div>');
    if (arrayFullName[index] == "") {
      $('#row4-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">[no name]</div>');
    } else
    $('#row4-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">' + arrayFullName[index] + '</div>');
    if (arrayPostCount[index] == 1) {
      $('#row4-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' post</div>');
    } else
    $('#row4-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' posts</div>');
    $('#row4-top20photosUserInfo-following').append('<div class="col-md-2" align="center">' + arrayFollowingCount[index] + ' following</div>');
    if (arrayFollowersCount[index] == 1) {
      $('#row4-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' follower</div>');
    } else
    $('#row4-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' followers</div>');
  }

  for (var index = 16; index < 20; index++) {
    $('#row5-top20photosUserInfo-userName').append('<div class="col-md-2" align="center" style="color: #3F729B"><a href="https://instagram.com/' + arrayUserName[index] + '/" target="_blank">' + arrayUserName[index] + '</a></div>');
    if (arrayFullName[index] == "") {
      $('#row5-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">[no name]</div>');
    } else
    $('#row5-top20photosUserInfo-fullName').append('<div class="col-md-2" align="center">' + arrayFullName[index] + '</div>');
    if (arrayPostCount[index] == 1) {
      $('#row5-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' post</div>');
    } else
    $('#row5-top20photosUserInfo-posts').append('<div class="col-md-2" align="center">' + arrayPostCount[index] + ' posts</div>');
    $('#row5-top20photosUserInfo-following').append('<div class="col-md-2" align="center">' + arrayFollowingCount[index] + ' following</div>');
    if (arrayFollowersCount[index] == 1) {
      $('#row5-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' follower</div>');
    } else
    $('#row5-top20photosUserInfo-followers').append('<div class="col-md-2" align="center">' + arrayFollowersCount[index] + ' followers</div>');
  }

  getPositivityData();

}

function getPositivityData() {

  var goodWords = ["good", "best", "love", "generous", "generosity", "charity", "charitable", "polite", "respect", "enjoy", "pleasant", "pleasure", "pleasurable", "delight", "great", "grateful", "nice", "proud", "swag", "virtue", "moral", "integrity", "kind", "delicious", "happy", "fun", "volunteer", "excite", "relax", "best", "sastisfy", "satisfies", "satisfied", "satisfaction", "thank", "appreciate", "appreciated", "appreciation", "valuable", "lovin", "inspiration", "luck"];
  var badWords = ["bad", "stop", "unpleasant", "terrible", "inclement", "naughty", "unkind", "ungenerous", "selfish", "unwell", "waste", "wasting", "impolite", "disrespect", "worse", "worst", "ugly", "disappoint", "trash", "poor", "substandard", "inferior", "unsatisfactory", "inadequate", "unacceptable", "faulty", "imperfect", "amatuer", "deficient", "careless", "negligent", "miserable", "hurt", "nomore", "no more"];

  var arrayCaptionCheck = [];

  var goodPosts = 0;
  var badPosts = 0;
  var neutralPosts = 0;

  var numberGoodWords = 0;
  var numberBadWords = 0;

  var arrayGoodWords = [];
  var arrayBadWords = [];

  var indexTrack = 0;

  // Iterate through each word
  while (indexTrack < 20) {
    arrayCaptionCheck[indexTrack] = arrayCaption[indexTrack].toLowerCase();
    numberGoodWords = 0;
    numberBadWords = 0;
    arrayGoodWords = [];
    arrayBadWords = [];

    var length = Math.max(goodWords.length, badWords.length);

    for (var indexWords = 0; indexWords < length; indexWords++) {
      // No bounds checking since JavaScript won't return anything of value when indexOf() is called on an out-of-bounds index
      // Check bad words first since higher chance of prefixes

      // Check if previous character is either a space or a "#", then add (don't want it to be part of a word, but it can be a prefix)
      // CHECK IF PREVIOUS CHARACTER IS EITHER A SPACE OR A #, THEN ONLY ADD
      if (arrayCaptionCheck[indexTrack].indexOf(badWords[indexWords]) > -1) {
        var wordIndex = arrayCaptionCheck[indexTrack].indexOf(badWords[indexWords]);
        wordIndex--;
        var characterCheck = arrayCaptionCheck[indexTrack].substring(wordIndex, wordIndex + 1);
        if (characterCheck == "#" || characterCheck == " ") {
          numberBadWords++;
          arrayBadWords.push(badWords[indexWords]);
        }
      }

      if (arrayCaptionCheck[indexTrack].indexOf(goodWords[indexWords]) > -1) {
        var wordIndex = arrayCaptionCheck[indexTrack].indexOf(goodWords[indexWords]);
        wordIndex--;
        var characterCheck = arrayCaptionCheck[indexTrack].substring(wordIndex, wordIndex + 1);
        if (characterCheck == "#" || characterCheck == " ") {
          numberGoodWords++;
          arrayGoodWords.push(goodWords[indexWords]);
        }
      }

    }

    if (numberGoodWords > numberBadWords) {
      goodPosts++;
      var arrayGoodWordsString = arrayGoodWords.join(', ');
      $('#row-top20captionsList').append('<li style="color: #000">' + arrayCaption[indexTrack] + '<br><h4 style="color: #009933">GOOD, because of the word(s) "' + arrayGoodWordsString + '."</h4></li><br><br><br>');
    } else if (numberBadWords > numberGoodWords) {
      badPosts++;
      var arrayBadWordsString = arrayBadWords.join(', ');
      $('#row-top20captionsList').append('<li style="color: #000;">' + arrayCaption[indexTrack] + '<br><h4 style="color: #9A0000">BAD, because of the word(s) "' + arrayBadWordsString + '."</h4></li><br><br><br>');
    } else {
      neutralPosts++;
      if (numberGoodWords > 0 && numberBadWords > 0)
      $('#row-top20captionsList').append('<li style="color: #000">' + arrayCaption[indexTrack] + '<br><h4 style="color: #003399">NEUTRAL, since the positive and negative words seem to balance.</h4></li><br><br><br>');
      else
      $('#row-top20captionsList').append('<li style="color: #000">' + arrayCaption[indexTrack] + '<br><h4 style="color: #003399">NEUTRAL, since there aren\'t any positive or negative words which stand out.</h4></li><br><br><br>');
    }

    indexTrack++;
  }

  if (goodPosts != 1)
  $('#row-top20photosPositivity').append('<div class="col-md-2" align="center"><h3>' + goodPosts + ' good posts</h3></div>');
  else
  $('#row-top20photosPositivity').append('<div class="col-md-2" align="center"><h3>' + goodPosts + ' good post</h3></div>');

  if (neutralPosts != 1)
  $('#row-top20photosPositivity').append('<div class="col-md-2" align="center"><h3>' + neutralPosts + ' neutral posts</h3></div>');
  else
  $('#row-top20photosPositivity').append('<div class="col-md-2" align="center"><h3>' + neutralPosts + ' neutral post</h3></div>');

  if (badPosts != 1)
  $('#row-top20photosPositivity').append('<div class="col-md-2" align="center"><h3>' + badPosts + ' bad posts</h3></div>');
  else
  $('#row-top20photosPositivity').append('<div class="col-md-2" align="center"><h3>' + badPosts + ' bad post</h3></div>');

}

function numberToCommaNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
