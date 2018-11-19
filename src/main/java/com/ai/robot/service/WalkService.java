package com.ai.robot.service;

public interface WalkService {

	boolean forward();

	boolean backward();

	boolean leftward();

	boolean rightward();

	boolean stop();
}
