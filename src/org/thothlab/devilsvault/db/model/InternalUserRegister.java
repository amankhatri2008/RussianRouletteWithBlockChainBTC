package org.thothlab.devilsvault.db.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="internal_user")
public class InternalUserRegister {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
	
	@Column(name = "NAME", nullable = false)
    private String name;
	
	
    private String Fname;
    private String Lname;
    
    @Column(name = "email", nullable = false)
    private String email;
    
    @Column(name = "phone", nullable = false)
    private String phone;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @Column(name = "createdate", nullable = false)
    private Date createdate;
    
    @Column(name = "country", nullable = false)
    private String country;
    
    @Column(name = "referUser", nullable = false)
    private String referUser;
    
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFname() {
		return Fname;
	}
	public void setFname(String fname) {
		Fname = fname;
	}
	public String getLname() {
		return Lname;
	}
	public void setLname(String lname) {
		Lname = lname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getCreatedate() {
		return createdate;
	}
	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getReferUser() {
		return referUser;
	}
	public void setReferUser(String referUser) {
		this.referUser = referUser;
	}
     
    
   

	
    
      
}