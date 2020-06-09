var DemoDashboard = typeof DemoDashboard !== "undefined" ? DemoDashboard : (function($) {
	var params, data;
	
	function render(p, d) {
		params = p;
		data = d;
		$ui.loadScript({
			url: "https://www.gstatic.com/charts/loader.js",
			onload: function() {
				google.charts.load("current", { "packages": ["corechart", "bar", "geochart", "table", "gauge"], mapsApiKey: Simplicite.GOOGLE_API_KEY });
    			google.charts.setOnLoadCallback(function() {
    				setTimeout(function() { chart1(data.chart1) }, 0);
    				setTimeout(function() { chart2(data.chart2) }, 0);
    				setTimeout(function() { chart3(data.chart3) }, 0);
    				setTimeout(function() { chart4(data.chart4) }, 0);
    				setTimeout(function() { chart5(data.chart5) }, 0);
    				setTimeout(function() { chart6(data.chart6) }, 0);
    			});
			}
		});
	}
	
	function chart1(d) {
		$("#demo-dashboard-title-1").text(d.title);

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
	
	function chart2(d) {
		$("#demo-dashboard-title-2").text(d.title);
		
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

	function chart3(d) {
		$("#demo-dashboard-title-3").text(d.title);

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

	function chart4(d) {
		$ui.getUIObject("DemoStats1", "dashboard_DemoStats1", function(sts) {
			sts.getMetaData(function() {
				$("#demo-dashboard-title-4").text(sts.getDisplay());

				sts.search(function(rows) {
					var data = new google.visualization.DataTable();
					var status = sts.getField("demoOrdStatus");
					data.addColumn("string", status.getDisplay());
					data.addColumn("number", sts.getField("demoStsCount").getDisplay());
					data.addColumn("number", sts.getField("demoStsQuantity").getDisplay());
					data.addColumn("number", sts.getField("demoStsAmount").getDisplay());
					for (var i = 0; i < rows.length; i++) {
						var row = Object.values(rows[i]); // Transform to an array
						row.shift(); // Remove row ID
						row[0] = status.getDisplayValue(row[0]); // Display value instead of code
						data.addRow(row);
					}

					new google.visualization.Table(document.getElementById('demo-dashboard-4')).draw(data, {showRowNumber: true, width: '100%', height: '100%'});
				});
			});
		});
	}
	
	function chart5(d) {
		$("#demo-dashboard-title-5").text(d.title);

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

	function chart6(d) {
		$("#demo-dashboard-title-6").text(d.title);

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