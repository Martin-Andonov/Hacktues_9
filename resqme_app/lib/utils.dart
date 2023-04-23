import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:io';

import 'package:location/location.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/io.dart';

const String serverLocation = 'wss://echo.websocket.events';
const int secondsToReconnect = 1;

class LocationWebSocket {
  WebSocketChannel _channel;
  final StreamController<String> _messageStreamController =
      StreamController<String>.broadcast();

  LocationWebSocket() : _channel = IOWebSocketChannel.connect(serverLocation) {
    _channel.stream.listen((event) {
      _messageStreamController.add(event);
    }, onDone: () {
      _reconnect();
    }, onError: (e) {
      debugPrint('WebSocket error: $e');
      _reconnect();
    });
  }

  Future<void> _checkLocationPermissions() async {
    final location = Location();

    // Check if location services are enabled
    bool serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) {
        throw Exception('Location services are not enabled');
      }
    }

    // Check if location permissions are granted
    PermissionStatus permissionGranted = await location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        throw Exception('Location permissions are not granted');
      }
    }
  }

  Future<String> sendLocationToServer(LocationData location) async {
    // Check location permissions before sending data
    await _checkLocationPermissions();

    while (true) {
      try {
        final completer = Completer<String>();
        _channel.sink.add(location.toString());
        _channel.stream.listen((event) {
          completer.complete(event);
        });
        return completer.future;
      } catch (e) {
        debugPrint('Error sending location to server: $e');
        await _reconnect();
      }
    }
  }

  Future<LocationData> getCurrentLocation() async {
    final location = Location();
    try {
      return await location.getLocation();
    } catch (e) {
      debugPrint('Error getting current location: $e');
      throw Exception('Failed to get location data');
    }
  }

  Future<void> _reconnect() async {
    while (_channel.closeCode != null) {
      try {
        debugPrint('WebSocket reconnecting...');
        await _channel.sink.close(WebSocketStatus.goingAway);
        await Future.delayed(const Duration(seconds: secondsToReconnect));
        _channel = IOWebSocketChannel.connect(serverLocation);
      } catch (e) {
        debugPrint('WebSocket reconnection error: $e');
        await Future.delayed(const Duration(seconds: secondsToReconnect));
      }
    }
  }

  void dispose() {
    _channel.sink.close();
    _messageStreamController.close();
  }
}

LocationWebSocket locationWebSocket = LocationWebSocket();
