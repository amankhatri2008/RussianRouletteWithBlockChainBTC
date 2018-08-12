package org.thothlab.devilsvault.dao.customer;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import org.thothlab.devilsvault.db.model.Customer;


@Repository ("CustomerAccountsDAO")
public class CustomerAccountsDAO{
	private JdbcTemplate jdbcTemplate;
	private DataSource dataSource;
	@Autowired
	public void setdataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	 
	
	
	public String getEmailID(Integer userID)
	{
		 String query = "SELECT email from internal_user where id= '" + userID + "'"; 
	        String email = jdbcTemplate.queryForList(query, String.class).get(0);
	        return email;
	}
	
	

	
}

