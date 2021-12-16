import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import { BlogAdmin } from './BlogAdmin';
import { Home } from './Home';
import { Login } from './Login';
import { PostEditor } from './PostEditor';
import { TopNav } from './TopNav';

export function App() {

  return (
    <>
      <TopNav />
      <main className="mdc-top-app-bar--fixed-adjust">
        <div className="App">
          <div className="container">
            <Router>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/admin-login" element={<Login/>}/>
                <Route path="/blog-admin" element={<BlogAdmin/>}/>
                <Route path="/post-editor" element={<PostEditor/>}/>
              </Routes>
            </Router>
          </div>
        </div>
      </main>
    </>
  )
}
