import 'package:flutter/material.dart';

import "interactive_map.dart";

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: const ButtonPage(),
    );
  }
}

class ButtonPage extends StatefulWidget {
  const ButtonPage({super.key});

  @override
  State<ButtonPage> createState() => _ButtonPageState();
}

class _ButtonPageState extends State<ButtonPage> {
  int currentPage = 0;

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text("ResQMe"),
          bottom: const TabBar(
            tabs: [
              Tab(
                // text: "Help",
                icon: Icon(Icons.home),
              ),
              Tab(
                // text: "Map",
                icon: Icon(Icons.map_outlined),
              ),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            Center(
              child: SizedBox(
                width: 200,
                height: 100,
                child: FloatingActionButton(
                  onPressed: () {
                    debugPrint("test @");
                  },
                  shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadiusDirectional.all(Radius.zero)),
                  backgroundColor: const Color.fromARGB(255, 255, 0, 0),
                  child: const Text("Help!"),
                ),
              ),
            ),
            const Center(
              child: InteractiveTestPage(),
            )
          ],
        ),
      ),
    );
  }
}

// Location location = new Location();
// https://pub.dev/documentation/location/latest/