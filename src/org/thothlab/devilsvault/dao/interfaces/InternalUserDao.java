package org.thothlab.devilsvault.dao.interfaces;


import org.springframework.stereotype.Repository;
import org.thothlab.devilsvault.db.model.InternalUserRegister;



public interface InternalUserDao {

	
	 Boolean save(InternalUserRegister internalUser);
}
