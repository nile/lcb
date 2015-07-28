package models;

import javax.persistence.OneToOne;

import play.db.jpa.Model;

public class Trip extends Model {
	public String date;
	public String time;
	public String flight;
	public String status;
	@OneToOne
	public Goe start;
	@OneToOne
	public Goe end;
}
