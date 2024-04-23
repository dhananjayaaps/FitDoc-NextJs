"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./components/post";
import NavBar from "./components/navbar";
import TweetComposer from "./components/TweetComposer";
import AllPosts from "./components/AllPosts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/authenticated', { withCredentials: true });
        if (response.data === "ok") {
          console.log("ok");
          setAuthenticated(true);
          setLoading(false);
        } else {
          window.location.href = 'http://localhost:3000/Login';
        }
      } catch (error) {
        window.location.href = 'http://localhost:3000/Login';
      } finally {
      }
    }

    fetchData();
  }, []);

  // Render loading state if still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the app once authenticated
  return (
    <div>
      <NavBar />
      <TweetComposer />
      <AllPosts />
      <ToastContainer />
    </div>
  );
}
