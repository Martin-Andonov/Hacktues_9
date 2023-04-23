import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:io';

import 'package:location/location.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/io.dart';

const String serverLocation = 'wss://echo.websocket.events';

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

  Future<String> sendLocation(LocationData location) async {
    while (_channel.closeCode == null) {
      try {
        _channel.sink.add(location.toString());
        final message = await _messageStreamController.stream.first;
        return message;
      } catch (e) {
        debugPrint('Error sending location to server: $e');
        await Future.delayed(const Duration(seconds: 1));
      }
    }
    throw Exception('WebSocket closed');
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

  void _reconnect() async {
    while (_channel.closeCode != null) {
      try {
        debugPrint('WebSocket reconnecting...');
        await _channel.sink.close(WebSocketStatus.goingAway);
        await Future.delayed(const Duration(seconds: 1));
        _channel = IOWebSocketChannel.connect(serverLocation);
      } catch (e) {
        debugPrint('WebSocket reconnection error: $e');
        await Future.delayed(const Duration(seconds: 1));
      }
    }
  }

  void dispose() {
    _channel.sink.close();
    _messageStreamController.close();
  }
}

LocationWebSocket locationWebSocket = LocationWebSocket();
