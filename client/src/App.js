import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllPosts from "./components/AllPosts";
import NewPostForm from "./components/NewPostForm";
import OnePost from "./components/OnePost";
import EditPostForm from "./components/EditPostForm";

function App() {

  const [newPostToggle, setNewPostToggle] = useState(false);

  return (
    <BrowserRouter>
      <div className="App mx-auto w-75">
        <h2 className="mt-3 bg-secondary text-light p-3">My Posts</h2>

        <Routes>

          <Route path="/" element={<AllPosts newPostToggle={newPostToggle} />}>

          </Route>

          <Route path="/new" element={<NewPostForm newPostToggle={newPostToggle}
            setNewPostToggle={setNewPostToggle} />}>

          </Route>

          <Route path="/posts/:_id" element={<OnePost />}>
          </Route>

          <Route path="/edit/:_id" element={<EditPostForm />}>
          </Route>

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
