window.onload = function () {
    piechart.render();
    lineChart.render();
}


// pie chat
var piechart = new CanvasJS.Chart("pie-graph", {
    animationEnabled: true,
    title: {
        text: "Graph Pie Report"
    },
    data: [{
        type: "pie",
        startAngle: 240,
        indexLabel: "{label} {y}",
		toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: pies.map(function(pie)  {
            return { y: pie.sum, label: pie.device };
        })
    }]
});

// line chat
var lineChart = new CanvasJS.Chart("line-graph", {
	animationEnabled: true,
	title:{
		text: "Line Chart"
	},
	axisY:{
		includeZero: false
	},
	data: [{        
		type: "line",       
		dataPoints: lines.map(function(line) {
            return { y: line.sum }
        })
	}]
});