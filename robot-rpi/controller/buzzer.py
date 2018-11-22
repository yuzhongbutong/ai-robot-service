#!/usr/bin/python

import RPi.GPIO as gpio
import time
from threading import Timer

alert_interval = 0.1
timer = None
cancel = True


class Buzzer:

    def __init__(self, gpio_buzzer):
        self._gpio_buzzer = gpio_buzzer
        gpio.setmode(gpio.BCM)
        gpio.setup(self._gpio_buzzer, gpio.OUT)
        gpio.output(self._gpio_buzzer, gpio.LOW)

    def makeAlert(self, cycle=1, interval=0.2):
        if (timer is None):
            for i in range(cycle):
                gpio.output(self._gpio_buzzer, gpio.HIGH)
                time.sleep(alert_interval)
                gpio.output(self._gpio_buzzer, gpio.LOW)
                time.sleep(interval)

    def makeOnceAlert(self):
        if (timer is None):
            gpio.output(self._gpio_buzzer, gpio.HIGH)
            time.sleep(alert_interval)
            gpio.output(self._gpio_buzzer, gpio.LOW)

    def cancelTimer(self):
        global cancel
        cancel = True
        global timer
        if (timer is not None):
            timer.cancel()
            timer = None

    def startTimer(self, interval):
        self.cancelTimer()
        global cancel
        cancel = False
        self.__startAlert(interval)

    def __startAlert(self, interval):
        gpio.output(self._gpio_buzzer, gpio.HIGH)
        time.sleep(alert_interval)
        gpio.output(self._gpio_buzzer, gpio.LOW)
        if (not cancel):
            global timer
            timer = Timer(interval, self.__startAlert, (interval,))
            timer.start()
