import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../App";
import "./Home.css"; 

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`home-page ${darkMode ? "dark-theme" : "light-theme"}`}>
      <Navbar />

      {/* Hero Section */}
      <section className={`hero-section ${darkMode ? "dark" : "light"}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Create Professional Resumes That Get You{" "}
                <span className="highlight">Hired</span>
              </h1>
              <p className="lead mb-4">
                AI-powered resume builder with ATS optimization, beautiful
                templates, and real-time feedback to land your dream job.
              </p>
              <div className="d-flex gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className={`btn btn-outline-${darkMode ? "light" : "dark"} btn-lg`}
                >
                  Try Demo
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="preview-card">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
                  alt="Resume Dashboard"
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`features-section ${darkMode ? "dark" : "light"}`}>
        <div className="container">
          <h2 className="section-title">Why Choose Our Resume Builder</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className={`feature-card ${darkMode ? "dark" : "light"}`}>
                  <div className="feature-icon">
                    <i className={`bi bi-${feature.icon}`}></i>
                  </div>
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className={`templates-section ${darkMode ? "dark" : "light"}`}>
        <div className="container">
          <h2 className="section-title">Professional Templates</h2>
          <div className="row g-4">
            {templates.map((template, index) => (
              <div key={index} className="col-md-4">
                <div className={`template-card ${darkMode ? "dark" : "light"}`}>
                  <div className="template-image-container">
                    <img
                      src={template.image}
                      alt={`${template.name} Resume Template`}
                      className="template-image img-fluid"
                    />
                    <div className="template-overlay">
                      <span className="template-badge">{template.badge}</span>
                    </div>
                  </div>
                  <div className="template-content">
                    <h5>{template.name}</h5>
                    <p>{template.description}</p>
                    <Link to="/signup" className="btn-use-template">
                      Use Template <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`cta-section ${darkMode ? "dark" : "light"}`}>
        <div className="container text-center">
          <h2>Ready to Build Your Perfect Resume?</h2>
          <p>
            Join thousands of successful job seekers who landed their dream jobs
            with our resume builder.
          </p>
          <Link to="/signup" className="btn btn-cta">
            Start Building Free <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`footer ${darkMode ? "dark" : "light"}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <h5>ResumeCraft</h5>
              <p>
                The ultimate resume builder for modern job seekers. Create
                professional, ATS-optimized resumes in minutes.
              </p>
              <div className="social-links">
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#">
                  <i className="bi bi-github"></i>
                </a>
              </div>
            </div>
            <div className="col-md-3 mb-4 mb-md-0">
              <h6>Quick Links</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/features">Features</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Legal</h6>
              <ul className="list-unstyled">
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Laiba Sheikh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: "file-earmark-check",
    title: "ATS Optimized",
    description:
      "Get real-time ATS score and suggestions to beat applicant tracking systems",
  },
  {
    icon: "palette",
    title: "Professional Templates",
    description:
      "Choose from modern, classic, and creative templates designed by experts",
  },
  {
    icon: "shield-lock",
    title: "Secure Storage",
    description: "Your data is securely stored and accessible from anywhere",
  },
  {
    icon: "lightning",
    title: "Quick Creation",
    description: "Build a professional resume in under 10 minutes",
  },
  {
    icon: "graph-up",
    title: "Performance Analytics",
    description: "Track how your resume performs and get improvement tips",
  },
  {
    icon: "people",
    title: "Collaboration",
    description: "Share with mentors and get feedback before sending",
  },
];

const templates = [
  {
    name: "Modern",
    description:
      "Clean, professional design with modern typography. Perfect for tech and creative industries.",
    badge: "Most Popular",
    image:
      "data:image/jpeg;base64,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", // Modern resume template
  },
  {
    name: "Classic",
    description:
      "Traditional format preferred by conservative industries like law, finance, and government.",
    badge: "Professional",
    image:
      "data:image/jpeg;base64,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", // Classic resume template
  },
  {
    name: "Creative",
    description:
      "Unique design with artistic elements for creative professionals and designers.",
    badge: "Creative",
    image:
      "data:image/jpeg;base64,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", // Creative resume template
  },
];

export default Home;
