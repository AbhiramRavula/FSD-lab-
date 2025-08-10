import React from "react";
import "./App.css";

const jobPosts = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Innovators",
    location: "New York, NY",
    type: "Full-time",
    description: "Build user-friendly interfaces with React and modern web technologies.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Data Solutions",
    location: "Remote",
    type: "Part-time",
    description: "Design robust APIs and manage data systems with Node.js and databases.",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Creative Minds",
    location: "San Francisco, CA",
    type: "Contract",
    description: "Work across the full stack to build scalable web apps.",
  },
];

function App() {
  return (
    <div className="job-listing-app">
      <header>
        <h1>Job Listings</h1>
        <p>Find your next opportunity</p>
      </header>

      <section className="jobs">
        {jobPosts.length === 0 ? (
          <p>No jobs available at the moment.</p>
        ) : (
          jobPosts.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <div className="job-meta">
                <span className="company">{job.company}</span>
                <span className="location">{job.location}</span>
                <span className="type">{job.type}</span>
              </div>
              <p className="description">{job.description}</p>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))
        )}
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Job Listing App</p>
      </footer>
    </div>
  );
}

export default App;
