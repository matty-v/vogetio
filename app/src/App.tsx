import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';

import './App.css';
import { BlogAdmin } from './BlogAdmin';
import { Home } from './Home';
import { Login } from './Login';
import { PostEditor } from './PostEditor';
import { TopNav } from './TopNav';
import { PostReader } from './PostReader';

export function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark'
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <TopNav />
        <main className="mdc-top-app-bar--fixed-adjust">
          <div className="App">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/post" element={<PostReader/>}/>
                <Route path="/admin-login" element={<Login/>}/>
                <Route path="/blog-admin" element={<BlogAdmin/>}/>
                <Route path="/post-editor" element={<PostEditor/>}/>
              </Routes>
            </div>
          </div>
        </main>
      </Router>
    </ThemeProvider>
  )
}
