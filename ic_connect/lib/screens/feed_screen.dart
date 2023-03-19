import 'package:bottom_navy_bar/bottom_navy_bar.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:ic_connect/utils/constants.dart';

import '../models/feed_post.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({Key? key, required this.burl}) : super(key: key);
  final String burl;

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {

  List<FeedPost> feedPosts = [];

  int _currentIndex = 0;
  PageController? _pageController;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _pageController = PageController();
    String feedUrl = '${widget.burl}posts';
    Dio().get(feedUrl).then((value) {
      print(value.data);
      var posts = value.data.toList();
      for (var i in posts) {
        var post = FeedPost.fromJson(i);
        feedPosts.add(post);
        setState(() {});
      }
    });
  }

  @override
  void dispose() {
    _pageController!.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() => _currentIndex = index);
        },
        children: [
          Scaffold(
            backgroundColor: const Color(0xFFD4F7FE),
            appBar: AppBar(
              elevation: 0,
              title: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Hey Praveen!',
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.w500,
                      color: Colors.black,
                    ),
                  ),
                  Text(
                    'Here are the top opportunities for you today',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: Color(0xFF1BC1D3),
                    ),
                  ),
                ],
              ),
              backgroundColor: Color(0xFFD4F7FE),
            ),
            body: Center(
              child: ListView.separated(
                separatorBuilder: (context, index) => const SizedBox(
                  height: 10,
                ),
                itemBuilder: (context, index) {
                  return Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        ListTile(
                          leading: feedPosts[index].type == "event"
                              ? Image.asset(
                                  "assets/event.png",
                                  fit: BoxFit.fitWidth,
                                )
                              : Image.asset(
                                  "assets/hiring.png",
                                  fit: BoxFit.fitWidth,
                                ),
                          title: Text(feedPosts[index].title),
                          subtitle: Text(feedPosts[index].author),
                          tileColor: const Color(0xFF7AD7EB),
                        ),
                        ListTile(
                          subtitle: Text(feedPosts[index].body),
                          tileColor: Colors.white,
                        ),
                      ],
                    ),
                  );
                },
                itemCount: feedPosts.length,
              ),
            ),
          )
        ],
      ),
      bottomNavigationBar: BottomNavyBar(
        selectedIndex: _currentIndex,
        showElevation: true, // use this to remove appBar's elevation
        onItemSelected: (index) => setState(() {
          _currentIndex = index;
          _pageController!.animateToPage(index,
              duration: const Duration(milliseconds: 300), curve: Curves.ease);
        }),
        items: [
          BottomNavyBarItem(
            icon: Icon(Icons.house_outlined),
            title: Text('Home'),
            activeColor: Colors.blue,
          ),
          BottomNavyBarItem(
            icon: Icon(Icons.explore),
            title: Text('Explore'),
            activeColor: Colors.blue,
          ),
          BottomNavyBarItem(
            icon: Icon(Icons.message),
            title: Text('Pitches'),
            activeColor: Colors.blue,
          ),
          BottomNavyBarItem(
            icon: Icon(Icons.dashboard),
            title: Text('Dashboard'),
            activeColor: Colors.blue,
          ),
        ],
      ),
    );
  }
}
