import React from 'react';
import { Briefcase, UserCheck, MessageSquare, Star } from 'lucide-react';
const HowItWorks = () => {
  const steps = [
    {
      icon: <Briefcase size={40} />,
      title: "Post a Project",
      description: "Start by posting your project details, requirements, and budget. Be specific to attract the right talent.",
      color: "#33C3F0"
    },
    {
      icon: <UserCheck size={40} />,
      title: "Select Freelancer",
      description: "Review proposals, portfolios, and ratings. Choose the best freelancer that matches your project needs.",
      color: "#1EAEDB"
    },
    {
      icon: <MessageSquare size={40} />,
      title: "Collaborate",
      description: "Work directly with your chosen freelancer, track progress, and communicate effectively through our platform.",
      color: "#0E5E7A"
    },
    {
      icon: <Star size={40} />,
      title: "Complete & Review",
      description: "Approve the final work, release payment, and share your experience by rating the freelancer.",
      color: "#083B4D"
    }
  ];
  return (
    <div style={{
      padding: '80px 20px',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          color: '#221F26',
          marginBottom: '50px',
        }}>
          How It Works
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          justifyContent: 'center',
        }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '30px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: step.color,
                marginBottom: '20px',
                color: '#fff',
              }}>
                {step.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#221F26',
                marginBottom: '15px',
              }}>
                {step.title}
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6',
              }}>
                {step.description}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '20px',
              }}>
                <span style={{
                  backgroundColor: step.color,
                  color: '#fff',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}>
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HowItWorks;