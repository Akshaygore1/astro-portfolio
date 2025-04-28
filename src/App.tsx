import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import { Metadata } from "./components/Metadata";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blogs";
import { Projects } from "./pages/Projects";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Metadata />
          <div className="min-h-screen p-4 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
            <Navbar />
            <main className="pt-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
