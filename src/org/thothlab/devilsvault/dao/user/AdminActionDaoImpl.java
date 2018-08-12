package org.thothlab.devilsvault.dao.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.security.authentication.LockedException;
import org.springframework.stereotype.Repository;
import org.thothlab.devilsvault.db.model.UserAttempts;



@Repository
public class AdminActionDaoImpl extends JdbcDaoSupport implements AdminActionDao {

	@Autowired
	private DataSource dataSource;

	@PostConstruct
	private void initialize() {
		setDataSource(dataSource);
	}
	
	public void save(String username, String ErrorMsg, String AdminName) {


        String query = "INSERT INTO adminactiontable (  userEmail ,  ErrorName , createDate , AdminName,resolved) VALUES (?,?,?,?,?)";
        Connection con = null;
        PreparedStatement ps = null;
        try{
            con = dataSource.getConnection();
            ps = con.prepareStatement(query);
           
            ps.setString(1, username);
            ps.setString(2, ErrorMsg);
            java.sql.Timestamp date = new java.sql.Timestamp(new java.util.Date().getTime());
            ps.setTimestamp(3, date);
            ps.setString(4, AdminName);
            ps.setInt(5, 0);
            
          
            int out = ps.executeUpdate();
           
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
       
    

		
	}

}