#!/usr/bin/python

import RPi.GPIO as gpio
import time
from threading import Timer

timer = None
cancel = True
direction = {
    "F": [gpio.LOW, gpio.HIGH, gpio.LOW, gpio.HIGH, gpio.LOW, gpio.HIGH, gpio.LOW, gpio.HIGH],
    "B": [gpio.HIGH, gpio.LOW, gpio.HIGH, gpio.LOW, gpio.HIGH, gpio.LOW, gpio.HIGH, gpio.LOW],
    "L": [gpio.HIGH, gpio.LOW, gpio.LOW, gpio.HIGH, gpio.HIGH, gpio.LOW, gpio.LOW, gpio.HIGH],
    "R": [gpio.LOW, gpio.HIGH, gpio.HIGH, gpio.LOW, gpio.LOW, gpio.HIGH, gpio.HIGH, gpio.LOW],
    "S": [gpio.LOW, gpio.LOW, gpio.LOW, gpio.LOW, gpio.LOW, gpio.LOW, gpio.LOW, gpio.LOW]
}


class Car:
    def __init__(self, gpio_car):
        self._gpio_car = gpio_car
        gpio.setmode(gpio.BCM)
        for pin in self._gpio_car:
            gpio.setup(pin, gpio.OUT)
            gpio.output(pin, gpio.LOW)

    def __setPin(self, data):
        for i in range(len(self._gpio_car)):
            gpio.output(self._gpio_car[i], direction[data][i])

    def __cancelTimer(self):
        global cancel
        cancel = True
        global timer
        if (timer is not None):
            timer.cancel()
            timer = None

    def __setAlert(self, myBuzzer, fun, args):
        distance = fun()
        # print(distance)
        once1 = True
        once2 = True
        if (distance < 0.2):
            self.__setPin("S")
            myBuzzer.cancelTimer()
            self.__cancelTimer()
            return
        elif (distance < 1.5):
            if (once1):
                once1 = False
                once2 = True
                myBuzzer.startTimer(0.1)
        else:
            if (once2):
                once1 = True
                once2 = False
                myBuzzer.cancelTimer()

        if (not cancel):
            global timer
            timer = Timer(0.2, self.__setAlert, (myBuzzer, fun, args))
            timer.start()

    def moveCar(self, data, myUltrasonic, myBuzzer):
        # print(data)
        self.__setPin(data)
        myBuzzer.cancelTimer()
        self.__cancelTimer()
        global cancel
        if (data == "F"):
            cancel = False
            self.__setAlert(myBuzzer, myUltrasonic.getFrontDistance, None)
        elif (data == "B"):
            cancel = False
            self.__setAlert(myBuzzer, myUltrasonic.getBackDistance, None)
