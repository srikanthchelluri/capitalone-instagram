//Srikanth Chelluri
//October 2015
//Credits:
//  enjalot (GitHub) for d3 pie chart tutorial/example
//  Mike Bostock (http://bost.ocks.org/mike/) for d3 bar graph tutorial/example

//Get access_token
var currentURL = window.location.href;
var split = currentURL.split("=");
var access_token = split[1];

var arrayBigCaption = [];

var bigImageCount = 0;

var indexCount = 0;

var arrayBigCaptionCheck = []
var arrayBigCaptionPositivity = [] //1 for positive, 0 for neutral, -1 for negative
var arrayFoundPositiveWords = [];
var arrayFoundNegativeWords = [];
var totalNumberPositiveWords = 0;
var totalNumberNegativeWords = 0;

var numberPositiveCaptions = 0;
var numberNegativeCaptions = 0;
var numberNeutralCaptions = 0;

var positivePosts = 0;
var negativePosts = 0;
var neutralPosts = 0;

// There are at least 200 posts with the tag (looking at 200 because it's more than 20, but not too much that it doesn't hold value for "recency" of Capital One opinion nor do the API calls take "too" long)
var countAPICall = 10; // Multiply by 20 to get total images (maximum call returns 20 images)

getBigImageData();

function getBigImageData() {
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + access_token,
    success: function(bigResponse) {

      // Check that user authenticated by checking if access_token is present
      if (access_token === undefined) {
        $('#part4').append('<div class="row"><div class="col-md-3"></div><div class="col-md-6" align="center" style="color: #9A0000;"><br><br><br>...did you authenticate?<br>If you did, try again because there\'s no <em>access_token</em> in the URL.</div></div><br>');
        return;
      }

      arrayBigCaption.push(bigResponse.data[bigImageCount].caption.text);
      bigImageCount++;

      // There is an API limit of only accessing the 20 most recent posts
      if (bigImageCount < 20)
      getBigImageData();
      else {
        countAPICall--;
        bigImageCount = 0;
        var nextURL = bigResponse.pagination.next_url;
        // Parse this URL to to remove the callback argument
        if (nextURL.indexOf("&callback") > -1) {
          var callbackIndex = nextURL.indexOf("&callback");
          var maxTagIndex = nextURL.indexOf("&max_tag_id");
          var start = nextURL.substring(0, callbackIndex);
          var end = nextURL.substring(maxTagIndex);
          nextURL = start + end;
        }
        getBigImageDataPagination(nextURL);
      }
    }
  });
}

function getBigImageDataPagination(inputNextURL) {
  // Check to see if it received all requested captions
  if (countAPICall <= 0) {
    getCaptionPositivity();
    return;
  }
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: inputNextURL,
    success: function(bigResponse) {

      if (bigResponse.data[bigImageCount].caption != null) {
        arrayBigCaption.push(bigResponse.data[bigImageCount].caption.text);
        bigImageCount++;
      }

      if (bigImageCount < 20)
      getBigImageDataPagination(inputNextURL);
      else {
        bigImageCount = 0;
        countAPICall--;
        var nextURL = bigResponse.pagination.next_url;
        // Parse this URL to to remove the callback argument
        if (nextURL.indexOf("&callback") > -1) {
          var callbackIndex = nextURL.indexOf("&callback");
          var maxTagIndex = nextURL.indexOf("&max_tag_id");
          var start = nextURL.substring(0, callbackIndex);
          var end = nextURL.substring(maxTagIndex);
          nextURL = start + end;
          getBigImageDataPagination(nextURL);
        }
      }
    }
  });
}

function getCaptionPositivity() {

  // DATA:
  //  array of all captions (arrayBigCaption)
  //  array of each caption's positivity (arrayBigCaptionPositivity)
  //  array of all positive words found in all captions together (arrayFoundPositiveWords)
  //  array of all negative words found in all captions together (arrayFoundNegativeWords)
  //  total number of positive words (totalNumberPositiveWords)
  //  total number of negative words (totalNumberNegativeWords)

  var tempPositiveWords = 0;
  var tempNegativeWords = 0;

  // proud, love, best
  var goodWords = ["good", "generous", "generosity", "charity", "charitable", "polite", "respect", "enjoy", "pleasant", "pleasure", "pleasurable", "delight", "great", "nice", "proud", "swag", "virtue", "moral", "integrity", "kind", "delicious", "thank", "fun"];
  // bad, stop
  var badWords = ["unpleasant", "terrible", "inclement", "naughty", "unkind", "ungenerous", "selfish", "unwell", "waste", "wasting", "impolite", "disrespect", "worse", "worst", "ugly", "disappoint", "trash", "poor", "substandard", "inferior", "unsatisfactory", "inadequate", "unacceptable", "faulty", "imperfect", "amatuer", "deficient", "careless", "negligent", "miserable", "hurt", "nomore", "no more"];

  var length = Math.max(goodWords.length, badWords.length);

  while (indexCount < arrayBigCaption.length) {

    arrayBigCaptionCheck[indexCount] = arrayBigCaption[indexCount].toLowerCase();

    for (var indexWords = 0; indexWords < length; indexWords++) {

      // Negative word check
      if (arrayBigCaptionCheck[indexCount].indexOf(badWords[indexWords]) > -1) {
        var wordIndex = arrayBigCaptionCheck[indexCount].indexOf(badWords[indexWords]);
        wordIndex--;
        var characterCheck = arrayBigCaptionCheck[indexCount].substring(wordIndex, wordIndex + 1);
        if (characterCheck == "#" || characterCheck == " ") {
          tempNegativeWords++;
          totalNumberNegativeWords++;
          arrayBigCaptionPositivity[indexCount] = -1;
          if (arrayFoundNegativeWords.indexOf(badWords[indexWords]) == -1)
          arrayFoundNegativeWords.push(badWords[indexWords]);
        }
      }

      // Positive word check
      if (arrayBigCaptionCheck[indexCount].indexOf(goodWords[indexWords]) > -1) {
        var wordIndex = arrayBigCaptionCheck[indexCount].indexOf(goodWords[indexWords]);
        wordIndex--;
        var characterCheck = arrayBigCaptionCheck[indexCount].substring(wordIndex, wordIndex + 1);
        if (characterCheck == "#" || characterCheck == " ") {
          tempPositiveWords++;
          totalNumberPositiveWords++;
          arrayBigCaptionPositivity[indexCount] = 1;
          if (arrayFoundPositiveWords.indexOf(goodWords[indexWords]) == -1)
          arrayFoundPositiveWords.push(goodWords[indexWords]);
        }
      }
    }

    if (tempPositiveWords > tempNegativeWords) {
      arrayBigCaptionPositivity[indexCount] = 2;
    } else if (tempNegativeWords > tempPositiveWords) {
      arrayBigCaptionPositivity[indexCount] = 0;
    } else {
      arrayBigCaptionPositivity[indexCount] = 1;
    }

    tempPositiveWords = 0;
    tempNegativeWords = 0;

    indexCount++;
  }

  getVisualization();

}

function getVisualization() {

  // BAR GRAPH
  var color = d3.scale.category20c();

  var data = [{"label":"Positive words", "value":totalNumberPositiveWords},
  {"label":"Negative words", "value":totalNumberNegativeWords}];

  var vis = d3.select("#piechart")
    .append("svg:svg")
    .data([data])
    .attr("width", 600)
    .attr("height", 600)
    .append("svg:g")
    .attr("transform", "translate(" + 300 + "," + 300 + ")")
  var arc = d3.svg.arc()
    .outerRadius(300);
  var pie = d3.layout.pie()
    .value(function(d) { return d.value; });
  var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("svg:g")
    .attr("class", "slice");
  arcs.append("svg:path")
    .attr("fill", function(d, i) { return color(i); } )
    .attr("d", arc);
  arcs.append("svg:text")
    .attr("transform", function(d) {
      d.innerRadius = 0;
      d.outerRadius = 300;
      return "translate(" + arc.centroid(d) + ")";
    })
  .attr("text-anchor", "middle")
  .text(function(d, i) { return data[i].label; });


  // BAR GRAPH
  data = arrayBigCaptionPositivity;

  var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);
  d3.select("#bargraph")
    .selectAll("div")
      .data(data)
    .enter().append("div")
      .style("width", function(d) { return x(d) + "px"; });

  //WORD COLLECTION
  var arrayFoundPositiveWordsString = arrayFoundPositiveWords.join(', ');
  var arrayFoundNegativeWordsString = arrayFoundNegativeWords.join(', ');
  $('#wordCollection').append('<h3 style="color: #009933">' + arrayFoundPositiveWordsString + '</h3>');
  $('#wordCollection').append('<h3 style="color: #9A0000">' + arrayFoundNegativeWordsString + '</h3>');

}
