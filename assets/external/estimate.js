var gauge;
var gauge2;
var opts;
var green;
var yellow;
var red;
var target;
var shopSize;
var rentDollar;
var salesDollar;
var category;
var shopName;
var categoryId;
var selectedDate = moment().format('MM/DD/YYYY');

$(function(){

	$('.milease-calender').daterangepicker({
		opens: 'right',
		singleDatePicker: true,
		showDropdowns: true,
		minDate: moment().format('DD/MM/YYYY'),
		maxDate: moment().add(120,'month').format('DD/MM/YYYY'),
		locale: {
			format: 'DD/MM/YYYY'
		}
	}, function(start, end, label){
		selectedDate = start.format("YYYY-MMM-DD");
	});



	$('button.milease-button').on('click',function(e) {

		shopSize = $('.shop-size').val();
		rentDollar = $('.rent-dollar').val();
		salesDollar = $('.sales-dollar').val();
		category = $('.category').val();
		shopName = $('.shop-name').val();
		milease.validation();

		if(shopSize != '' && rentDollar != '' && salesDollar != '' && category != '' && shopName != '') {
			milease.validation();
			milease.updateGaugeValue(selectedDate);
			milease.ocr();
		}
	});

	runGauge();
	runGauge2();

});

function runGauge() {
	var opts = {
		angle: -0.16, // The span of the gauge arc
		lineWidth: 0.1, // The line thickness
		radiusScale: 0.95, // Relative radius
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

function runGauge2() {
	opts = {
		angle: -0.16, // The span of the gauge arc
		lineWidth: 0.1, // The line thickness
		radiusScale: 0.95, // Relative radius
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
		   {strokeStyle: "#30B32D", min: 0, max: 5}, // Red from 100 to 130
		   {strokeStyle: "#FFDD00", min: 5, max: 12}, // Yellow
		   {strokeStyle: "#F03E3E", min: 12, max: 25}, // Green
		],
		staticLabels: {
			font: "10px sans-serif",
			labels: [0,5,12,25],
			color: "#000000",  // Optional: Label text color
  			fractionDigits: 0
		}
	};

	target = document.getElementById('canvas-preview-1'); // your canvas element
	gauge2 = new Gauge(target).setOptions(opts); // create sexy gauge!
	gauge2.maxValue = 25; // set max gauge2 value
	gauge2.setMinValue(0);  // Prefer setter over gauge2.minValue = 0
	gauge2.animationSpeed = 45; // set animation speed (32 is default value)
	gauge2.set(0); // set actual value
	gauge2.setTextField(document.getElementById('gauge-value-2'));
}

var milease = {
	updateGaugeValue: function(start) {
		var numberOfMonths = moment(start).diff(moment().format("YYYY-MMM-DD"),"months");
		gauge.set(numberOfMonths);
	},
	ocr: function() {

		var id = $('.category').val();

		$.ajax({
			type: 'GET',
			url: EstimateExternalAjax.ajaxurl,
			data: {'action':'get_category',id:id},
			dataType: 'json',
			success: function(response) {
				var data = JSON.parse(response.data);
				var low = parseInt(data.low);
				var high = parseInt(data.high);

				var rent = $('.rent-dollar').val();
				var sales = $('.sales-dollar').val();
				var defaultHighest = 25;
				var ocr = rent/sales;

				if(ocr>defaultHighest) {
					defaultHighest = ocr + 5;
				} else if(high>defaultHighest) {
					defaultHighest += 5;
				} else if(high<defaultHighest) {
					defaultHighest = high + 5;
				}
				
				opts = {
					angle: -0.16, // The span of the gauge arc
					lineWidth: 0.1, // The line thickness
					radiusScale: 0.95, // Relative radius
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
					   {strokeStyle: "#30B32D", min: 0, max: low}, // Red from 100 to 130
					   {strokeStyle: "#FFDD00", min: low, max: high}, // Yellow
					   {strokeStyle: "#F03E3E", min: high, max: defaultHighest}, // Green
					],
					staticLabels: {
						font: "10px sans-serif",
						labels: [0,low,high,defaultHighest],
						color: "#000000",  // Optional: Label text color
			  			fractionDigits: 0
					}
				};

				gauge2.setOptions(opts);
				gauge2.maxValue = defaultHighest; // set max gauge2 value
				gauge2.setMinValue(0);  // Prefer setter over gauge2.minValue = 0
				gauge2.animationSpeed = 45; // set animation speed (32 is default value)
				gauge2.set(ocr);

				milease.displayValue()
			}
		});
	},
	validation: function() {
		if(shopSize == '') {
			$('.shop-size-error').show();
		} else {
			$('.shop-size-error').hide();
		}

		if(rentDollar == '') {
			$('.rent-dollar-error').show();
		} else {
			$('.rent-dollar-error').hide();
		}

		if(salesDollar == '') {
			$('.sales-dollar-error').show();
		} else {
			$('.sales-dollar-error').hide();
		}

		if(category == '') {
			$('.category-error').show();
		} else {
			$('.category-error').hide();
		}

		if(shopName == '') {
			$('.shop-name-error').show();
		} else {
			$('.shop-name-error').hide();
		}
	},
	displayValue: function() {
		$('.shop-name-value').text(shopName);
		$('.category-value').text($('.category option:selected').text());
		$('.sales-value').text(parseFloat(salesDollar/shopSize).toFixed(2));
		$('.gross-value').text(parseFloat(rentDollar/shopSize).toFixed(2));
		$('.shop-size-value').text(shopSize );
	}
}