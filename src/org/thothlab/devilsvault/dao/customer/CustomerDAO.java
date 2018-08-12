package org.thothlab.devilsvault.dao.customer;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.LockedException;
import org.springframework.stereotype.Repository;
import org.thothlab.devilsvault.db.model.RussianRouletNumberHistory;
import org.thothlab.devilsvault.db.model.Customer;
import org.thothlab.devilsvault.db.model.RussianRouletteBetUser;
import org.thothlab.devilsvault.db.model.UserBtcAddressDeposit;
import org.thothlab.devilsvault.db.model.UserBtcInfo;

import info.blockchain.api.wallet.entity.Address;

@Repository ("customerDAO")
public class CustomerDAO {
	
	@SuppressWarnings("unused")
	private DataSource dataSource;
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	public void setDataSource(DataSource dataSource) {
		
		this.dataSource = dataSource;
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	public Customer getCustomer(int id) {
		String query = "select * from internal_user WHERE id = "+id+"";
		List<Customer> custList = jdbcTemplate.query(query, new BeanPropertyRowMapper<Customer>(Customer.class));
		return custList.size() == 0 ? null :custList.get(0);
	}
	
	public UserBtcAddressDeposit getCustomerBTCInfo(String id) {
		String query = "select * from user_btcaddress_deposit WHERE email = '"+id+"'";
		List<UserBtcAddressDeposit> custList = jdbcTemplate.query(query, new BeanPropertyRowMapper<UserBtcAddressDeposit>(UserBtcAddressDeposit.class));
		return custList.size() == 0 ? null :custList.get(0);
	}
	public void updateDeposits(Address address) {
		String updateBTCDeposit="update user_btcaddress_deposit set currentValue="+address.getBalance()+" ,totalReceived="+address.getTotalReceived()+",updateDate=now() where btcAddress="+address.getAddress();
		jdbcTemplate.update(updateBTCDeposit);
		
	}
	public List<RussianRouletteBetUser> getCustomerRussianRouletteHistorty(String username,String topResult) {
		String query = "select * from russian_roulette_user_bet WHERE email = '"+username+"' order by createDate desc LIMIT "+topResult;
		List<RussianRouletteBetUser> custList = jdbcTemplate.query(query, new BeanPropertyRowMapper<RussianRouletteBetUser>(RussianRouletteBetUser.class));
		return custList.size() == 0 ? null :custList;
	}
	public List<RussianRouletNumberHistory> getRussianRouletNumberHistory(String username, String topResult) {
		String query = "select * from russian_roulette_number_history  order by createDate desc LIMIT "+topResult;
		List<RussianRouletNumberHistory> custList = jdbcTemplate.query(query, new BeanPropertyRowMapper<RussianRouletNumberHistory>(RussianRouletNumberHistory.class));
		return custList.size() == 0 ? null :custList;
	}
	
	
}