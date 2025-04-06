package com.example.ultimate_portfolio.util;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class WindowCounter {

	private AtomicInteger MaxRequestCount = new AtomicInteger(20);
	private AtomicInteger CurrentRequestCount;
	private Instant WindowStartTime;
	private Duration WindowDuration = Duration.ofMinutes(1);

	public static WindowCounter setWindowCounter(){
		WindowCounter counter = new WindowCounter();
		counter.setWindowStartTime(Instant.now());
		counter.setCurrentRequestCount(new AtomicInteger(1));
		return counter;
	}
}
