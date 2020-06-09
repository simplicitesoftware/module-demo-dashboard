package com.simplicite.extobjects.DemoDashboard;

import org.json.*;
import com.simplicite.util.tools.Parameters;

/**
 * Dashboard
 */
public class DemoDashboard extends com.simplicite.webapp.web.ResponsiveExternalObject {
	private static final long serialVersionUID = 1L;
	
	@Override
	public JSONObject getData(Parameters params) {
		JSONObject chart1 = new JSONObject().put("title", "Bar chart example");
		JSONObject chart2 = new JSONObject().put("title", "Pie chart example");
		JSONObject chart3 = new JSONObject().put("title", "Google Maps example");
		JSONObject chart4 = new JSONObject().put("title", "Table example");
		JSONObject chart5 = new JSONObject().put("title", "Waterfall chart example");
		JSONObject chart6 = new JSONObject().put("title", "Gauge example");
		
		return new JSONObject()
			.put("chart1", chart1)
			.put("chart2", chart2)
			.put("chart3", chart3)
			.put("chart4", chart4)
			.put("chart5", chart5)
			.put("chart6", chart6);
	}
}