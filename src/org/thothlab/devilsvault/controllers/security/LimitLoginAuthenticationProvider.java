package org.thothlab.devilsvault.controllers.security;

import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.thothlab.devilsvault.dao.user.AdminActionDao;
import org.thothlab.devilsvault.dao.user.UserDetailsDao;
import org.thothlab.devilsvault.db.model.UserAttempts;



public class LimitLoginAuthenticationProvider extends DaoAuthenticationProvider {

	UserDetailsDao userDetailsDao;
	AdminActionDao adminActionDao;
	protected final Log logger = LogFactory.getLog(getClass());
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
		try {
			
			Authentication auth = super.authenticate(authentication);
			//906278
			
			
			// if reach here, means login success, else exception will be thrown
			// reset the user_attempts
			userDetailsDao.resetFailAttempts(authentication.getName());
			int result =userDetailsDao.mapUserWithWalletAddress(authentication.getName());
			if(result!=1){
				adminActionDao.save(authentication.getName(),"Unable to generate BTC address for User","ADMIN");
			}
			
			return auth;

		} catch (BadCredentialsException e) {

			userDetailsDao.updateFailAttempts(authentication.getName());
			throw e;

		} catch (LockedException e) {

			String error = "";
			UserAttempts userAttempts = userDetailsDao.getUserAttempts(authentication.getName());
			if (userAttempts != null) {
				Date lastAttempts = userAttempts.getLastModified();
				error = "User account is locked! Username : " + authentication.getName()
						+ " Last Attempts : " + lastAttempts + " Please contact the administrator for further assistance";
			} else {
				error = e.getMessage();
			}

			throw new LockedException(error);
		}

	}

	public UserDetailsDao getUserDetailsDao() {
		return userDetailsDao;
	}

	public void setUserDetailsDao(UserDetailsDao userDetailsDao) {
		this.userDetailsDao = userDetailsDao;
	}

	public AdminActionDao getAdminActionDao() {
		return adminActionDao;
	}

	public void setAdminActionDao(AdminActionDao adminActionDao) {
		this.adminActionDao = adminActionDao;
	}

	
	
}