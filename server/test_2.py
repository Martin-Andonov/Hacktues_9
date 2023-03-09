import socket
import os
import subprocess

s = socket.socket()
host = '127.0.0.1'
port = 9999

s.connect((host, port))

while True:
    data = s.recv(1024)

    if len(data) > 0:
        s.send(str.encode(' '))
    else:
        break
    print("kur")