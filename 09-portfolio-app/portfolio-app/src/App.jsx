import React from "react";
import "./App.css";

function App() {
  // Your project list
  const projects = [
    {
      id: 1,
      title: "React Calculator",
      description: "A calculator app built with React."
    },
    {
      id: 2,
      title: "Music Store App",
      description: "An interactive frontend for browsing music."
    },
    {
      id: 3,
      title: "Blog API",
      description: "A Node.js + SQLite backend API for blogs."
    }
  ];

  return (
    <div className="portfolio">
      <header>
        <h1>John Doe</h1>
        <p>Full Stack Developer | React | Node.js</p>
      </header>

      <section className="about">
        <h2>About Me</h2>
        <p>
          I am a passionate software developer with a love for building modern web applications.
        </p>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <ul>
          <li>💻 JavaScript / React</li>
          <li>⚙️ Node.js / Express</li>
          <li>🗄️ SQLite / MySQL</li>
          <li>🎨 HTML / CSS / Tailwind</li>
        </ul>
      </section>

      <section className="projects">
        <h2>Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </section>

      <footer>
        <h2>Contact</h2>
        <p>Email: john.doe@example.com</p>
        <p>
          GitHub: <a href="https://github.com/johndoe">github.com/johndoe</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
