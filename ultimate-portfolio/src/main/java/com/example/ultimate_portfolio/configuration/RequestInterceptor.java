package com.example.ultimate_portfolio.configuration;

import java.time.Instant;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.example.ultimate_portfolio.util.WindowCounter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RequestInterceptor implements HandlerInterceptor {

	ConcurrentHashMap<String, WindowCounter> ratelimtDairy = new ConcurrentHashMap<>();

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		try {
			if(Objects.nonNull(ratelimtDairy.get(request.getRemoteAddr()))){
				WindowCounter currentWindow = ratelimtDairy.get(request.getRemoteAddr());
				boolean isExpired =
						Instant.now().isAfter(currentWindow.getWindowStartTime().plus(currentWindow.getWindowDuration()));
				int currentCount = currentWindow.getCurrentRequestCount().incrementAndGet();
				if(isExpired){
					WindowCounter counter = WindowCounter.setWindowCounter();
					ratelimtDairy.put(request.getRemoteAddr(),counter);
				}

				if (currentCount > currentWindow.getMaxRequestCount().get()){
					response.setStatus(429);
					response.getWriter().write("Too many requests. wait for some time");
					return false;
				}
			}else{
				WindowCounter counter = WindowCounter.setWindowCounter();
				ratelimtDairy.put(request.getRemoteAddr(),counter);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
