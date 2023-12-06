import { ThemeProvider, createTheme } from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./Home";
import { PostReader } from "./PostReader";
import { TopNav } from "./TopNav";

export function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <TopNav />
        <main className="mdc-top-app-bar--fixed-adjust">
          <div className="App">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostReader />} />
              </Routes>
            </div>
          </div>
        </main>
      </HashRouter>
    </ThemeProvider>
  );
}
