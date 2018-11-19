package com.ai.robot.common;

import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.eclipse.paho.client.mqttv3.MqttSecurityException;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.stereotype.Component;

import com.ai.robot.entity.ApplicationConfig;

@Component
public class MqttPushClient {

	private static MqttClient client;

	public MqttClient getClient() {
		return client;
	}

	public static void setClient(MqttClient client) {
		MqttPushClient.client = client;
	}

	public void connect(ApplicationConfig config) throws MqttSecurityException, MqttException {
		MqttClient client = new MqttClient(config.getHost(), RobotConstant.MQTT_CLIENT_ID, new MemoryPersistence());
		MqttConnectOptions options = new MqttConnectOptions();
		options.setCleanSession(false);
		options.setUserName(config.getUsername());
		options.setPassword(config.getPassword().toCharArray());
		options.setConnectionTimeout(1000);
		options.setKeepAliveInterval(2000);
		setClient(client);
		client.connect(options);
		client.subscribe(RobotConstant.MQTT_TOPIC_HT);
	}

	public void publish(String strTopic, String pushMessage) throws MqttPersistenceException, MqttException {
		publish(RobotConstant.MQTT_DEFAULT_QOS, false, strTopic, pushMessage);
	}

	public void publish(int qos, boolean retained, String strTopic, String pushMessage)
			throws MqttPersistenceException, MqttException {
		MqttMessage message = new MqttMessage();
		message.setQos(qos);
		message.setRetained(retained);
		message.setPayload(pushMessage.getBytes());
		MqttTopic topic = client.getTopic(strTopic);
		MqttDeliveryToken token = topic.publish(message);
		token.waitForCompletion();
	}

	public void subscribe(String strTopic, MqttCallback callback) throws MqttException {
		subscribe(strTopic, RobotConstant.MQTT_DEFAULT_QOS, callback);
	}

	public void subscribe(String strTopic, int qos, MqttCallback callback) throws MqttException {
		client.setCallback(callback);
		client.subscribe(strTopic, qos);
	}
}
