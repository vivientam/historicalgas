$(document).ready(function(){
	//data is an array
	var dataWeekly = [];
	var dataMonthly = [];
	var dataQuarterly = [];
	var dataYearly = [];
	var url = 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB'

	var convertToDate = function(input){
		var date = new Date(input);
		var dateUTC = date.getTime();
		return dateUTC;	

	};

	// var dateUTC =  ___[0]



	function getPrice(data, url){
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'JSON',
			success: function(response){
				//this is how I can get 1 price
				//console.log(response.data);

				//this is how we loop it to get all prices

				console.log(response.data)

				$(response.data).each(function(){
					this;
					// debugger
					//collect each data point
					console.log(this[0]);
					console.log(this[1]);

					// converToDate()

					var dataPoint = {}
					dataPoint.y = this[1];
					dataPoint.x = convertToDate( this[0] );
						// debugger

					//and each data point to the ata array
					data.push(dataPoint)
				})

				//print out data
				console.log(data);

				//Initialize HighChart
				initializeHighChart();
			},
			error: function() {
				alert("Cannot connect!");
			}
		});
	}

	getPrice(dataWeekly, url);
	// getPrice(dataMonthly, url);
	// getPrice(dataQuarterly, url);
	// getPrice(dataYearly, url);

	function initializeHighChart(){
		$('#chart').highcharts({
			//key:: value
			title:{
				text: 'Historical Gasline Price'
			},
			subtitle: {
				text: 'http://www.fueleconomy.gov/'
			},
			xAxis: {
				//Configuration of xAxis
				type: 'datetime',
				dateTimeLabelFormats: {
					millisecond: '%H:%M:%S.%L',
					second: '%H:%M:%S',
					minute: '%H:%M',
					hour: '%H:%M',
					day: '%e. %b',
					week: '%e. %b',
					month: '%b \'%y',
					year: '%Y'
				}
			},
			yAxis: {
				//Configuration of xAxis
				min: 0,
				max: 5,
				title:{
					text:'Price (USD)'
				}
			},
			legend: {
				//Configuration of Legends
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				//Data points
				name: 'Weekly',
				data: dataWeekly
			},
			{
				//Data Points
				Name: 'Monthly',
				data: dataMonthly
			
			}]
		})
	}



})