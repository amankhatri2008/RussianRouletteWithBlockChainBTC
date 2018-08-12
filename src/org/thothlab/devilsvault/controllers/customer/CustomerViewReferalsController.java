package org.thothlab.devilsvault.controllers.customer;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.thothlab.devilsvault.controllers.security.Encryption;
import org.thothlab.devilsvault.controllers.security.ExceptionHandlerClass;

import org.thothlab.devilsvault.dao.customer.CustomerDAO;

import org.thothlab.devilsvault.dao.userauthentication.UserAuthenticationDaoImpl;

import org.thothlab.devilsvault.db.model.Customer;
import org.thothlab.devilsvault.db.model.UserBtcAddressDeposit;


@Controller
public class CustomerViewReferalsController {
	
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
	
	
	
	@RequestMapping("/customer/viewReferalBonus")
	public ModelAndView UserDetailsContoller(HttpServletRequest request){
		try{
			ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
			CustomerDAO externalDao = ctx.getBean("customerDAO", CustomerDAO.class);
			setGlobals(request);
			Customer customer = externalDao.getCustomer(userID);
			
		
			UserBtcAddressDeposit btcInfo= externalDao.getCustomerBTCInfo(username);
			
			ModelAndView model = new ModelAndView("customerPages/customerUserDetails");
			model.addObject("user",customer);
			model.addObject("btcInfo",btcInfo);
			
			
			ctx.close();
			return model;
		}catch(Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
		
	}
	
	
	
	
	
}
