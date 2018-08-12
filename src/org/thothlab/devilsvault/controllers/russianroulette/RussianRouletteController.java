package org.thothlab.devilsvault.controllers.russianroulette;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.thothlab.devilsvault.controllers.security.Encryption;
import org.thothlab.devilsvault.controllers.security.ExceptionHandlerClass;

import org.thothlab.devilsvault.dao.customer.CustomerDAO;

import org.thothlab.devilsvault.dao.userauthentication.UserAuthenticationDaoImpl;

import org.thothlab.devilsvault.db.model.Customer;
import org.thothlab.devilsvault.db.model.RussianRouletNumberHistory;
import org.thothlab.devilsvault.db.model.RussianRouletteBetUser;
import org.thothlab.devilsvault.db.model.RussianRouletteBetUserList;
import org.thothlab.devilsvault.db.model.UserBtcAddressDeposit;
import org.thothlab.devilsvault.util.Util;

import com.fasterxml.jackson.annotation.JsonView;


@Controller
public class RussianRouletteController {
	
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
	
	@RequestMapping("/customer/RussianRoulette")
	public ModelAndView customerHome(HttpServletRequest request){
		try{
		
		
			ModelAndView model = new ModelAndView("index");
			
			//get User BTC Balance
			ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
			CustomerDAO externalDao = ctx.getBean("customerDAO", CustomerDAO.class);
			setGlobals(request);
			UserBtcAddressDeposit btcInfo= externalDao.getCustomerBTCInfo(username);
			model.addObject("btcInfo",btcInfo);
			
			
			
			// get User Play History
			
			List<RussianRouletteBetUser> russianRouletteBetUser=externalDao.getCustomerRussianRouletteHistorty(username,Util.TOP_RESULT);
			model.addObject("russianRouletteBetUser",russianRouletteBetUser);
			
			//get Last results
			
			
			List<RussianRouletNumberHistory> russianRouletNumberHistory=externalDao.getRussianRouletNumberHistory(username,Util.TOP_RESULT_ROULETTE_NUMBER_HIS);
			model.addObject("russianRouletNumberHistory",russianRouletNumberHistory);
			
			
			
			model.addObject("Customer",null);
			ctx.close();
			return model;
		}catch(Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
		}
	
	
	@RequestMapping(value ="/customer/RussianRouletteGETBalance", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	 String RussianRouletteGETBalance(HttpServletRequest request){
		try{
			ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
			CustomerDAO externalDao = ctx.getBean("customerDAO", CustomerDAO.class);
			setGlobals(request);
			UserBtcAddressDeposit btcInfo= externalDao.getCustomerBTCInfo(username);
			
			return btcInfo.getCurrentValue().toString();
		}catch(Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
		}
	
	@RequestMapping(value ="/customer/RussianRouletteSaveBetUser", method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	 String RussianRouletteSaveBetUser(HttpServletRequest request,@RequestParam("param") String param){
		try{
			
			ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
			CustomerDAO externalDao = ctx.getBean("customerDAO", CustomerDAO.class);
			setGlobals(request);
			UserBtcAddressDeposit btcInfo= externalDao.getCustomerBTCInfo(username);
			
			 Map<String, String> formInputs = new HashMap<String, String>();

			 List<RussianRouletteBetUser> bettingObj;
			 System.out.println("here"); 
			
			 System.out.println( param);
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
				 
				 
			 }else{
				 System.out.println("No Bet Placed"); 
			 }
			 
			
		        
		        
			return btcInfo.getCurrentValue().toString();
		}catch(Exception e){
			e.printStackTrace();
			throw new ExceptionHandlerClass(); 
		}
		}
	
	
	
	
}
