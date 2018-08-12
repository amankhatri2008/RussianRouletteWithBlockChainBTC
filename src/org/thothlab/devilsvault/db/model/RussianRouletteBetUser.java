package org.thothlab.devilsvault.db.model;

import java.math.BigDecimal;
import java.sql.Date;

public class RussianRouletteBetUser {

	private Integer userId;
	private String email;
	private BigDecimal bet_amount;
	private BigDecimal win;
	private BigDecimal loss;
	private String numbers;
    private Date createDate;
	private Date updateDate;
	
	private BigDecimal final_amount;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String emailId) {
		this.email = emailId;
	}

	public BigDecimal getBet_amount() {
		return bet_amount;
	}

	public void setBet_amount(BigDecimal bet_amount) {
		this.bet_amount = bet_amount;
	}

	public BigDecimal getWin() {
		return win;
	}

	public void setWin(BigDecimal win) {
		this.win = win;
	}

	public BigDecimal getLoss() {
		return loss;
	}

	public void setLoss(BigDecimal loss) {
		this.loss = loss;
	}

	public String getNumbers() {
		return numbers;
	}

	public void setNumbers(String numbers) {
		this.numbers = numbers;
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

	public BigDecimal getFinal_amount() {
		return final_amount;
	}

	public void setFinal_amount(BigDecimal final_amount) {
		this.final_amount = final_amount;
	}
	
	
	
}
