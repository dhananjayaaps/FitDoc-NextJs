import React from "react";
import Post from "./components/post";
import NavBar from "./components/navbar";
import TweetComposer from "./components/TweetComposer";

export default function App() {
  return (
    <div>
      <NavBar />
      <TweetComposer />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
