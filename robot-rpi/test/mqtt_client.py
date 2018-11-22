import paho.mqtt.client as mqtt
import time


def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))


def on_message(client, userdata, msg):
    print("Topic: ", msg.topic, "Payload: ", msg.payload.decode())


client_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
client = mqtt.Client(client_id)
client.username_pw_set("admin", "password")
client.on_connect = on_connect
client.on_message = on_message
HOST = "127.0.0.1"
client.connect(HOST, 61613, 60)
time.sleep(1)  # 这1s很重要
client.subscribe("Topic/Status", 2)
client.loop_forever()
