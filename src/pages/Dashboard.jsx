import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalResumes: 0,
    averageScore: 0,
    downloads: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    checkOrCreateProfile();
    fetchResumes();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
    } else {
      setUser(user);
    }
  };

  // Check if profile exists, if not create it
  const checkOrCreateProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Check if profile exists
      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code === "PGRST116") {
        // Profile doesn't exist, create it
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            full_name:
              user.user_metadata?.full_name ||
              user.email?.split("@")[0] ||
              "User",
            email: user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        if (insertError) {
          console.error("Error creating profile:", insertError);
        } else {
          console.log("Profile created successfully");
        }
      }
    } catch (error) {
      console.error("Error checking/creating profile:", error);
    }
  };

  const fetchResumes = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setResumes(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (resumeData) => {
    const totalResumes = resumeData.length;
    const averageScore =
      totalResumes > 0
        ? resumeData.reduce((acc, curr) => acc + (curr.ats_score || 0), 0) /
          totalResumes
        : 0;
    const downloads = resumeData.reduce(
      (acc, curr) => acc + (curr.download_count || 0),
      0,
    );

    setStats({
      totalResumes,
      averageScore: Math.round(averageScore),
      downloads,
    });
  };

  const deleteResume = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        const { error } = await supabase.from("resumes").delete().eq("id", id);

        if (error) throw error;

        fetchResumes();
      } catch (error) {
        console.error("Error deleting resume:", error);
        alert("Error deleting resume: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container-fluid py-4">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="h2">Dashboard</h1>
            <p className="text-muted">
              Welcome back,{" "}
              {user?.user_metadata?.full_name || user?.email || "User"}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <StatsCard
              title="Total Resumes"
              value={stats.totalResumes}
              icon={<i className="bi bi-file-text display-4"></i>}
              color="primary"
            />
          </div>
          <div className="col-md-4">
            <StatsCard
              title="Avg ATS Score"
              value={`${stats.averageScore}%`}
              icon={<i className="bi bi-graph-up display-4"></i>}
              color="success"
            />
          </div>
          <div className="col-md-4">
            <StatsCard
              title="Total Downloads"
              value={stats.downloads}
              icon={<i className="bi bi-download display-4"></i>}
              color="info"
            />
          </div>
        </div>

        {/* Create New Resume Button */}
        <div className="row mb-4">
          <div className="col-12">
            <Link to="/resume-builder" className="btn btn-primary btn-lg">
              <i className="bi bi-plus-circle me-2"></i>
              Create New Resume
            </Link>
          </div>
        </div>

        {/* Resumes List */}
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">My Resumes</h5>
              </div>
              <div className="card-body">
                {resumes.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-file-text display-1 text-muted mb-3"></i>
                    <h5>No resumes yet</h5>
                    <p className="text-muted">
                      Create your first resume to get started
                    </p>
                    <Link to="/resume-builder" className="btn btn-primary">
                      Create Resume
                    </Link>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table
                      className="table table-hover"
                      style={{
                        backgroundColor: "var(--card-bg)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            borderBottom: "1px solid var(--border-color)",
                          }}
                        >
                          <th style={{ color: "var(--text-secondary)" }}>
                            Name
                          </th>
                          <th style={{ color: "var(--text-secondary)" }}>
                            Template
                          </th>
                          <th style={{ color: "var(--text-secondary)" }}>
                            ATS Score
                          </th>
                          <th style={{ color: "var(--text-secondary)" }}>
                            Created
                          </th>
                          <th style={{ color: "var(--text-secondary)" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resumes.map((resume) => (
                          <tr
                            key={resume.id}
                            style={{
                              borderBottom: "1px solid var(--border-color)",
                              transition: "background-color 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "var(--hover-bg)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                          >
                            <td style={{ color: "var(--text-primary)" }}>
                              <Link
                                to={`/resume-builder?id=${resume.id}`}
                                style={{
                                  color: "var(--link-color)",
                                  textDecoration: "none",
                                }}
                              >
                                {resume.name}
                              </Link>
                            </td>
                            <td>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: "var(--bg-tertiary)",
                                  color: "var(--text-primary)",
                                  padding: "0.5em 0.75em",
                                }}
                              >
                                {resume.template || "modern"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="progress flex-grow-1 me-2"
                                  style={{
                                    width: "100px",
                                    height: "8px",
                                    backgroundColor: "var(--bg-tertiary)",
                                  }}
                                >
                                  <div
                                    className={`progress-bar ${
                                      resume.ats_score > 70
                                        ? "bg-success"
                                        : resume.ats_score > 50
                                          ? "bg-warning"
                                          : "bg-danger"
                                    }`}
                                    style={{
                                      width: `${resume.ats_score || 0}%`,
                                      backgroundColor:
                                        resume.ats_score > 70
                                          ? "#198754"
                                          : resume.ats_score > 50
                                            ? "#ffc107"
                                            : "#dc3545",
                                    }}
                                  ></div>
                                </div>
                                <span style={{ color: "var(--text-primary)" }}>
                                  {resume.ats_score || 0}%
                                </span>
                              </div>
                            </td>
                            <td style={{ color: "var(--text-secondary)" }}>
                              {new Date(resume.created_at).toLocaleDateString()}
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <Link
                                  to={`/resume-builder?id=${resume.id}`}
                                  className="btn btn-outline-primary"
                                  title="Edit"
                                  style={{
                                    borderColor: "var(--btn-primary-bg)",
                                    color: "var(--btn-primary-bg)",
                                  }}
                                >
                                  <i className="bi bi-pencil"></i>
                                </Link>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => deleteResume(resume.id)}
                                  title="Delete"
                                  style={{
                                    borderColor: "#dc3545",
                                    color: "#dc3545",
                                  }}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
