import socket
import threading

def launchServer():

    TCP_IP = '127.0.0.1'
    TCP_PORT = 7005

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((TCP_IP, TCP_PORT))
    s.listen(1)

    print('waiting for connection')
    conn, addr = s.accept()

    print('Connection address:', addr)


if __name__ == "__main__":

    t = threading.Thread(target=(launchServer()))
    t.daemon = True
    t.start()