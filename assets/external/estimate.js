var gauge;

$(function(){
	$('.milease-calender').daterangepicker({
		opens: 'right',
		singleDatePicker: true,
		showDropdowns: true,
		minDate: moment().format("MM/DD/YYYY"),
		maxDate: moment().add(120,'month').format("MM/DD/YYYY")
	}, function(start, end, label){
		updateGaugeValue(start);
	});


	runGauge();

});

function runGauge() {
	var opts = {
		angle: -0.16, // The span of the gauge arc
		lineWidth: 0.1, // The line thickness
		radiusScale: 0.62, // Relative radius
		pointer: {
		    length: 0.42, // // Relative to gauge radius
		    strokeWidth: 0.018, // The thickness
		    color: '#000000' // Fill color
		},
		limitMax: false,     // If false, max value increases automatically if value > maxValue
		limitMin: false,     // If true, the min value of the gauge will be fixed
		colorStart: '#6FADCF',   // Colors
		colorStop: '#8FC0DA',    // just experiment with them
		strokeColor: '#E0E0E0',  // to see which ones work best for you
		generateGradient: true,
		highDpiSupport: true,     // High resolution support
		  // renderTicks is Optional
		renderTicks: {
		    divisions: 5,
		    divWidth: 1.1,
		    divLength: 0.7,
		    divColor: '#333333',
		    subDivisions: 3,
		    subLength: 0.5,
		    subWidth: 0.6,
		    subColor: '#666666'
		},
		staticZones: [
		   {strokeStyle: "#F03E3E", min: 0, max: 40}, // Red from 100 to 130
		   {strokeStyle: "#FFDD00", min: 40, max: 80}, // Yellow
		   {strokeStyle: "#30B32D", min: 80, max: 120}, // Green
		],
		staticLabels: {
			font: "10px sans-serif",
			labels: [0,12,24,36,48,60,72,84,96,108,120],
			color: "#000000",  // Optional: Label text color
  			fractionDigits: 0
		}
	};
	var target = document.getElementById('canvas-preview'); // your canvas element
	gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
	gauge.maxValue = 120; // set max gauge value
	gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
	gauge.animationSpeed = 45; // set animation speed (32 is default value)
	gauge.set(0); // set actual value
	gauge.setTextField(document.getElementById('gauge-value'));
}

function updateGaugeValue(start) {
	var numberOfMonths = moment(start.format("YYYY-MMM-DD")).diff(moment().format("YYYY-MMM-DD"),"months");
	gauge.set(numberOfMonths);
}