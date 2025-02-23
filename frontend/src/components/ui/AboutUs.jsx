import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { number: "10K+", label: "Active Freelancers" },
    { number: "15K+", label: "Completed Projects" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      name: "Emma Williams",
      role: "Community Lead",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F0] to-[#E6EEF2]">
      {/* Hero Section */}
      <motion.section 
        className="px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span 
          className="inline-block px-4 py-1 mb-6 text-sm font-medium text-[#1D3557] bg-[#E6EEF2] rounded-full"
          {...fadeIn}
        >
          Our Mission
        </motion.span>
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D3557] mb-8 tracking-tight"
          {...fadeIn}
        >
          Empowering Global Talent
        </motion.h1>
        <motion.p 
          className="max-w-2xl mx-auto text-xl text-[#457B9D] mb-12"
          {...fadeIn}
        >
          We're building the future of work by connecting exceptional freelancers with innovative companies worldwide.
        </motion.p>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-white/70 backdrop-blur-lg border-t border-b border-[#E6EEF2]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#1D3557] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-[#457B9D]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D3557] mb-4">
            Meet Our Team
          </h2>
          <p className="text-[#457B9D] max-w-2xl mx-auto">
            Dedicated professionals working to create the best platform for freelancers and clients alike.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-4 overflow-hidden rounded-lg bg-[#E6EEF2] shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#1D3557] mb-1">
                {member.name}
              </h3>
              <p className="text-[#457B9D]">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <motion.section 
        className="py-20 bg-[#E6EEF2]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D3557] mb-8">
            Ready to Get Started?
          </h2>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1D3557] hover:bg-[#457B9D] transition-colors duration-300"
          >
            Join Our Platform
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;