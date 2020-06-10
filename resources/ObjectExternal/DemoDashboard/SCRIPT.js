var DemoDashboard = typeof DemoDashboard !== "undefined" ? DemoDashboard : (function($) {
	function render(params, data) {
		$ui.loadScript({
			url: "https://www.gstatic.com/charts/loader.js",
			onload: function() {
				google.charts.load("current", { "packages": ["corechart", "bar", "geochart", "table", "gauge"], mapsApiKey: Simplicite.GOOGLE_API_KEY });
    			google.charts.setOnLoadCallback(function() {
    				setTimeout(function() { charts1and2(data.chart1, data.chart2) }, 0);
    				setTimeout(function() { chart3(data.chart3) }, 0);
    				setTimeout(function() { chart4(data.chart4) }, 0);
    				setTimeout(function() { chart5(data.chart5) }, 0);
    			});
			}
		});
	}
	
	function charts1and2(d1, d2) {
		$ui.getUIObject("DemoStats2", "dashboard_DemoStats1", function(sts) {
			sts.getMetaData(function() {
				var product = sts.getField("demoPrdName");
				var count = sts.getField("demoStsCount");
				var quantity = sts.getField("demoStsQuantity");
				var amount = sts.getField("demoStsAmount");

				$("#demo-dashboard-title-1").text(sts.getDisplay() + " (" + count.getDisplay() + " / " + quantity.getDisplay() + ")");
				$("#demo-dashboard-title-2").text(sts.getDisplay() + " (" + amount.getDisplay() + ")");

				var data1 = new google.visualization.DataTable();
				data1.addColumn("string", product.getDisplay());
				data1.addColumn("number", count.getDisplay());
				data1.addColumn("number", quantity.getDisplay());

				var data2 = new google.visualization.DataTable();
				data2.addColumn("string", product.getDisplay());
				data2.addColumn("number", amount.getDisplay());

				sts.search(function(rows) {
					for (var i = 0; i < rows.length; i++) {
						data1.addRow([ rows[i].demoPrdName, rows[i].demoStsCount, rows[i].demoStsQuantity ]);
						data2.addRow([ rows[i].demoPrdName, rows[i].demoStsAmount ]);
					}

			        new google.visualization.BarChart(document.getElementById("demo-dashboard-1")).draw(data1, {
						chartArea: { width: "60%" },
						vAxis: { title: product.getDisplay() },
						bars: "horizontal"
					});
					
					new google.visualization.PieChart(document.getElementById("demo-dashboard-2")).draw(data2, {
						pieHole: 0.2
					});
				});
			});
		});
	}
	
	function chart3(d) {
		$("#demo-dashboard-title-3").text(d.title);
		
		// TODO
		new google.visualization.GeoChart(document.getElementById("demo-dashboard-3")).draw(google.visualization.arrayToDataTable([
			["Country",   "Population", "Area Percentage"],
			["France",  65700000, 50],
			["Germany", 81890000, 27],
			["Poland",  38540000, 23]
		]), {
			sizeAxis: { minValue: 0, maxValue: 100 },
			region: "155", // Western Europe
			displayMode: "markers",
			colorAxis: {colors: ["#e7711c", "#4374e0"]} // orange to blue
		});
      }

	function chart4(d) {
		$ui.getUIObject("DemoStats1", "dashboard_DemoStats1", function(sts) {
			sts.getMetaData(function() {
				$("#demo-dashboard-title-4").text(sts.getDisplay());

				var data4 = new google.visualization.DataTable();
				var status = sts.getField("demoOrdStatus");
				data4.addColumn("string", status.getDisplay());
				data4.addColumn("number", sts.getField("demoStsCount").getDisplay());
				data4.addColumn("number", sts.getField("demoStsQuantity").getDisplay());
				data4.addColumn("number", sts.getField("demoStsAmount").getDisplay());

				sts.search(function(rows) {
					for (var i = 0; i < rows.length; i++) {
						var row = Object.values(rows[i]); // Transform to an array
						row.shift(); // Remove row ID
						row[0] = status.getDisplayValue(row[0]); // Display status value instead of code
						data4.addRow(row);
					}

					new google.visualization.Table(document.getElementById("demo-dashboard-4")).draw(data4, {
						showRowNumber: true,
						width: "100%",
						height: "100%"
					});
				});
			});
		});
	}
	
	function chart5(d) {
		$("#demo-dashboard-title-5").text(d.title);

		new google.visualization.Gauge(document.getElementById("demo-dashboard-5")).draw(google.visualization.arrayToDataTable([
			[ "Label", "Value" ],
			[ d.data[0].label, d.data[0].value ],
		]), {
			width: "100%", height: 150,
			redFrom: 0, redTo: 50,
			yellowFrom: 50, yellowTo: 75,
			greenFrom: 75, greenTo: 100,
			minorTicks: 5
		});
	}

	return { render: render };
})(jQuery);