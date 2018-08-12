package org.thothlab.devilsvault.dao.userauthentication;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.Random;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.thothlab.devilsvault.dao.customer.CustomerAccountsDAO;
import org.thothlab.devilsvault.dao.employee.InternalUserDaoImpl;
import org.thothlab.devilsvault.dao.employee.Validator;
import org.thothlab.devilsvault.db.model.UserAuthentication;

@Repository("userAuthenticationDao")
public class UserAuthenticationDaoImpl implements UserAuthenticationDao {

	@SuppressWarnings("unused")
	private DataSource dataSource;

	private JdbcTemplate jdbcTemplate;

	@Override
	@Autowired
	public void setDataSource(DataSource dataSource) {
		// TODO Auto-generated method stub
		this.dataSource = dataSource;
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public void updatePassword(String newPassword, String username) {
		String sql = "UPDATE users set password ='" + newPassword + "' where username ='" + username + "';";
		jdbcTemplate.update(sql);
	}

	@Override
	public String changePassword(String oldPassword, String newPassword, String confirmPassword, Integer userID,
			String role) {
		String message = "";
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
		Validator validate = ctx.getBean("Validator", Validator.class);
		if (newPassword.equals(confirmPassword)) {
			if (validate.validatePassword(newPassword)) {
				CustomerAccountsDAO customeraccDao = ctx.getBean("CustomerAccountsDAO", CustomerAccountsDAO.class);
				InternalUserDaoImpl internaluserdao = ctx.getBean("EmployeeDAOForInternal", InternalUserDaoImpl.class);
				String email;
				if (role.equals("ROLE_CUSTOMER") || role.equals("ROLE_MERCHANT")) {
					email = customeraccDao.getEmailID(userID);
				} else {
					email = internaluserdao.getEmailID(userID);
				}
				UserAuthentication userdetails = getUserDetails(email);
				BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
				if (passwordEncoder.matches(oldPassword, userdetails.getPassword())) {
					updatePassword(passwordEncoder.encode(newPassword), email);
					message = "Password changed successfully";
				} else {
					message = "Old password entered is incorrect";
				}
			} else {
				message = "Password not meeting minimum criteria";
			}

		} else {
			message = "confirm password doesn't match with the new password";
		}
		ctx.close();
		return message;
	}

	@Override
	public UserAuthentication getUserDetails(String email) {
		String query = "SELECT * FROM users where username ='" + email + "';";
		List<UserAuthentication> userDetails = jdbcTemplate.query(query,
				new BeanPropertyRowMapper<UserAuthentication>(UserAuthentication.class));
		return userDetails.get(0);
	}

	public Boolean validateuserDetails(String username, String table) {
		String queryInternal = "SELECT COUNT(*) FROM " + table + " WHERE email ='" + username + "' ;";
		Integer countinternal = jdbcTemplate.queryForObject(queryInternal, Integer.class);
		
		if (countinternal > 0) {
			return false;
		}
		return true;
	}

	public HashMap<String, String> randomPasswordGenerator() {
		HashMap<String, String> passwords = new HashMap<String, String>();
		Random rand = new Random();
		Long rawPassword = (long) (rand.nextInt(999999 - 100000) + 100000);
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(Long.toString(rawPassword));
		passwords.put("rawPassword", Long.toString(rawPassword));
		passwords.put("hashedPassword", hashedPassword);
		return passwords;

	}

	public UserAuthentication setNewUsers(String username, String password, String role) {
		UserAuthentication userdetails = new UserAuthentication();
		userdetails.setUsername(username);
		userdetails.setPassword(password);
		userdetails.setRole(role);
		userdetails.setAccountNonExpired(1);
		userdetails.setAccountNonLocked(1);
		userdetails.setCredentialsNonExpired(1);
		userdetails.setEnabled(1);
		userdetails.setOtpNonLocked(1);
		return userdetails;
	}

	@Override
	public Boolean save(UserAuthentication userdetails) {
		String query = "INSERT INTO users(username,password,enabled,role,accountNonExpired,accountNonLocked,credentialsNonExpired,otpNonLocked)VALUES(?,?,?,?,?,?,?,?)";
		Connection con = null;
		PreparedStatement ps = null;
		try {
			con = dataSource.getConnection();
			ps = con.prepareStatement(query);
			ps.setString(1, userdetails.getUsername());
			ps.setString(2, userdetails.getPassword());
			ps.setInt(3, userdetails.getEnabled());
			ps.setString(4, userdetails.getRole());
			ps.setInt(5, userdetails.getAccountNonExpired());
			ps.setInt(6, userdetails.getAccountNonLocked());
			ps.setInt(7, userdetails.getCredentialsNonExpired());
			ps.setInt(8, userdetails.getOtpNonLocked());
			int out = ps.executeUpdate();
			if (out != 0) {
				return true;
			} else
				return false;
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			try {
				ps.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return false;
	}

	public String changeForgotPassword(String newPassword, String confirmPassword,String username) {
        String message ="";
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
        Validator validate = ctx.getBean("Validator",Validator.class);
        if(newPassword.equals(confirmPassword))
        {
        	if(validate.validatePassword(newPassword))
        	{
        		 BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                 updatePassword(passwordEncoder.encode(newPassword), username);
                 message = "Password changed successfully";
        	}
        	else
        	{
        		message = "Password not meeting minimum criteria!!";
        	}
        }
        else
        {
            message = "confirm password doesn't match with the new password";
        }
        ctx.close();
        return message;
    }
	
	public void sendEmailToUser(String email, String pass) {
		// TODO Auto-generated method stub
		Properties prop = new Properties();
		try {
			prop.load(OtpDaoImpl.class.getClassLoader().getResourceAsStream("smtp.properties"));

		} catch (FileNotFoundException fne) {
			fne.printStackTrace();
			return;
		} catch (IOException ioe) {
			ioe.printStackTrace();
			return;
		}

		final String username = prop.getProperty("username");
		final String password = prop.getProperty("password");
		prop = new Properties();
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.starttls.enable", "true");
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", "587");

		Session session = Session.getInstance(prop, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("securebanking.ss4@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
			
			String sb = "<div style='background-color:#f6f6fc;font-family:Lato;text-align:center;padding:50px'><div class='adM'> </div><table style='width:602px;margin:0 auto;border-spacing:0px'>     <tbody><tr style='background-color:#444444'>         <td colspan='1' style='float:left' align='center'>             <table>                 <tbody><tr>                     <td style='width:71px;height:71px;padding-left:30px;padding-top:30px;padding-bottom:30px' align='center'>                         <img src='https://ci5.googleusercontent.com/proxy/Fbvk8IcXDjJ3rhD8nQdTkRSdtSbl8xTWopliIo7e0XOf1d7VGIv50FmmGCanennz9mdYH6mgO55N64_FyFxOys8CgBOQuxAgngi8s-uL=s0-d-e1-ft#https://www.onehash.com/api/static/logo.4d13fc631c5f.png' class='CToWUd'>                     </td>                     <td>                         <table style=cheight:39px'>                             <tbody><tr>                                 <td style='color:#ffffff;font-size:16px;width:100px;font-weight:300'>                                     <span class='il'>OneHash</span>                                 </td>                             </tr>                             <tr>                                 <td style='color:#7f7f7f;font-size:13px;color:#adb0b8;font-weight:300'>                                     mutual bitcoin betting                                 </td>                             </tr>                         </tbody></table>                     </td>                 </tr>             </tbody></table>         </td>         <td>             <table>                 <tbody><tr>                     <td>                     </td>                     <td>                     </td>                 </tr>             </tbody></table>         </td>     </tr>     <tr>         <td colspan='4' style='color:#3b3d42;background-color:#ffffff;text-align:left;font-size:20px;font-weight:700;padding-top:50px;padding-bottom:30px;padding-left:50px;border-style:solid;border-width:0px 1px 0px 1px;border-color:#e3e3e3' align='center'>             <span class='il'>OneHash</span> Verification         </td>     </tr>     <tr>         <td colspan='4' style='color:#7f7f7f;font-size:15px;font-weight:300;text-align:justify;line-height:1.5;background-color:#ffffff;padding-right:50px;padding-bottom:30px;padding-left:50px;border-style:solid;border-width:0px 1px 0px 1px;border-color:#e3e3e3' align='center'>                              <p>                   "
					+ "  Dear <a href='mailto:"+email+"' target='_blank'>"+email+"</a>,                 </p>     Your Password is "+pass+"            <p>                     Thank you for signing up to <a href='http://onehash.com' target='_blank' data-saferedirecturl='https://www.google.com/url?hl=en&amp;q=http://onehash.com&amp;source=gmail&amp;ust=1518183481217000&amp;usg=AFQjCNGRxD0I1BXjiQK9YuvYrsfi2eNL3w'><span class='il'>onehash</span>.com</a>. To provide you the best service possible, we require you to verify your email address. If you are receiving this email and have never signed up with us, please feel free to ignore this email. To finish your verification, please follow the directions below.                 </p>                 <p>                     Please click on the link below or copy and paste it into your browser to proceed with your registration.                 </p>                      </td>     </tr>     <tr>         <td colspan='4' style='font-size:15px;text-align:justify;background-color:#ffffff;padding-right:50px;padding-left:50px;border-style:solid;border-width:0px 1px 0px 1px;border-color:#e3e3e3' align='center'>             <a href='https://www.onehash.com/auth/signup/Sea3MOHoLezZIcwFtmZvRUIjxCr6z2zM/fzRFhR1crVVV3gACgJhiv-Q_l44/' class='m_-3039479613434988966link' style='color:#00a99d;font-weight:400;text-decoration:none' target='_blank' data-saferedirecturl='https://www.google.com/url?hl=en&amp;q=https://www.onehash.com/auth/signup/Sea3MOHoLezZIcwFtmZvRUIjxCr6z2zM/fzRFhR1crVVV3gACgJhiv-Q_l44/&amp;source=gmail&amp;ust=1518183481217000&amp;usg=AFQjCNGC29QRVuiQc7k8qBfiZoN8sv2bJw'>                 https://www.<span class='il'>onehash</span>.com/auth/<wbr>signup/<wbr>Sea3MOHoLezZIcwFtmZvRUIjxCr6z2<wbr>zM/fzRFhR1crVVV3gACgJhiv-Q_<wbr>l44/             </a>         </td>     </tr>     <tr>         <td colspan='4' style='color:#7f7f7f;font-size:15px;font-weight:300;text-align:justify;line-height:1.5;background-color:#ffffff;padding-top:30px;padding-right:50px;padding-bottom:50px;padding-left:50px;border-style:solid;border-width:0px 1px 0px 1px;border-color:#e3e3e3' align='center'>             - Team <span class='il'>OneHash</span>         </td>     </tr>     <tr>         <td colspan='1' style='color:#7f7f7f;background-color:#f8faf9;padding-left:50px;margin:0;font-weight:300;font-size:13px;text-align:left;border:1px solid;border-right:0;border-color:#e3e3e3' align='center'>             Copyright © <span class='il'>OneHash</span>         </td>         <td colspan='2' style='padding:40px 0;background-color:f8fAf9;border:1px solid;border-left:0;border-color:#e3e3e3' align='center'>             <table>                 <tbody><tr>                     <td style='background-color:f8fAf9;font-size:13px;font-weight:300;padding-right:15px' align='center'>                         <a href='https://www.onehash.com/support' style='text-decoration:none;color:#00a99d' target='_blank' data-saferedirecturl='https://www.google.com/url?hl=en&amp;q=https://www.onehash.com/support&amp;source=gmail&amp;ust=1518183481218000&amp;usg=AFQjCNFveySiw5zHbK-dy7kNl-9YnviMKg'>Customer                             support</a>                     </td>                     <td style='background-color:f8fAf9;font-size:13px;font-weight:300;text-align:right' align='center'>                         <a href='https://www.onehash.com/terms-of-use' style='text-decoration:none;color:#00a99d' target='_blank' data-saferedirecturl='https://www.google.com/url?hl=en&amp;q=https://www.onehash.com/terms-of-use&amp;source=gmail&amp;ust=1518183481218000&amp;usg=AFQjCNE2tXWROfphoc9uENsVeUdXI1PqyQ'>Terms                             of                             Use</a>                     </td>                 </tr>             </tbody></table>         </td>     </tr>     <tr>         <td colspan='4' style='color:#7f7f7f;font-size:12px;font-weight:300;padding:25px 65px 0 65px' align='center'>             This e-mail is sent due to betting on <a href='https://www.onehash.com' style='color:#7f7f7f;text-decoration:none' target='_blank' data-saferedirecturl='https://www.google.com/url?hl=en&amp;q=https://www.onehash.com&amp;source=gmail&amp;ust=1518183481218000&amp;usg=AFQjCNGcaQDh2Sp8pBLJvqYdvL6xHanBrA'><span class='il'>onehash</span>.com</a>.             Ignore if you didn't bet and do not respond to this e-mail.         </td>     </tr> </tbody></table><div class='yj6qo'></div><div class='adL'> </div></div>";
			MimeMultipart multipart = new MimeMultipart("related");
			BodyPart messageBodyPart = new MimeBodyPart();
			  messageBodyPart.setContent(sb, "text/html");
		         // add it
		         multipart.addBodyPart(messageBodyPart);
		         
		         
		      // second part (the image)
		        /* messageBodyPart = new MimeBodyPart();
		         DataSource fds = new FileDataSource(
		            "/home/manisha/javamail-mini-logo.png");

		         messageBodyPart.setDataHandler(new DataHandler(fds));*/
		         
		         
		         messageBodyPart.setHeader("Content-ID", "<image>");

		         // add image to the multipart
		         multipart.addBodyPart(messageBodyPart);

		         // put everything together
		         message.setContent(multipart);

			
			message.setSubject("Welcome to MyWebsite!");
			
			Transport.send(message);

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}

}
