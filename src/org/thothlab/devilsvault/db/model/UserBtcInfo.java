package org.thothlab.devilsvault.db.model;

import java.math.BigInteger;
import java.sql.Date;

public class UserBtcInfo {
  
    private String email;
    private String btcAddress;
    private Float curentValue;
    private Date createdDate;
    private Date updateddate;
    
    
    
   
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
	public String getBtcAddress() {
		return btcAddress;
	}
	public void setBtcAddress(String btcAddress) {
		this.btcAddress = btcAddress;
	}
	public Float getCurentValue() {
		return curentValue;
	}
	public void setCurentValue(Float curentValue) {
		this.curentValue = curentValue;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getUpdateddate() {
		return updateddate;
	}
	public void setUpdateddate(Date updateddate) {
		this.updateddate = updateddate;
	}
    
    
    
}