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

//window.addEventListener("load", drawChart);
