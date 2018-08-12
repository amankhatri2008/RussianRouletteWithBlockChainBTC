package org.thothlab.devilsvault.dao.employee;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository ("Validator")
public class Validator  {
	
	@SuppressWarnings("unused")
	private DataSource dataSource;
	private Pattern pattern;

	@Autowired
	public void setdataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		
	}
	
	public Boolean validateEmail(String email)
	{
		String emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*" +
      "@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
		pattern = Pattern.compile(emailPattern);
		Matcher matcher = pattern.matcher(email);
		return matcher.matches();
	}
	public Boolean validateName(String name)
	{
		
		String namePattern = "[a-zA-Z\\s]+";

		pattern = Pattern.compile(namePattern);
		Matcher matcher = pattern.matcher(name);
		return matcher.matches();
	}
	public Boolean validateNumber(String number)
	{
		String numberPattern = "[0-9]+";
		pattern = Pattern.compile(numberPattern);
		Matcher matcher = pattern.matcher(number);
		return matcher.matches();
	}
	
	public Boolean validatePassword(String password)
	{
		return true;
	}
	public Boolean validateBitcoinAddress(String ssn)
	{
		return true;
	}

}