package org.thothlab.devilsvault.dao.user;

import java.util.Date;

import org.thothlab.devilsvault.db.model.UserAttempts;

public interface AdminActionDao {

	void save(String username, String ErrorMsg, String AdminName);

	
	
	
}