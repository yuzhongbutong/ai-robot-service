package com.ai.robot.common;

import javax.websocket.server.ServerEndpointConfig.Configurator;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class RobotEndpointConfigure extends Configurator implements ApplicationContextAware {

	private static volatile BeanFactory context;

	@Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		RobotEndpointConfigure.context = context;
	}

	@Override
	public <T> T getEndpointInstance(Class<T> clazz) throws InstantiationException {
		return context.getBean(clazz);
	}
}
