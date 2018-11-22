import paho.mqtt.client as mqtt
import time

client_id = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
client = mqtt.Client(client_id)
client.username_pw_set("admin", "password")
HOST = "127.0.0.1"
client.connect(HOST, 61613, 60)
client.loop_start()
time.sleep(1)  # 这1s很重要
rec = client.publish("Topic/Status", "Open", 2)
print(rec)
