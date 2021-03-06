package com.simplicite.extobjects.DemoDashboard;

import org.json.JSONArray;
import org.json.JSONObject;

import com.simplicite.util.Tool;
import com.simplicite.util.tools.Parameters;

/**
 * Dashboard
 */
public class DemoDashboard extends com.simplicite.webapp.web.ResponsiveExternalObject {
	private static final long serialVersionUID = 1L;

	@Override
	public JSONObject getData(Parameters params) {
		JSONObject chart1 = new JSONObject(); // Data is retreived thru Ajax calls
		JSONObject chart2 = new JSONObject(); // Data is retreived thru Ajax calls
		JSONObject chart3 = new JSONObject(); // Data is retreived thru Ajax calls
		JSONObject chart4 = new JSONObject(); // Data is retreived thru Ajax calls
		JSONObject chart5 = new JSONObject()  // Example of custom server-side SQL query
			.put("title", getGrant().T("DEMO_DASHBOARD_GAUGE_TITLE"))
			.put("data", new JSONArray()
				.put(new JSONObject()
					.put("label", getGrant().T("DEMO_DASHBOARD_GAUGE_LABEL"))
					.put("value", Tool.parseInt(getGrant().simpleQuery("select avg(ord_quantity)*100/max(ord_quantity) from demo_order")))
				)
			);

		return new JSONObject()
			.put("chart1", chart1)
			.put("chart2", chart2)
			.put("chart3", chart3)
			.put("chart4", chart4)
			.put("chart5", chart5);
	}
}