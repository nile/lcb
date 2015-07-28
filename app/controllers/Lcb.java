package controllers;

import models.Goe;
import models.Trip;
import play.mvc.Controller;

import com.google.common.collect.Lists;

public class Lcb  extends Controller {
	public static void trips() {
		Trip t1 = createTrip();
		Trip t2 = createTrip();
		renderJSON(Lists.newArrayList(t1,t2));
	}

	private static Trip createTrip() {
		Trip t1 = new Trip();
		t1.id = System.currentTimeMillis();
		t1.date = "2015-11-5";
		t1.time = "09:02";
		t1.flight = "CA0020";
		t1.status = "待支付";
		Goe start = new Goe();
		start.name = "天堂软件园";
		start.address = "西斗门路3号";
		t1.start = start;
		Goe end = new Goe();
		end.name = "天堂软件园";
		end.address = "西斗门路3号";
		t1.end = end;
		return t1;
	}
}
