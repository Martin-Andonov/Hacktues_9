import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class InteractiveTestPage extends StatefulWidget {
  static const String route = 'interactive_test_page';

  const InteractiveTestPage({Key? key}) : super(key: key);

  @override
  State createState() {
    return _InteractiveTestPageState();
  }
}

class _InteractiveTestPageState extends State<InteractiveTestPage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: SizedBox(
            width: 600,
            height: 1000,
            child: FlutterMap(
              options: MapOptions(
                center: LatLng(42.655360, 23.355407),
                zoom: 13,
              ),
              children: [
                TileLayer(
                  urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                  userAgentPackageName: 'dev.fleaflet.flutter_map.example',
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
