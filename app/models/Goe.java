package models;

import javax.persistence.Entity;

import play.db.jpa.Model;

@Entity
public class Goe extends Model {
	public double lng;
	public double lat;
	public String name;
	public String address;
}
