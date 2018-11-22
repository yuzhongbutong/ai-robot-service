#!/usr/bin/python

# import RPi.GPIO as gpio
import paho.mqtt.client as mqtt
import configparser
import time
import json

# from controller import car as car
# from controller import humiture
# from controller import buzzer
# from controller import ultrasonic

gpio_car = [18, 23, 20, 21, 24, 25, 12, 16]
gpio_dht11 = 4
gpio_buzzer = 17
gpio_hc = [27, 22, 5, 6]
mqtt_client_id = "rpi-client-1001"
mqtt_topic_car = "mqtt/car"
mqtt_topic_ht = "mqtt/ht"

mqtt_client = mqtt.Client(mqtt_client_id)
config = configparser.ConfigParser()


# my_car = car.Car(gpio_car)
# my_humiture = humiture.Humiture(gpio_dht11)
# my_buzzer = buzzer.Buzzer(gpio_buzzer)
# my_ultrasonic = ultrasonic.Ultrasonic(gpio_hc)


def connect():
    host = config.get("mqtt", "host")
    port = config.getint("mqtt", "port")
    username = config.get("mqtt", "username")
    password = config.get("mqtt", "password")
    mqtt_client.username_pw_set(username, password)
    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message
    mqtt_client.connect(host, port)
    time.sleep(1)
    mqtt_client.subscribe(mqtt_topic_car, 2)
    mqtt_client.loop_start()


def on_connect(client, user_data, flags, rc):
    print("Connected to server.")


def on_message(client, user_data, message):
    data = json.loads(message.payload.decode())
    if "car" in data:
        print(data["car"]["direction"])
        # my_car.moveCar(car_data["car"]["direction"], my_ultrasonic, my_buzzer)


def publish():
    while True:
        # ht_data = myHumiture.getDataOfTH()
        ht_data = {"temp": 28, "humi": 80};
        if ht_data is not None:
            mqtt_client.publish(mqtt_topic_ht, json.dumps(ht_data))
        time.sleep(5)
        pass
    # mqtt_client.loop_forever()


if __name__ == "__main__":
    try:
        config.read("config.cfg")
        connect()
        publish()
        # gpio.cleanup()
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        # gpio.cleanup()
