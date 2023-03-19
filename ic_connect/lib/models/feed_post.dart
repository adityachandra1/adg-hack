// To parse this JSON data, do
//
//     final feedPost = feedPostFromJson(jsonString);
import 'dart:convert';

List<FeedPost> feedPostFromJson(String str) => List<FeedPost>.from(json.decode(str).map((x) => FeedPost.fromJson(x)));

String feedPostToJson(List<FeedPost> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class FeedPost {
  FeedPost({
    required this.tags,
    required this.likes,
    required this.id,
    required this.title,
    required this.body,
    required this.type,
    required this.author,
    required this.v,
  });

  final List<String> tags;
  final int likes;
  final String id;
  final String title;
  final String body;
  final String type;
  final String author;
  final int v;

  factory FeedPost.fromJson(Map<String, dynamic> json) => FeedPost(
    tags: List<String>.from(json["tags"].map((x) => x)),
    likes: json["likes"],
    id: json["_id"],
    title: json["title"],
    body: json["body"],
    type: json["type"],
    author: json["author"],
    v: json["__v"],
  );

  Map<String, dynamic> toJson() => {
    "tags": List<dynamic>.from(tags.map((x) => x)),
    "likes": likes,
    "_id": id,
    "title": title,
    "body": body,
    "type": type,
    "author": author,
    "__v": v,
  };
}
