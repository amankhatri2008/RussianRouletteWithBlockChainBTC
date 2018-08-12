package org.thothlab.devilsvault.controllers.employee;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.thothlab.devilsvault.controllers.security.Encryption;
import org.thothlab.devilsvault.controllers.security.ExceptionHandlerClass;
import org.thothlab.devilsvault.dao.employee.InternalUserDaoImpl;
import org.thothlab.devilsvault.dao.employee.Validator;
import org.thothlab.devilsvault.dao.log.LogDaoImpl;
import org.thothlab.devilsvault.dao.userauthentication.OtpDaoImpl;
import org.thothlab.devilsvault.dao.userauthentication.UserAuthenticationDaoImpl;
import org.thothlab.devilsvault.db.model.DatabaseLog;

import org.thothlab.devilsvault.db.model.InternalUserRegister;
import org.thothlab.devilsvault.db.model.UserAuthentication;

import info.blockchain.api.wallet.Wallet;
import info.blockchain.api.wallet.entity.Address;
import info.blockchain.api.wallet.entity.CreateWalletResponse;

@Controller
public class SignUpController {
	
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
		
	@RequestMapping(value="SignUpNewUser")
	public ModelAndView ForgotPassword(HttpServletRequest request, @RequestParam("referUser") String referUser) {
		try{
        ModelAndView model = new ModelAndView("SignUpNewUser");
       
        if(!referUser.isEmpty()){
        	 model.addObject("referUser", referUser);
        }else{
        	 model.addObject("referUser", "1");
        }
        
        return model;
		}catch (Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
	}
	
	
	
	@RequestMapping(value="verifyemailAjax", method = RequestMethod.GET)
	public boolean VerifyEmailAjax(HttpServletRequest request, @RequestParam("Email") String email) {
		try{
			ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
	        UserAuthenticationDaoImpl userauthenticationdaoimpl = ctx.getBean("userAuthenticationDao", UserAuthenticationDaoImpl.class);
	        if(userauthenticationdaoimpl.validateuserDetails(email,"internal_user")){
	        	return true;
	        }
		}catch(Exception e){
			e.printStackTrace();
			
		}
		return false;
	}
	
	@RequestMapping(value="/internalregister", method = RequestMethod.POST)
    public ModelAndView registerInternal(@ModelAttribute("user1") InternalUserRegister newuser,RedirectAttributes redir ) {
		try{
		
	
        
        
        String fname = newuser.getFname();
        String Lname = newuser.getLname();
        String name = fname+" "+Lname;
        newuser.setName(name);
        
		String username = newuser.getEmail();
		
		
        
        HashMap<String,String> passwords = new HashMap<String,String>();
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
        UserAuthenticationDaoImpl userauthenticationdaoimpl = ctx.getBean("userAuthenticationDao", UserAuthenticationDaoImpl.class);
        InternalUserDaoImpl internaluserDao = ctx.getBean("EmployeeDAOForInternal",InternalUserDaoImpl.class);
	
        	
        if(userauthenticationdaoimpl.validateuserDetails(username,"internal_user"))
        {
        	passwords = userauthenticationdaoimpl.randomPasswordGenerator();
        	if(passwords != null)
        	{
        		UserAuthentication userdetails = userauthenticationdaoimpl.setNewUsers(username, passwords.get("hashedPassword"), "INTERNAL_USER");
        		userauthenticationdaoimpl.save(userdetails);
        	
        		
        		internaluserDao.save(newuser);
        	}
        	userauthenticationdaoimpl.sendEmailToUser(newuser.getEmail(), passwords.get("rawPassword"));
        	ClassPathXmlApplicationContext ctx_log = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
            LogDaoImpl logDao = ctx_log.getBean("DatabaseLogDao", LogDaoImpl.class);
            DatabaseLog dblog = new DatabaseLog();

            dblog.setActivity("Internal Registration for " + username);
    	                    dblog.setDetails("Registration Successful");
    	                    dblog.setUserid(userID);
    	                    //logDao.save(dblog, "internal_log");
        	redir.addFlashAttribute("error_msg","Registration successful. Password sent to " + newuser.getEmail());
        }else
        {
        	
            LogDaoImpl logDao = ctx.getBean("DatabaseLogDao", LogDaoImpl.class);
            DatabaseLog dblog = new DatabaseLog();

            dblog.setActivity("Internal Registration for " + username);
    	                    dblog.setDetails("Registration Failed as Email or phone number already exists");
    	                    dblog.setUserid(userID);
    	                    //logDao.save(dblog, "internal_log");
        	redir.addFlashAttribute("error_msg","Email or phone number already exists. Please use different credentials and register again");
        }
        
	
        ModelAndView model = new ModelAndView("customerPages/UserRegisteredSuccessFull");
        model.addObject("message", "User is Successfully Registered please check your mail for login instructions");
  	    ctx.close();
	    return model;
		}catch (Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
    }
	
	
	
	
}