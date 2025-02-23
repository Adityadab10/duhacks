"use client"

import { useState } from "react"
import FreelancerApplicationReview from "./FreelancerApplicationReview"

const CompanyJobApplications = ({ job, applications }) => {
  const [selectedFreelancer, setSelectedFreelancer] = useState(null)

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "30px",
      backgroundColor: "white",
      boxShadow: "0 0 20px rgba(0,0,0,0.1)",
      borderRadius: "12px",
    },
    header: {
      fontSize: "28px",
      fontWeight: "600",
      color: "#001F3F", // Navy
      marginBottom: "20px",
      textAlign: "center",
    },
    jobTitle: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#20B2AA", // Teal
      marginBottom: "20px",
      textAlign: "center",
    },
    applicantsList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    applicantItem: {
      backgroundColor: "#F5F5DC", // Beige
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    applicantName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#001F3F", // Navy
    },
    applicantSkills: {
      fontSize: "14px",
      color: "#555",
    },
    viewButton: {
      backgroundColor: "#87CEEB", // Sky Blue
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "8px 15px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    backButton: {
      backgroundColor: "#001F3F", // Navy
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "20px",
    },
  }

  return (
    <div style={styles.container}>
      {selectedFreelancer ? (
        <>
          <button style={styles.backButton} onClick={() => setSelectedFreelancer(null)}>
            Back to Applications
          </button>
          <FreelancerApplicationReview freelancer={selectedFreelancer} job={job} />
        </>
      ) : (
        <>
          <h1 style={styles.header}>Job Applications</h1>
          <h2 style={styles.jobTitle}>{job.title}</h2>
          <ul style={styles.applicantsList}>
            {applications.map((applicant) => (
              <li key={applicant.id} style={styles.applicantItem} onClick={() => setSelectedFreelancer(applicant)}>
                <div>
                  <div style={styles.applicantName}>{applicant.name}</div>
                  <div style={styles.applicantSkills}>
                    {applicant.skills.slice(0, 3).join(", ")}
                    {applicant.skills.length > 3 && "..."}
                  </div>
                </div>
                <button style={styles.viewButton}>View Application</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default CompanyJobApplications

