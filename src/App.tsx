import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Blog } from "./pages/Blogs";
import { Projects } from "./pages/Projects";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen p-4 dark:bg-[#090A0B] dark:text-[#BBBBBB]">
          <Navbar />
          <main className="pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
