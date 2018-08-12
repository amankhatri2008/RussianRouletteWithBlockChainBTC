package org.thothlab.devilsvault.controllers.employee;

import java.math.BigInteger;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.thothlab.devilsvault.controllers.security.Encryption;
import org.thothlab.devilsvault.controllers.security.ExceptionHandlerClass;

import org.thothlab.devilsvault.dao.employee.InternalUserDaoImpl;
import org.thothlab.devilsvault.dao.employee.Validator;
import org.thothlab.devilsvault.dao.log.LogDaoImpl;
import org.thothlab.devilsvault.dao.userauthentication.UserAuthenticationDaoImpl;
import org.thothlab.devilsvault.db.model.Customer;
import org.thothlab.devilsvault.db.model.DatabaseLog;

import org.thothlab.devilsvault.db.model.InternalUserRegister;
import org.thothlab.devilsvault.db.model.UserAuthentication;

@Controller
public class Registration {
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
	

	
	
	@RequestMapping(value="/employee/externalregistrationform", method = RequestMethod.POST)
    public ModelAndView registerExternalForm() {
		try{
		ModelAndView model = new ModelAndView("employeePages/registrationExternal");
	    return model;
		}catch (Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
    }
	
	@RequestMapping(value="/employee/internalregistrationform", method = RequestMethod.POST)
    public ModelAndView registerInternalForm() {
		try{
		ModelAndView model = new ModelAndView("employeePages/registrationInternal");
	    return model;
		}catch (Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
    }
}