package com.ai.robot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ai.robot.entity.BaseEntity;
import com.ai.robot.service.WalkService;

@RestController
@RequestMapping("raspberry/api")
public class RaspberryWalkController {
	
	@Autowired
	private WalkService walkService;

	@PostMapping("walk")
	@ResponseBody
	public ResponseEntity<BaseEntity> makeWalk(String param) {
		walkService.forward();
		BaseEntity entity = new BaseEntity();
		entity.setMessage("Success");
		return ResponseEntity.ok(entity);
	}
}
