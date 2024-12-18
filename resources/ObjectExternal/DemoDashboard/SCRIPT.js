//-----------------------------------------------------------
// Client side JavaScript for dashboard
//-----------------------------------------------------------

/* global google */

var DemoDashboard = DemoDashboard || (() => {
	function render(params, data) {
		$ui.loadScript({
			url: 'https://www.gstatic.com/charts/loader.js',
			onload: function() {
				// These two charts are using a "select" object
				const charts1and2 = (_d1, _d2) => {
					$ui.getUIObject('DemoStats2', 'dashboard_DemoStats2', function(sts) {
						const product = sts.getField('demoStsRowId__demoPrdName');
						const count = sts.getField('demoStsCount');
						const quantity = sts.getField('demoStsQuantities');
						const total = sts.getField('demoStsTotals');

						$('#demodashboard-1').append($ui.view.tools.panel({
							title: sts.metadata.label + ' (' + count.label + ' / ' + quantity.label + ')',
							content: $('<div/>', { id: 'demodashboard-chart1' })
						}));

						$('#demodashboard-2').append($ui.view.tools.panel({
							title: sts.metadata.label + ' (' + total.label + ')',
							content: $('<div/>', { id: 'demodashboard-chart2' })
						}));

						const data1 = new google.visualization.DataTable();
						data1.addColumn('string', product.label);
						data1.addColumn('number', count.label);
						data1.addColumn('number', quantity.label);

						const data2 = new google.visualization.DataTable();
						data2.addColumn('string', product.label);
						data2.addColumn('number', total.label);

						sts.search(function(rows) {
							for (const row of rows) {
								data1.addRow([ row.demoStsRowId__demoPrdName, row.demoStsCount, row.demoStsQuantities ]);
								data2.addRow([ row.demoStsRowId__demoPrdName, row.demoStsTotals ]);
							}

							new google.visualization.BarChart(document.getElementById('demodashboard-chart1')).draw(data1, {
								chartArea: { width: '60%' },
								vAxis: { title: product.label },
								bars: 'horizontal'
							});

							new google.visualization.PieChart(document.getElementById('demodashboard-chart2')).draw(data2, {
								pieHole: 0.2
							});
						});
					});
				};

				// This chart is using pivot table data
				const chart3 = _d => {
					$ui.getUIObject('DemoOrder', 'dashboard_DemoOrder', function(ord) {
						const tab = ord.getPivotTable('DemoOrder-TC4');

						$('#demodashboard-3').append($ui.view.tools.panel({
							title: tab.label,
							content: $('<div/>', { id: 'demodashboard-chart3' })
						}));

						ord.getPivotTableData(function(cubes) {
							const data3 = new google.visualization.DataTable();
							data3.addColumn('string', ord.getField('demoOrdCliId__demoCliCountry').label);
							data3.addColumn('number', ord.getField('demoOrdTotal').label);
							data3.addColumn('number', '%');

							let sum = 0;
							for (const cube of cubes)
								sum += cube.demoOrdTotal;

							for (const cube of cubes)
								data3.addRow([ cube.demoOrdCliId__demoCliCountry, cube.demoOrdTotal, cube.demoOrdTotal / sum * 100 ]);

							new google.visualization.GeoChart(document.getElementById('demodashboard-chart3')).draw(data3, {
								sizeAxis: { minValue: 0, maxValue: 100 },
								region: '150', // Europe
								colorAxis: { colors: ['#ff9900', '#109618'] }
							});
						}, tab.name);
					});
				};

				// This chart is using a "select" objet
				const chart4 = _d => {
					$ui.getUIObject('DemoStats1', 'dashboard_DemoStats1', function(sts) {
						$('#demodashboard-4').append($ui.view.tools.panel({
							title: sts.metadata.label,
							content: $('<div/>', { id: 'demodashboard-chart4' })
						}));

						const data4 = new google.visualization.DataTable();
						const status = sts.getField('demoOrdStatus');
						data4.addColumn('string', status.label);
						data4.addColumn('number', sts.getField('demoStsCount').label);
						data4.addColumn('number', sts.getField('demoStsQuantities').label);
						data4.addColumn('number', sts.getField('demoStsTotals').label);

						sts.search(function(rows) {
							for (const row of rows) {
								const rs = Object.values(row); // Transform to an array
								rs.shift(); // Remove row ID
								rs[0] = status.getDisplayValue(rs[0]); // Display status value instead of code
								data4.addRow(rs);
							}

							new google.visualization.Table(document.getElementById('demodashboard-chart4')).draw(data4, {
								showRowNumber: true,
								width: '100%', height: '100%'
							});
						});
					});
				};

				// This chart is using a custom data provided by the server-side code
				const chart5 = d => {
					$('#demodashboard-5').append($ui.view.tools.panel({
						title: d.title,
						content: $('<div/>', { id: 'demodashboard-chart5' })
					}));

					new google.visualization.Gauge(document.getElementById('demodashboard-chart5')).draw(google.visualization.arrayToDataTable([
						[ 'Label', 'Value' ],
						[ d.data[0].label, d.data[0].value ],
					]), {
						width: '100%', height: 150,
						redFrom: 0, redTo: 50,
						yellowFrom: 50, yellowTo: 75,
						greenFrom: 75, greenTo: 100,
						minorTicks: 5
					});
				};

				google.charts.load('current', { 'packages': ['corechart', 'bar', 'geochart', 'table', 'gauge'], mapsApiKey: Simplicite.GOOGLE_API_KEY });
				google.charts.setOnLoadCallback(function() {
					setTimeout(function() { charts1and2(data.chart1, data.chart2); }, 0);
					setTimeout(function() { chart3(data.chart3); }, 0);
					setTimeout(function() { chart4(data.chart4); }, 0);
					setTimeout(function() { chart5(data.chart5);}, 0);
				});
			}
		});
	}

	return { render: render };
})();