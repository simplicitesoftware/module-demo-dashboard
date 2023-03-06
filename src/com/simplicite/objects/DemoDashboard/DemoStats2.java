package com.simplicite.objects.DemoDashboard;

import com.simplicite.util.AppLog;
import com.simplicite.util.Message;
import com.simplicite.util.ObjectDB;
import com.simplicite.util.Tool;
import com.simplicite.util.annotations.BusinessObjectAction;

/**
 * Product statistics & availability monitoring
 */
public class DemoStats2 extends ObjectDB {
	private static final long serialVersionUID = 1L;

	private String setAvailable(String prdId, boolean available) {
		try {
			ObjectDB prd = getGrant().getTmpObject("DemoProduct");
			prd.getTool().select(prdId);
			prd.setFieldValue("demoPrdAvailable", available);
			prd.getTool().validateAndSave();
			return Message.formatSimpleInfo("OK");
		} catch (Exception e) {
			String msg = "Error while setting availability for product ID " + prdId + " to " + available;
			AppLog.error(msg, e, getGrant());
			return msg + ": " + e.getMessage();
		}
	}

	/**
	 * Action: Make product available
	 */
	@BusinessObjectAction
	public String available() {
		return setAvailable(getFieldValue("demoStsRowId"), true);
	}

	/**
	 * Action: Make product not available
	 */
	@BusinessObjectAction
	public String notAvailable() {
		return setAvailable(getFieldValue("demoStsRowId"), false);
	}
	
	@Override
	public boolean isActionEnable(String[] row, String action) {
		boolean available = Tool.TRUE.equals(getFieldValue("demoStsRowId.demoPrdAvailable", row));
		if ("DEMO_STS2_NOT_AVAILABLE".equals(action))
			return available; 
		if ("DEMO_STS2_AVAILABLE".equals(action))
			return !available;
		return super.isActionEnable(row, action);
	}
}
