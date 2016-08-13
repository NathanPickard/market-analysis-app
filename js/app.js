//var totalClicks = 0;
var imageTracker = function (name, source) {
  this.imageSource = source;
  this.upVotes = 0;
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
  new imageTracker("Usb", "images/usb.jpg"),
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
       showVotingTable();
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
      imageOptions[index].upVotes++;
      console.log("    Clicked Item: "+imageOptions[index].name);
    } // if (clickedImageSource.indexOf(imageOptions[index].imageSource) >= 0)
  } // for (var index = 0; index < imageOptions.length; index++)
};

/*
getThreeImages();
var image = imageOptions[0];
image.addInfo();

console.log(imageOptions[0].upvotes + "bannana Votes");
*/

var seeResultsQuery = document.querySelector("div.results-div");

function reset(event) {
  clickCounter = 0;
  seeResultsQuery.style.display = "none";
  var clearSeeResults = document.getElementById("vote-results");
  clearSeeResults.innerHTML = "";
  var imagesContainerQuery = document.querySelector("div#image-container");
  imagesContainerQuery.style.display = "flex";
  randomImageSelector();
};

// Creates voting results table
function showVotingTable(event) {
    var votingResults = document.getElementById("vote-results");
    var newTable = document.createElement("table");
    newTable.id = "vote-totals";
    votingResults.appendChild(newTable);
    // Creates table header
    var table = document.getElementById("vote-totals");
    var tableHeader = document.createElement("tr");
    var tableHeaderCell = document.createElement("th");
    tableHeaderCell.setAttribute("colspan", "2");
    var tableHeaderName = document.createTextNode("Total User Votes");
    tableHeaderCell.appendChild(tableHeaderName);
    tableHeader.appendChild(tableHeaderCell);
    table.appendChild(tableHeader);
    // Creates column headers
    var tableHeaderRow = document.createElement("tr");
    tableHeaderCell = document.createElement("th");
    var tableHeaderData = document.createTextNode("Product Name")
    tableHeaderCell.appendChild(tableHeaderData);
    tableHeaderRow.appendChild(tableHeaderCell);
    tableHeaderCell = document.createElement("th");
    tableHeaderData = document.createTextNode("Votes")
    tableHeaderCell.appendChild(tableHeaderData);
    tableHeaderRow.appendChild(tableHeaderCell);
    table.appendChild(tableHeaderRow);
    for (var j = 0; j <= 13; j++) {
      var newImageRow = document.createElement("tr");
      var imageNameCell = document.createElement("td");
      var imageNameCellData = document.createTextNode(imageOptions[j].name);
      imageNameCell.appendChild(imageNameCellData);
      newImageRow.appendChild(imageNameCell);
      var imageVoteCell = document.createElement("td");
      var imageVoteCellData = document.createTextNode(imageOptions[j].upVotes);
      imageVoteCell.appendChild(imageVoteCellData);
      newImageRow.appendChild(imageVoteCell);
      table.appendChild(newImageRow);
    }
};

var chart;

function drawChart() {
  var chartProperties = {
		title:{
			text: "Voting Results"
		},
		data: [
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: [
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }
			]
		}
		]
	};
  chart = new CanvasJS.Chart("chart-container", chartProperties);
	chart.render();
}

window.addEventListener("load", drawChart);
