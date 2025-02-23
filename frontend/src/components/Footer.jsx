import React, { useState } from 'react';
import { Mail, Linkedin, Twitter, Github, Facebook } from 'lucide-react';
const Footer = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };
  return (
    <footer style={{
      backgroundColor: '#221F26',
      color: '#FFFFFF',
      padding: '48px 0',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
        }}>
          {/* About Section */}
          <div>
            <h3 style={{ color: '#33C3F0', marginBottom: '20px', fontSize: '18px' }}>About Us</h3>
            <p style={{ color: '#eee', lineHeight: '1.6' }}>
              Connect with top freelancers and find opportunities that match your expertise. Join our growing community of professionals.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 style={{ color: '#33C3F0', marginBottom: '20px', fontSize: '18px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Find Work', 'Post a Job', 'How it Works', 'Success Stories'].map((link) => (
                <li key={link} style={{ marginBottom: '10px' }}>
                  <a
                    href="#"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#33C3F0'}
                    onMouseOut={(e) => e.target.style.color = '#fff'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 style={{ color: '#33C3F0', marginBottom: '20px', fontSize: '18px' }}>Contact Us</h3>
            <p style={{ color: '#eee', marginBottom: '10px' }}>Email: contact@freelance.com</p>
            <p style={{ color: '#eee', marginBottom: '20px' }}>Phone: (555) 123-4567</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[Mail, Linkedin, Twitter, Github, Facebook].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    color: '#fff',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#33C3F0'}
                  onMouseOut={(e) => e.target.style.color = '#fff'}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          {/* Newsletter */}
          <div>
            <h3 style={{ color: '#33C3F0', marginBottom: '20px', fontSize: '18px' }}>Newsletter</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  backgroundColor: '#333333',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  color: '#fff'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#33C3F0',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1EAEDB'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#33C3F0'}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Copyright */}
        <div style={{
          borderTop: '1px solid #444',
          marginTop: '40px',
          paddingTop: '20px',
          textAlign: 'center',
          color: '#eee'
        }}>
          <p>&copy; 2024 Freelance Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;