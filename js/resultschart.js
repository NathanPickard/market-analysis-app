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
			dataPoints: imageOptions
		}
		]
	};
  chart = new CanvasJS.Chart("chart-container", chartProperties);
	chart.render();

}

// transition
function hideBlock(event) {
  event.target.setAttribute("class", "hide");
}

document.getElementById('chart-container').addEventListener("click", hideBlock);
