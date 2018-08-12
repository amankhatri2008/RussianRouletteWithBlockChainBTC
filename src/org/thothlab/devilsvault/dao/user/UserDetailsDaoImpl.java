package org.thothlab.devilsvault.dao.user;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.authentication.LockedException;
import org.springframework.stereotype.Repository;

import org.thothlab.devilsvault.db.model.UserAttempts;

import info.blockchain.api.APIException;
import info.blockchain.api.wallet.Wallet;
import info.blockchain.api.wallet.entity.Address;




@Repository
public class UserDetailsDaoImpl extends JdbcDaoSupport implements UserDetailsDao {

	private static final String SQL_USERS_UPDATE_LOCKED = "UPDATE users SET accountNonLocked = ? WHERE username = ?";
	private static final String SQL_USERS_COUNT = "SELECT count(*) FROM users WHERE username = ?";

	private static final String SQL_USER_ATTEMPTS_GET = "SELECT * FROM user_attempts WHERE username = ?";
	private static final String SQL_USER_ATTEMPTS_INSERT = "INSERT INTO user_attempts (USERNAME, ATTEMPTS, LASTMODIFIED) VALUES(?,?,?)";

	private static final String SQL_USER_ATTEMPTS_UPDATE_ATTEMPTS = "UPDATE user_attempts SET attempts = attempts + 1, lastmodified = ? WHERE username = ?";
	private static final String SQL_USER_ATTEMPTS_RESET_ATTEMPTS = "UPDATE user_attempts SET attempts = 0, lastmodified = now() WHERE username = ?";

	private static final String SQL_BTC_ADDRESS_USER_HAS = "SELECT count(*) FROM user_btcaddress_deposit WHERE email = ?";
	

	
	private static final int MAX_ATTEMPTS = 5;

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
	}

	@Override
	public void updateFailAttempts(String username) {

		UserAttempts user = getUserAttempts(username);
		if (user == null) {
			if (isUserExists(username)) {
				// if no record, insert a new
				getJdbcTemplate().update(SQL_USER_ATTEMPTS_INSERT, new Object[] { username, 1, new Date() });
			}
		} else {

			if (isUserExists(username)) {
				// update attempts count, +1
				getJdbcTemplate().update(SQL_USER_ATTEMPTS_UPDATE_ATTEMPTS, new Object[] { new Date(), username });
			}

			if (user.getAttempts() + 1 >= MAX_ATTEMPTS) {
				// locked user
				try{
					getJdbcTemplate().update(SQL_USERS_UPDATE_LOCKED, new Object[] { false, username });
				}catch(Exception e){
					e.printStackTrace();
					throw new LockedException("User Account is locked!");
				}
				
				// throw exception
				
			}

		}

	}

	@Override
	public UserAttempts getUserAttempts(String username) {

		try {

			UserAttempts userAttempts = getJdbcTemplate().queryForObject(SQL_USER_ATTEMPTS_GET,
					new Object[] { username }, new RowMapper<UserAttempts>() {
						public UserAttempts mapRow(ResultSet rs, int rowNum) throws SQLException {

							UserAttempts user = new UserAttempts();
							user.setId(rs.getInt("id"));
							user.setUsername(rs.getString("username"));
							user.setAttempts(rs.getInt("attempts"));
							user.setLastModified(rs.getDate("lastModified"));

							return user;
						}

					});
			return userAttempts;

		} catch (EmptyResultDataAccessException e) {
			return null;
		}

	}

	@Override
	public void resetFailAttempts(String username) {

		getJdbcTemplate().update(SQL_USER_ATTEMPTS_RESET_ATTEMPTS, new Object[] { username });

	}

	private boolean isUserExists(String username) {

		boolean result = false;

		int count = getJdbcTemplate().queryForObject(SQL_USERS_COUNT, new Object[] { username }, Integer.class);
		if (count > 0) {
			result = true;
		}

		return result;
	}

	@Override
	public Integer mapUserWithWalletAddress(String username) {
		try{
			if(isBTCExists(username)==1){
				Wallet walletObj = new Wallet("http://localhost:3000/", null,
						"221b320f-ae60-4530-b165-8ef7f491067d", "Basket@123");
				Address address=walletObj.newAddress("LABEL_"+username.substring(1, 5));
				String SQL_BTC_ADDRESS_USER_INSERT = "INSERT INTO user_btcaddress_deposit (email, btcAddress, currentValue,createDate) VALUES(?,?,?,?)";
				getJdbcTemplate().update(SQL_BTC_ADDRESS_USER_INSERT,
						new Object[] { username, address.getAddress(), 0, new Date() });

			     	return 1;
					
				
			}else{
				return 2;
			}
	 
		}catch(Exception e){
			e.printStackTrace();
		}
		return 1;
	}
	
	private Integer isBTCExists(String username) {

		Integer result = 1;

		int count = getJdbcTemplate().queryForObject(SQL_BTC_ADDRESS_USER_HAS, new Object[] { username }, Integer.class);
		if (count > 0) {
			try {
			Wallet walletObj = new Wallet("http://localhost:3000/", null,
					"221b320f-ae60-4530-b165-8ef7f491067d", "Basket@123");
			
				List<Address> allAddressInWallet=new ArrayList<Address>();;
				
					allAddressInWallet = walletObj.listAddresses();
					for(Address address :allAddressInWallet ){
						try{
							System.out.println("Addeessssss::::::::"+address.getAddress());
							String updateBTCDeposit="update user_btcaddress_deposit set currentValue="+address.getBalance()+" ,totalReceived="+address.getTotalReceived()+",updateDate=now() where btcAddress='"+address.getAddress()+"'";
							getJdbcTemplate().update(updateBTCDeposit);
							
						}catch(Exception e){
							e.printStackTrace();
							return 3;
						}
						
						
					}
				} catch (APIException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
					return 2;
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
					return 2;
				}
				
			result = 1;
		}

		return result;
	}

}