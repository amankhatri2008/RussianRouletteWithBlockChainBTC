package org.thothlab.devilsvault.dao.Schedular;


import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.thothlab.devilsvault.dao.customer.CustomerDAO;
import org.thothlab.devilsvault.dao.user.AdminActionDao;
import org.thothlab.devilsvault.dao.user.UserDetailsDao;

import info.blockchain.api.APIException;
import info.blockchain.api.wallet.Wallet;
import info.blockchain.api.wallet.entity.Address;

@Configuration
@EnableScheduling
public class DemoServiceBasicUsageFixedDelay
{
	
	AdminActionDao adminActionDao;
    
	@Scheduled(fixedDelay = 50000000,initialDelay = 3000000)
    public void demoServiceMethod()
    {
        System.out.println("Method executed at every 5 seconds. Current time is :: "+ new Date());
        
        
        
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring/config/BeanLocations.xml");
		CustomerDAO externalDao = ctx.getBean("customerDAO", CustomerDAO.class);
		
        
		Wallet walletObj = new Wallet("http://localhost:3000/", null,
				"221b320f-ae60-4530-b165-8ef7f491067d", "Basket@123");
		try {
			List<Address> allAddressInWallet= walletObj.listAddresses();
			for(Address address :allAddressInWallet ){
				try{
					System.out.println("Addeessssss::::::::"+address.getAddress());
				externalDao.updateDeposits(address);
				}catch(Exception e){
					adminActionDao.save(address.getAddress(),"Unable to Update Deposit","ADMIN");
				}
				
				
			}
			ctx.close();
		} catch (APIException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
        
        
        
    }
	@Bean
	public TaskScheduler taskScheduler() {
	    return new ConcurrentTaskScheduler(); //single threaded by default
	}
	public AdminActionDao getAdminActionDao() {
		return adminActionDao;
	}
	public void setAdminActionDao(AdminActionDao adminActionDao) {
		this.adminActionDao = adminActionDao;
	}
	
	
    
}