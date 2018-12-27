package com.ai.robot.controller;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ai.robot.common.MqttPushClient;
import com.ai.robot.common.RobotConstant;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;

@Component
public class SocketHandlerController {
	
	@Autowired
	private MqttPushClient mqttPushClient;

	private static List<SocketIOClient> clients = new ArrayList<SocketIOClient>();
	
	@OnConnect
	public void onConnect(SocketIOClient socketIOClient) throws MqttException {
		clients.add(socketIOClient);
		mqttPushClient.subscribe(RobotConstant.MQTT_TOPIC_HT, new MqttCallback() {
			
			@Override
			public void messageArrived(String topic, MqttMessage message) throws Exception {
				clients.removeIf(client -> !client.isChannelOpen());
				clients.forEach(client -> {
					client.sendEvent(RobotConstant.SOCKET_EVENT_HT, new String(message.getPayload()));
				});
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
	
	@OnDisconnect
	public void onDisconnect(SocketIOClient socketIOClient) {
		clients.remove(socketIOClient);
	}
	
	@OnEvent(value = RobotConstant.SOCKET_EVENT_CAR)
	public void onEvent(SocketIOClient socketIOClient, AckRequest ackRequest, String data) throws MqttPersistenceException, MqttException {
		mqttPushClient.publish(RobotConstant.MQTT_TOPIC_CAR, data);
	}
}
