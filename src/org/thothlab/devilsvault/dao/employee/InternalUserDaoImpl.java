package org.thothlab.devilsvault.dao.employee;

import java.math.BigInteger;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import org.thothlab.devilsvault.db.model.InternalUserRegister;

@Repository ("EmployeeDAOForInternal")
public class InternalUserDaoImpl implements InternalUserDao {
	private JdbcTemplate jdbcTemplate;
	@SuppressWarnings("unused")
	private DataSource dataSource;
	
	
	@Autowired
	public void setdataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	public Integer getUserId(String email) {
        String query = "SELECT id from internal_user where email= '" + email + "'"; 
        Integer id = jdbcTemplate.queryForList(query, Integer.class).get(0);
        return id;
    }
	
	public InternalUserRegister getUserById(int user_id) {
        String query = "SELECT * from internal_user where id= '" + user_id + "'"; 
        InternalUserRegister user = new InternalUserRegister();
        List<InternalUserRegister> user_list = new ArrayList<InternalUserRegister>();
        user_list = jdbcTemplate.query(query, new BeanPropertyRowMapper<InternalUserRegister>(InternalUserRegister.class));
        if(user_list.size()>0){
        	user = user_list.get(0);
        }
        return user;
    }
	
	public String getEmailID(Integer userID)
	{
		 String query = "SELECT email from internal_user where id= '" + userID + "'"; 
	        String email = jdbcTemplate.queryForList(query, String.class).get(0);
	        return email;
	}
	
	
	
	public Boolean save(InternalUserRegister userdetails)
    {
        String query = "INSERT INTO internal_user (  name ,  phone , email , password,country ,created_date,referUser) VALUES (?,?,?,?,?,?,?)";
        Connection con = null;
        PreparedStatement ps = null;
        try{
            con = dataSource.getConnection();
            ps = con.prepareStatement(query);
           
            ps.setString(1, userdetails.getName());
            ps.setString(2, userdetails.getPhone());
            ps.setString(3, userdetails.getEmail());
            ps.setString(4, userdetails.getPassword());
            ps.setString(5, userdetails.getCountry());
            java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
            ps.setTimestamp(6, date);
            ps.setString(7, userdetails.getReferUser());
            int out = ps.executeUpdate();
            if(out !=0){
                return true;
            }else return false;
        }catch(SQLException e){
            e.printStackTrace();
        }finally{
            try {
                ps.close();
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return false;
		
		
    }

}
