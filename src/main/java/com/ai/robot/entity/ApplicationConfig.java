package com.ai.robot.entity;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttSecurityException;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.ai.robot.common.MqttPushClient;

@Component
@ConfigurationProperties(prefix = "app-config.mqtt")
public class ApplicationConfig {

	private String host;
	private String username;
	private String password;

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Bean
	public MqttPushClient getMqttPushClient() throws MqttSecurityException, MqttException {
		MqttPushClient mqttPushClient = new MqttPushClient();
		mqttPushClient.connect(this);
		return mqttPushClient;
	}
}
