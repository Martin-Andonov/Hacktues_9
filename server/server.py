import socket
import threading

def multi_threaded_client(connection):
    connection.send(str.encode('Server is working:'))
    while True:
        data = connection.recv(2048)
        response = 'Server message: ' + data.decode('utf-8')
        if not data:
            break
        connection.sendall(str.encode(response))
    connection.close()

def launchServer():

    TCP_IP = '127.0.0.1'
    TCP_PORT = 7005
    ThreadCount = 0

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    try:
        s.bind((TCP_IP, TCP_PORT))
    except socket.error as e:
        print(str(e))

    s.listen(1)

    while True:
        Client, address = s.accept()
        print('Connected to: ' + address[0] + ':' + str(address[1]))
        #start_new_thread(multi_threaded_client, (Client,))
        ThreadCount += 1
        print('Thread Number: ' + str(ThreadCount))
    ServerSideSocket.close()


if __name__ == "__main__":

    t = threading.Thread(target=(launchServer()))
    t.daemon = True
    t.start()