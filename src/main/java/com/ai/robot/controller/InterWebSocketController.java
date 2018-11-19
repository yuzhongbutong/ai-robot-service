package com.ai.robot.controller;

import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ai.robot.common.MqttPushClient;
import com.ai.robot.common.RobotConstant;
import com.ai.robot.common.RobotEndpointConfigure;

@Component
@ServerEndpoint(value = "/ws", configurator = RobotEndpointConfigure.class)
public class InterWebSocketController {

	private static int onlineCount = 0;
	private static CopyOnWriteArraySet<InterWebSocketController> interWebSocketArraySet = new CopyOnWriteArraySet<InterWebSocketController>();
	
	@Autowired
	private MqttPushClient mqttPushClient;
	
	@OnOpen
	public void onOpen(Session session) throws MqttException {
		interWebSocketArraySet.add(this);
		addOnlineCount();
		System.out.println("New connection added!\nThe current number of people online is: " + getOnlineCount());
		mqttPushClient.subscribe(RobotConstant.MQTT_TOPIC_HT, new MqttCallback() {
			
			@Override
			public void messageArrived(String topic, MqttMessage message) throws Exception {
				session.getBasicRemote().sendText(new String(message.getPayload()));
			}
			
			@Override
			public void deliveryComplete(IMqttDeliveryToken token) {
				System.out.println("Delivery completed.");
			}
			
			@Override
			public void connectionLost(Throwable cause) {
				System.out.println("Connection lost.");
			}
		});;
	}
	
	@OnClose
	public void onClose() {
		interWebSocketArraySet.remove(this);
		subOnlineCount();
		System.out.println("One of the threads is closed!\nThe current number of people online is: " + getOnlineCount());
	}
	
	@OnError
	public void onError(Session session, Throwable error) {
		error.printStackTrace();
	}
	
	@OnMessage
	public void onMessage(String message, Session session) throws MqttPersistenceException, MqttException {
		mqttPushClient.publish(RobotConstant.MQTT_TOPIC_CAR, message);
	}
	
	private static synchronized void addOnlineCount() {
		onlineCount++;
	}
	
	private static synchronized void subOnlineCount() {
		onlineCount--;
	}
	
	private static synchronized int getOnlineCount() {
		return onlineCount;
	}
}
