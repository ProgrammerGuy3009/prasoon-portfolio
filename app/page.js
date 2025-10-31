"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BallCanvas from "./components/BallCanvas";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
// Import other sections as needed

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
      <BallCanvas isDarkMode={isDarkMode} />
      <main className={`relative z-10 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
    </div>
  );
}
