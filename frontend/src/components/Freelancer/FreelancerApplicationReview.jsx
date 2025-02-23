const FreelancerApplicationReview = ({ freelancer, job }) => {
    // Calculate match percentage
    const calculateMatchPercentage = () => {
      const totalRequirements = job.requirements.length
      const matchedRequirements = job.requirements.filter((req) => freelancer.skills.includes(req)).length
      return Math.round((matchedRequirements / totalRequirements) * 100)
    }
  
    const matchPercentage = calculateMatchPercentage()
  
    // Styles
    const styles = {
      container: {
        fontFamily: "'Poppins', sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "30px",
        backgroundColor: "white",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        borderRadius: "12px",
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        borderBottom: "2px solid #E0E0E0",
        paddingBottom: "20px",
      },
      title: {
        fontSize: "28px",
        fontWeight: "600",
        color: "#001F3F", // Navy
        margin: "0",
      },
      matchPercentage: {
        fontSize: "24px",
        fontWeight: "600",
        color: "white",
        backgroundColor: matchPercentage > 70 ? "#20B2AA" : "#87CEEB", // Teal for high match, Sky Blue for lower
        padding: "10px 20px",
        borderRadius: "25px",
      },
      section: {
        marginBottom: "30px",
        backgroundColor: "#F5F5DC", // Beige
        padding: "20px",
        borderRadius: "8px",
      },
      sectionTitle: {
        fontSize: "22px",
        fontWeight: "600",
        color: "#001F3F", // Navy
        marginBottom: "15px",
      },
      list: {
        listStyleType: "none",
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      },
      listItem: {
        backgroundColor: "#E6F3FF", // Light sky blue
        color: "#001F3F", // Navy
        padding: "8px 15px",
        borderRadius: "20px",
        fontSize: "14px",
      },
      buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "30px",
      },
      button: {
        padding: "12px 25px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        border: "none",
        borderRadius: "25px",
        color: "white",
        transition: "transform 0.1s ease-in-out",
      },
      hireButton: {
        backgroundColor: "#20B2AA", // Teal
      },
      rejectButton: {
        backgroundColor: "#001F3F", // Navy
      },
      infoText: {
        fontSize: "16px",
        color: "#333",
        marginBottom: "10px",
      },
      skillMatch: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
      },
      matchIcon: {
        fontSize: "18px",
      },
    }
  
    const handleHire = () => {
      console.log("Freelancer hired!")
    }
  
    const handleReject = () => {
      console.log("Freelancer rejected.")
    }
  
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Freelancer Application</h1>
          <span style={styles.matchPercentage}>{matchPercentage}% Match</span>
        </div>
  
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Freelancer Profile</h2>
          <p style={styles.infoText}>
            <strong>Name:</strong> {freelancer.name}
          </p>
          <p style={styles.infoText}>
            <strong>Experience:</strong> {freelancer.experience} years
          </p>
          <p style={styles.infoText}>
            <strong>Skills:</strong>
          </p>
          <ul style={styles.list}>
            {freelancer.skills.map((skill, index) => (
              <li key={index} style={styles.listItem}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
  
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Job Requirements</h2>
          <ul style={styles.list}>
            {job.requirements.map((req, index) => (
              <li key={index} style={{ ...styles.listItem, ...styles.skillMatch }}>
                {req}
                <span style={styles.matchIcon}>{freelancer.skills.includes(req) ? "✅" : "❌"}</span>
              </li>
            ))}
          </ul>
        </div>
  
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.hireButton }} onClick={handleHire}>
            Hire Freelancer
          </button>
          <button style={{ ...styles.button, ...styles.rejectButton }} onClick={handleReject}>
            Reject Application
          </button>
        </div>
      </div>
    )
  }
  
  export default FreelancerApplicationReview
  
  