#!/usr/bin/python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import configparser
import time
import json
import random

MQTT_CLIENT_ID = "rpi-client-1001"
MQTT_TOPIC_CAR = "mqtt/car"
MQTT_TOPIC_HT = "mqtt/ht"

mqtt_client = mqtt.Client(MQTT_CLIENT_ID)
config = configparser.ConfigParser()


def connect():
    host = config.get('mqtt', 'host')
    port = config.getint('mqtt', 'port')
    username = config.get('mqtt', 'username')
    password = config.get('mqtt', 'password')
    mqtt_client.username_pw_set(username, password)
    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message
    mqtt_client.connect(host, port)
    time.sleep(1)
    mqtt_client.subscribe(MQTT_TOPIC_CAR, 2)
    mqtt_client.loop_start()


def on_connect(client, user_data, flags, rc):
    print("Connected to server.")


def on_message(client, user_data, message):
    data = json.loads(message.payload.decode())
    if 'car' in data:
        print(data['car']['direction'])


def publish():
    while True:
        ht_data = get_humiture()  # used for test.
#         ht_data = my_humiture.get_humiture()
        if ht_data is not None:
            mqtt_client.publish(MQTT_TOPIC_HT, json.dumps(ht_data))
        time.sleep(5)
        pass


def get_humiture():
    temperature = random.randint(15, 35)
    humidity = random.randint(35, 90)
    return {'temp': temperature, 'humi': humidity}


if __name__ == '__main__':
    try:
        config.read("config.cfg")
        connect()
        publish()
    except KeyboardInterrupt:
        print("KeyboardInterrupt!")
