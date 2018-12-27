package com.ai.robot.service.impl;

import org.springframework.stereotype.Service;

import com.ai.robot.service.WalkService;

@Service
public class WalkServiceImpl implements WalkService {

	@Override
	public boolean forward() {
		return false;
	}

	@Override
	public boolean backward() {
		return false;
	}

	@Override
	public boolean leftward() {
		return false;
	}

	@Override
	public boolean rightward() {
		return false;
	}

	@Override
	public boolean stop() {
		return false;
	}

}
