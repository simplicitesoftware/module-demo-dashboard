var DemoDashboard = typeof DemoDashboard !== "undefined" ? DemoDashboard : (function($) {
	function render(params, data) {
		$ui.loadScript({
			url: "https://www.gstatic.com/charts/loader.js",
			onload: function() {
				google.charts.load("current", { "packages": ["corechart", "bar", "geochart", "table", "gauge"], mapsApiKey: Simplicite.GOOGLE_API_KEY });
    			google.charts.setOnLoadCallback(function() {
    				setTimeout(chart1, 0);
    				setTimeout(chart2, 0);
    				setTimeout(chart3, 0);
    				setTimeout(chart4, 0);
    				setTimeout(chart5, 0);
    				setTimeout(chart6, 0);
    			});
			}
		});
	}
	
	function chart1() {
		var data = google.visualization.arrayToDataTable([
			['City', '2010 Population', '2000 Population'],
			['New York City, NY', 8175000, 8008000],
			['Los Angeles, CA', 3792000, 3694000],
			['Chicago, IL', 2695000, 2896000],
			['Houston, TX', 2099000, 1953000],
			['Philadelphia, PA', 1526000, 1517000]
		]);
		
		var options = {
			chartArea: {width: '50%'},
			isStacked: true,
			hAxis: { title: 'Total Population', minValue: 0 },
			vAxis: { title: 'City' }
		};
        
        new google.visualization.BarChart(document.getElementById('demo-dashboard-1')).draw(data, options);
	}
	
	function chart2() {
		var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Work',     11],
			['Eat',      2],
			['Commute',  2],
			['Watch TV', 2],
			['Sleep',    7]
		]);
		
		var options = { pieHole: 0.2 };

        new google.visualization.PieChart(document.getElementById('demo-dashboard-2')).draw(data, options);
	}

	function chart3() {
		var data = google.visualization.arrayToDataTable([
			['Country',   'Population', 'Area Percentage'],
			['France',  65700000, 50],
			['Germany', 81890000, 27],
			['Poland',  38540000, 23]
		]);
		
		var options = {
			sizeAxis: { minValue: 0, maxValue: 100 },
			region: '155', // Western Europe
			displayMode: 'markers',
			colorAxis: {colors: ['#e7711c', '#4374e0']} // orange to blue
		};
		
		new google.visualization.GeoChart(document.getElementById('demo-dashboard-3')).draw(data, options);
      }

	function chart4() {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Name');
		data.addColumn('number', 'Salary');
		data.addColumn('boolean', 'Full Time Employee');
		data.addRows([
			['Mike',  {v: 10000, f: '$10,000'}, true],
			['Jim',   {v:8000,   f: '$8,000'},  false],
			['Alice', {v: 12500, f: '$12,500'}, true],
			['Bob',   {v: 7000,  f: '$7,000'},  true]
		]);
		
		new google.visualization.Table(document.getElementById('demo-dashboard-4')).draw(data, {showRowNumber: true, width: '100%', height: '100%'});
	}
	
	function chart5() {
		var data = google.visualization.arrayToDataTable([
			['Mon', 28, 28, 38, 38],
			['Tue', 38, 38, 55, 55],
			['Wed', 55, 55, 77, 77],
			['Thu', 77, 77, 66, 66],
			['Fri', 66, 66, 22, 22]
			// Treat the first row as data.
		], true);
		
		var options = {
			legend: 'none',
			bar: { groupWidth: '100%' }, // Remove space between bars.
			candlestick: {
			fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
			risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
			}
		};
		
		new google.visualization.CandlestickChart(document.getElementById('demo-dashboard-5')).draw(data, options);
	}

	function chart6() {
		var data = google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Memory', 80],
			['CPU', 55]
		]);
		
		var options = {
			width: 400, height: 120,
			redFrom: 90, redTo: 100,
			yellowFrom:75, yellowTo: 90,
			minorTicks: 5
		};
		
		new google.visualization.Gauge(document.getElementById('demo-dashboard-6')).draw(data, options);
	}

	return { render: render };
})(jQuery);