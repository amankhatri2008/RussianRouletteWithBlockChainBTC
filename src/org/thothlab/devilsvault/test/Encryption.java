package org.thothlab.devilsvault.test;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Properties;
import java.util.Random;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
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

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.thothlab.devilsvault.dao.userauthentication.OTPDelivery;
import org.thothlab.devilsvault.dao.userauthentication.OneTimePassword;
	
public class Encryption {

	public static void main(String[] args) throws IOException {
		
		String param="5~~~~even,5~~~~black,5~~~~red,5~~~~odd,5~~~~second18,undefined";
		 if(!param.isEmpty()){
			 param= param.replace(",undefined", "") ;
			 
			 String usersBetOnCycle[]=param.split(",");
			 for(String individualUserBetOnCycle :usersBetOnCycle){
				 
				 System.out.println(individualUserBetOnCycle);
				 
				 String amount=individualUserBetOnCycle.split("~~~~")[0]; 
				 String number=individualUserBetOnCycle.split("~~~~")[1]; 
				 System.out.println(amount); 
				 System.out.println("11111");
				 System.out.println(number); 
			 }
			 
		 }
		
	/*	}*/
		
		
		
		

/*
		Properties prop = new Properties();
		
		
		final String username = "amankhatri2008";
		final String password = "Vasket@123";
		String OTP = "";
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
         String email="amankhatri2008@gmail.com";
		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("securebanking.ss4@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
			message.setSubject("Please do not share this with anyone");
			
			MimeMultipart multipart = new MimeMultipart("related");
			BodyPart messageBodyPart = new MimeBodyPart();
	         
	         
	    	 // BuildMyString.com generated code. Please enjoy your string responsibly.

	     	String sb = "<div style='background-color:#f4f4f4'><div style='margin:0px auto;max-width:600px'>  								<table role='presentation' cellpadding='0' cellspacing='0' style='font-size:0px;width:100%' align='center' border='0'>  									<tbody>  										<tr>  											<td style='text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px 20px 0px'>  												  															<div class='m_2065104751704328863mj-column-per-100 m_2065104751704328863outlook-group-fix' style='vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%'>  																<table role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>  																	<tbody>  																		<tr>  																			<td style='word-wrap:break-word;font-size:0px;padding:0px 0px 0px 25px;padding-top:0px;padding-bottom:0px' align='left'>  																				<div style='color:#5e6977;font-family:Arial,sans-serif;font-size:11px;line-height:22px;text-align:left'>  																					<p style='margin:10px 0'></p>  																				</div>  																			</td>  																		</tr>  																	</tbody>  																</table>  															</div>  															  											</td>  										</tr>  									</tbody>  								</table>  							</div>  							  				  							<div style='margin:0px auto;max-width:600px;background:#00a0e3'>  								<table role='presentation' cellpadding='0' cellspacing='0' style='font-size:0px;width:100%;background:#00a0e3' align='center' border='0'>  									<tbody>  										<tr>  											<td style='text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;padding-bottom:0px;padding-top:0px'>  												  															<div class='m_2065104751704328863mj-column-per-100 m_2065104751704328863outlook-group-fix' style='vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%'>  																<table role='presentation' cellpadding='0' cellspacing='0' style='vertical-align:top' width='100%' border='0'>  																	<tbody>  																		<tr>  																			<td style='word-wrap:break-word;font-size:0px;padding:10px 25px' align='center'>  																				<table role='presentation' cellpadding='0' cellspacing='0' style='border-collapse:collapse;border-spacing:0px' align='center' border='0'>  																					<tbody>  																						<tr>  																							<td style='width:300px'>  																								<img alt='' title='' height='auto' src='https://ci3.googleusercontent.com/proxy/fW3115VI8Fi-6xxMvsRoIzFi6yd6yimpvtTZwiwtKnAipZmcMz1q2ff4Rn0OKxHr9gPbCSXwOtW1pUBJGKIEmrOGAA=s0-d-e1-ft#http://jxjl.mjt.lu/tplimg/jxjl/b/l6qr/5st.png' style='border:none;border-radius:0px;display:block;outline:none;text-decoration:none;width:100%;height:auto' width='300' class='CToWUd'>  																								</td>  																							</tr>  																						</tbody>  																					</table>  																				</td>  																			</tr>  																		</tbody>  																	</table>  																</div>  																  												</td>  											</tr>  										</tbody>  									</table>  								</div>  								  					  								<div style='margin:0px auto;max-width:600px;background:#ffffff'>  									<table role='presentation' cellpadding='0' cellspacing='0' style='font-size:0px;width:100%;background:#ffffff' align='center' border='0'>  										<tbody>  											<tr>  												<td style='text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px'>  													  																<div class='m_2065104751704328863mj-column-per-100 m_2065104751704328863outlook-group-fix' style='vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%'>  																	<table role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>  																		<tbody>  																			<tr>  																				<td style='word-wrap:break-word;font-size:0px;padding:20px 0px 0px 0px;padding-top:20px;padding-bottom:0px' align='center'>  																					<div style='color:#5e6977;font-family:Arial,sans-serif;font-size:13px;line-height:22px;text-align:center'>  																						  																						<p style='margin:10px 0'>  																							<span style='font-size:20px'>  																								<span style='font-family:Georgia,Helvetica,Arial,sans-serif'>  																									<span style='color:#222222'>Exciting plans are heading your way!</span>  																								</span>  																							</span>  																						</p>  																					</div>  																				</td>  																			</tr>  																			<tr>  																				<td style='word-wrap:break-word;font-size:0px;padding:15px 0px 15px 0px;padding-top:15px;padding-bottom:15px' align='center'>  																					<table role='presentation' cellpadding='0' cellspacing='0' style='border-collapse:collapse;border-spacing:0px' align='center' border='0'>  																						<tbody>  																							<tr>  																								<td style='width:125px'>  																									<img alt='' title='' height='auto' src='https://ci6.googleusercontent.com/proxy/j-tYhaFluI85PMZuXavT0DQ7_D3m7U5kVRZ237WLx3YLwNA2JzSUZFpiFLZMhd6wXplGJJpIFhL5ZManwqT6_E1k=s0-d-e1-ft#http://jxjl.mjt.lu/tplimg/jxjl/b/l6qr/ry.png' style='border:none;border-radius:0px;display:block;outline:none;text-decoration:none;width:100%;height:auto' width='125' class='CToWUd'>  																									</td>  																								</tr>  																							</tbody>  																						</table>  																					</td>  																				</tr>  																				<tr>  																					<td style='word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;padding-top:0px;padding-bottom:0px' align='center'>  																						<div style='color:#5e6977;font-family:Arial,sans-serif;font-size:13px;line-height:22px;text-align:center'>  																							  																							<p style='margin:10px 0'>  																								<span style='font-family:Georgia,Helvetica,Arial,sans-serif'>  																									<span style='color:#514d6a;font-size:14px'>This is to inform you that, your account with 1-<span class='il'>HASH</span> has been created successfully. Immediately fill the activation</span>  																									<span style='color:#514d6a;font-size:14px'> code </span>  																									<span style='font-family:Arial,sans-serif'>  																										<span style='font-size:15px'>  																											<b style='color:#514d6a;font-family:arial,sans-serif;font-size:14px'>105010</b>  																										</span>  																									</span>  																									<span style='color:#514d6a;font-size:14px'> to </span>  																									<span style='color:#514d6a;font-size:14px'>activate your account.</span>  																								</span>  																							</p>  																						</div>  																					</td>  																				</tr>  																				<tr>  																					<td style='word-wrap:break-word;font-size:0px;padding:0px 0px 0px 0px;padding-top:0px;padding-bottom:0px' align='center'>  																						<div style='color:#5e6977;font-family:Arial,sans-serif;font-size:13px;line-height:22px;text-align:center'>  																							  																							<p style='margin:10px 0'>  																								<span style='font-family:Georgia,Helvetica,Arial,sans-serif'>  																									<span style='color:#514d6a;font-size:14px'>After you enter the code, you will automatically be taken to the member area page. Please click 'Deposit' menu and make deposit at least 0.005 BTC, so that your MATRIX queue position is not passed by other members.</span>  																								</span>  																							</p>  																						</div>  																					</td>  																				</tr>  																				<tr>  																					<td style='word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:10px;padding-bottom:10px'>  																						<p style='font-size:1px;margin:0px auto;border-top:1px dotted #c2c2c2;width:100%'></p>  																						  																					</td>  																				</tr>  																			</tbody>  																		</table>  																	</div>  																	  													</td>  												</tr>  											</tbody>  										</table>  									</div>  									  						  									<div style='margin:0px auto;max-width:600px;background:#ffffff'>  										<table role='presentation' cellpadding='0' cellspacing='0' style='font-size:0px;width:100%;background:#ffffff' align='center' border='0'>  											<tbody>  												<tr>  													<td style='text-align:center;vertical-align:middle;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;padding-bottom:0px;padding-top:0px'>  														  																	<div class='m_2065104751704328863mj-column-per-100 m_2065104751704328863outlook-group-fix' style='vertical-align:middle;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%'>  																		<table role='presentation' cellpadding='0' cellspacing='0' style='vertical-align:middle' width='100%' border='0'>  																			<tbody></tbody>  																		</table>  																	</div>  																	  													</td>  												</tr>  											</tbody>  										</table>  									</div>  									  						  									<div style='margin:0px auto;max-width:600px'>  										<table role='presentation' cellpadding='0' cellspacing='0' style='font-size:0px;width:100%' align='center' border='0'>  											<tbody>  												<tr>  													<td style='text-align:center;vertical-align:middle;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;padding-bottom:0px;padding-top:0px'>  														  																	<div class='m_2065104751704328863mj-column-per-100 m_2065104751704328863outlook-group-fix' style='vertical-align:middle;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%'>  																		<table role='presentation' cellpadding='0' cellspacing='0' style='vertical-align:middle' width='100%' border='0'>  																			<tbody></tbody>  																		</table>  																	</div>  																	  													</td>  												</tr>  											</tbody>  										</table>  									</div>  									  					</div>";
	     		

	     	
	         messageBodyPart.setContent(sb, "text/html");
	         // add it
	         multipart.addBodyPart(messageBodyPart);
	         
	         
	      // second part (the image)
	         messageBodyPart = new MimeBodyPart();
	         DataSource fds = new FileDataSource(
	            "/home/manisha/javamail-mini-logo.png");

	         messageBodyPart.setDataHandler(new DataHandler(fds));
	         
	         
	         messageBodyPart.setHeader("Content-ID", "<image>");

	         // add image to the multipart
	         multipart.addBodyPart(messageBodyPart);

	         // put everything together
	         message.setContent(multipart);
			{
				OTP = OneTimePassword.getOTP();
				//message.setText("Your One Time Password is " + OTP);
			}
			Transport.send(message);

			System.out.println("Don1111111e");

		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
		
	*/
		
		
		
	}
	public static void saveImage(String imageUrl, String destinationFile) throws IOException {
		URL url = new URL(imageUrl);
		InputStream is = url.openStream();
		OutputStream os = new FileOutputStream(destinationFile);

		byte[] b = new byte[2048];
		int length;

		while ((length = is.read(b)) != -1) {
			os.write(b, 0, length);
		}

		is.close();
		os.close();
	}

}
