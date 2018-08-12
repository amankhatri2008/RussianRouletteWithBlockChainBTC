package org.thothlab.devilsvault.dao.employee;


import org.springframework.stereotype.Repository;
import org.thothlab.devilsvault.db.model.InternalUserRegister;


@Repository ("InternalUserDao")
public interface InternalUserDao {

	
	 Boolean save(InternalUserRegister internalUser);
}
