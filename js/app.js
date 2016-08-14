//global variable
var chartDiv = document.querySelector("#chart-container");

var imageTracker = function (name, source) {
  this.imageSource = source;
  this.totalUpVotes = 0;
  this.userUpVotes = 0;
  this.y = 0;  // upVotes is changed to 'y' for use in CanvasJS
  this.label = name;
  this.name = name;
};


var imageOptions = [
  new imageTracker("Banana", "images/banana.jpg"),
  new imageTracker("Bag", "images/bag.jpg"),
  new imageTracker("Boots", "images/boots.jpg"),
  new imageTracker("Chair", "images/chair.jpg"),
  new imageTracker("Cthulhu", "images/cthulhu.jpg"),
  new imageTracker("Dragon", "images/dragon.jpg"),
  new imageTracker("Pen", "images/pen.jpg"),
  new imageTracker("Scissors", "images/scissors.jpg"),
  new imageTracker("Shark", "images/shark.jpg"),
  new imageTracker("Sweep", "images/sweep.jpg"),
  new imageTracker("Unicorn", "images/unicorn.jpg"),
  new imageTracker("USB", "images/usb.jpg"),
  new imageTracker("Water Can", "images/water_can.jpg"),
  new imageTracker("Wine Glass", "images/wine_glass.jpg"),
];

window.addEventListener("load", randomImageSelector, false);

var imagePanel = document.getElementById("image-container");

imagePanel.addEventListener("click", recordClick, false);

imagePanel.addEventListener("click", randomImageSelector, false);

document.getElementById("restart-button").addEventListener("click", reset, false);

var pickedImages = []; // This is our memory - tracks which images we have shown

var clickCounter = 0;


function randomImageSelector() {
   pickedImages = [];
   var resetButtonQuery = document.querySelector("input#restart-button");
   for (var imageId = 1; imageId <= 3; imageId++) {
     do {
       var index = Math.floor(Math.random() * 14);
     } while (pickedImages.indexOf(index) >= 0);
     var source = imageOptions[index].imageSource;
     document.getElementById("image"+imageId).src = source;
     pickedImages.push(index);
   }
   var clickDisplay = document.getElementById("click-counter");
   clickDisplay.innerHTML = "";
   var clickDisplayNode = document.createTextNode("You have made " + clickCounter + " picks of 15.");
   clickDisplay.appendChild(clickDisplayNode);
   if (clickCounter < 15) {
     var resetButtonQuery = document.querySelector("input#restart-button");
     resetButtonQuery.style.display = "none";
     } else if (clickCounter == 15) {
       var imagesContainerQuery = document.querySelector("div#image-container");
       imagesContainerQuery.style.display = "none";
       resetButtonQuery.style.display = "block";
       seeResultsQuery.style.display = "block";
       chartDiv.style.visibility = "visible";
       showVotingChart();
     }
 };


function recordClick(event) {
  var clickedImage = event.target;
  console.log(clickedImage);
  var clickedImageSource = clickedImage.src;
  console.log("Clicked SRC: "+clickedImageSource);
  clickCounter++;
  console.log(clickCounter);
  for (var index = 0; index < imageOptions.length; index++) {
    console.log("  Compare to: "+imageOptions[index].imageSource);
    if (clickedImageSource.indexOf(imageOptions[index].imageSource) >= 0) {
      imageOptions[index].totalUpVotes++;
      imageOptions[index].userUpVotes++;
      imageOptions[index].y++;
      console.log("    Clicked Item: "+imageOptions[index].name);
    } // if (clickedImageSource.indexOf(imageOptions[index].imageSource) >= 0)
  } // for (var index = 0; index < imageOptions.length; index++)

  localStorage.setItem("votes",JSON.stringify(imageOptions));
};

function loadImageObject() {
  if (localStorage.getItem("votes") == null) {
    localStorage.setItem("votes",JSON.stringify(imageOptions));
  } else {
    imageOptions = JSON.parse(localStorage.getItem("votes"));
    for (i = 0; i < imageOptions.length; i++) {
      imageOptions[i].userUpVotes = 0;
    };
  }
}

var seeResultsQuery = document.querySelector("div.results-div");

function showVotingChart() {
  for (i = 0; i < imageOptions.length; i++) {
    imageOptions[i].y = imageOptions[i].userUpVotes;
  };
  drawChart();
}

function reset(event) {
  chartDiv.style.visibility = "hidden"
  clickCounter = 0;
  seeResultsQuery.style.display = "none";
  var clearSeeResults = document.getElementById("vote-results");
  clearSeeResults.innerHTML = "";
  var imagesContainerQuery = document.querySelector("div#image-container");
  imagesContainerQuery.style.display = "flex";
  randomImageSelector();
};

function marketing() {
  for (i = 0; i < imageOptions.length; i++) {
    imageOptions[i].y = imageOptions[i].totalUpVotes;
  };
  chartDiv.style.visibility = "visible";
  drawChart();
}

/*transition
function hideBlock(event) {
  event.target.setAttribute("class", "hide");
}
document.getElementById('chart-container').addEventListener("click", hideBlock);
*/


loadImageObject();
