package org.thothlab.devilsvault.db.model;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Date;



public class UserBtcAddressDeposit {
   
    private String email;
    
    private String btcAddress;
    private BigDecimal currentValue;
    private Date createDate;
    private Date updateDate;
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
	public BigDecimal getCurrentValue() {
		return currentValue;
	}
	public void setCurrentValue(BigDecimal currentValue) {
		this.currentValue = currentValue;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}