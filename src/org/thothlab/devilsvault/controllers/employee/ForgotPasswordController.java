package org.thothlab.devilsvault.controllers.employee;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.thothlab.devilsvault.controllers.security.ExceptionHandlerClass;
import org.thothlab.devilsvault.dao.log.LogDaoImpl;
import org.thothlab.devilsvault.dao.userauthentication.OtpDaoImpl;
import org.thothlab.devilsvault.dao.userauthentication.UserAuthenticationDaoImpl;
import org.thothlab.devilsvault.db.model.DatabaseLog;

import info.blockchain.api.wallet.Wallet;
import info.blockchain.api.wallet.entity.Address;
import info.blockchain.api.wallet.entity.CreateWalletResponse;

@Controller
public class ForgotPasswordController {
	
	String role;
	int userID;
	String username;
	
	public void setGlobals(HttpServletRequest request){
		role = (String) request.getSession().getAttribute("role");
		userID = Integer.parseInt((String) request.getSession().getAttribute("userID").toString());
		username = (String) request.getSession().getAttribute("username");
		
	}
	
	@ExceptionHandler(ExceptionHandlerClass.class)
    public String handleResourceNotFoundException() {
        return "redirect:/raiseexception";
    }
		
	@RequestMapping(value="forgotpassword")
	public ModelAndView ForgotPassword() {
		try{
        ModelAndView model = new ModelAndView("ForgotPassword");
       
        return model;
		}catch (Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
	}
	
	@RequestMapping(value="forgotpassword1")
	public ModelAndView ForgotPassword1() {
		try{
        ModelAndView model = new ModelAndView("ForgotPassword1");
        try{
        	 /* Wallet walletObj=new Wallet("http://localhost:3000/","24d7a6a8-9e44-47c0-a66e-098caec4f005","Basket@123",null);
        	  CreateWalletResponse response=walletObj.create("http://localhost:3000/", "Basket@123", "24d7a6a8-9e44-47c0-a66e-098caec4f005",null,"LABEL_11",null);
        	  
              model.addObject("balance", response.getAddress());*/
        	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        	HashMap<String, String> passwords = new HashMap<String, String>();
    		Random rand = new Random();
    		Long rawPassword = (long) (rand.nextInt(999999 - 100000) + 100000);
    		System.out.println("test");
    		String hashedPassword = passwordEncoder.encode(Long.toString(rawPassword));
    		passwords.put("rawPassword", Long.toString(rawPassword));
    		passwords.put("hashedPassword", hashedPassword);
    		model.addObject("rawPassword", Long.toString(rawPassword));
    		
    		model.addObject("hashedPassword", hashedPassword);
             
        }catch(Exception E){
        	E.printStackTrace();
        	
        }
        
        
        
   ;
        return model;
		}catch (Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
	}
	@RequestMapping(value="verifyemail", method = RequestMethod.POST)
	public ModelAndView VerifyEmail(HttpServletRequest request, @RequestParam("Email") String email) {
		try{
			ClassPathXmlApplicationContext  ctx= new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
			//ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
						
		OtpDaoImpl otpdao =ctx.getBean("OtpDaoImpl",OtpDaoImpl.class);
		System.out.println("i am herer: ");
		
		String message = otpdao.verifyEmail(email);
		System.out.println("i am herer:22222 ");
		if (message.equalsIgnoreCase("Cannot generate more OTP, Contact Support !!")){
			ModelAndView model = new ModelAndView("ForgotPassword");
			 model.addObject("message", message);
			 ctx.close();
	        return model;
		}else{
	        ModelAndView model = new ModelAndView("ForgotPasswordOTP");
	        request.getSession().removeAttribute("forgotpassemail");
	        request.getSession().setAttribute("forgotpassemail", email);
	        model.addObject("message", message);
	        ctx.close();
	        return model;
		}
		}catch (Exception e){
			System.out.println("Here is the Error::::");
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
	}
	
	@RequestMapping(value="verifyotp", method = RequestMethod.POST)
	public ModelAndView VerifyOTP(HttpServletRequest request, @RequestParam("otp") String otp) {
		try{
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
		OtpDaoImpl otpdao = ctx.getBean("OtpDaoImpl",OtpDaoImpl.class);
		String email = (String) request.getSession().getAttribute("forgotpassemail");
		String message = otpdao.verifyOTP(otp, email);
		if(message.equalsIgnoreCase("Incorrect OTP") || message.equalsIgnoreCase("Error in verifying OTP")){
			ModelAndView model = new ModelAndView("ForgotPasswordOTP");
			model.addObject("message", message);
			ctx.close();
			return model;
		}else{
			ModelAndView model = new ModelAndView("ChangePassword");
	        model.addObject("message", message);
	        ctx.close();
	        return model;
		}
		}catch (Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
        
	}
	
	@RequestMapping(value="/changepassword", method = RequestMethod.POST)
	   public ModelAndView changePasswordInternal(RedirectAttributes redir, HttpServletRequest request, @RequestParam("newpassword") String newPassword,@RequestParam("confirmpassword") String confirmPassword) {
	        try{
			String username = (String)request.getSession().getAttribute("forgotpassemail");
	        ModelAndView model = new ModelAndView();
	        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
	        UserAuthenticationDaoImpl userauthenticationDao = ctx.getBean("userAuthenticationDao", UserAuthenticationDaoImpl.class);
	        String message = userauthenticationDao.changeForgotPassword(newPassword, confirmPassword, username);
	        model.setViewName("redirect:/login");
	        LogDaoImpl logDao = ctx.getBean("DatabaseLogDao", LogDaoImpl.class);
            DatabaseLog dblog = new DatabaseLog();

            dblog.setActivity("Forgot password : " + username);
    	                    dblog.setDetails(message);
    	                    dblog.setUserid(userID);
    	                    //logDao.save(dblog, "internal_log");
	        redir.addFlashAttribute("exception_message",message);
	        ctx.close();
	        return model;
	        }catch (Exception e){
	        	e.printStackTrace();
				throw new ExceptionHandlerClass(); 
			}

	   }
}