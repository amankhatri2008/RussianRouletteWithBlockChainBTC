package org.thothlab.devilsvault.db.model;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

public class RussianRouletteBetUserList {
	private List<RussianRouletteBetUser> russianRouletteBetUserList = new LinkedList<RussianRouletteBetUser>();

	
	public RussianRouletteBetUserList() {
    }
 
    public RussianRouletteBetUserList(List<RussianRouletteBetUser> russianRouletteBetUserList) {
        this.russianRouletteBetUserList = russianRouletteBetUserList;
    }
	
	
	public List<RussianRouletteBetUser> getRussianRouletteBetUserList() {
		return russianRouletteBetUserList;
	}

	public void setRussianRouletteBetUserList(List<RussianRouletteBetUser> russianRouletteBetUserList) {
		this.russianRouletteBetUserList = russianRouletteBetUserList;
	}
	
	
	
	
}
