import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./Pages/Home";
import Features from "./Pages/Features";
import ReadyToGetStarted from "./Pages/ReadyToGetStarted";
import { AnimatePresence } from "framer-motion";
import Login from "./Pages/Login";
import { ThemeProvider } from "./components/theme-provider";
import Signup from "./Pages/Signup";
import { ContextProvider } from "../store/ContextApi";
import { Toaster } from "react-hot-toast";
import CreateNote from "./Pages/notes/CreateNote";
import MyNotes from "./Pages/notes/MyNotes";

function App() {
  return (
    <ContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AnimatePresence mode="wait">
          <Router>
            <Nav />
            <Toaster position="bottom-center" reverseOrder={false} />
            <Routes>
              <Route
                path="/"
                element={[<Home />, <Features />, <ReadyToGetStarted />]}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create-note" element={<CreateNote />} />
              <Route path="/notes" element={<MyNotes />} />
              {/* <Route path="/features" element={<Features />} /> */}
            </Routes>
            <Footer />
          </Router>
        </AnimatePresence>
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
