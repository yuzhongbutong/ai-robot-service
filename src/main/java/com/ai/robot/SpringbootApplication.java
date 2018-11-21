package com.ai.robot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.SpringAnnotationScanner;

@SpringBootApplication
@Configuration
public class SpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootApplication.class, args);
	}

	@Bean
	public SocketIOServer socketIOServer() {
		com.corundumstudio.socketio.Configuration configuration = new com.corundumstudio.socketio.Configuration();
		configuration.setPort(8990);
		final SocketIOServer socketIOServer = new SocketIOServer(configuration);
		return socketIOServer;
	}

	@Bean
	public SpringAnnotationScanner springAnnotationScanner(SocketIOServer socketIOServer) {
		return new SpringAnnotationScanner(socketIOServer);
	}
}
