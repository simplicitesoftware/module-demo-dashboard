package com.simplicite.objects.DemoDashboard;

import com.simplicite.util.ObjectDB;

/**
 * Statistics per statuses
 */
public class DemoStats1 extends ObjectDB {
	private static final long serialVersionUID = 1L;
	
	@Override
	public void postLoad() {
		setMenuStates(false); // Not configurable
	}
}
