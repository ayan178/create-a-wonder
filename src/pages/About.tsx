
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnhancedBackground from "@/components/EnhancedBackground";

const About = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Sarah founded Aura AI with a vision to revolutionize the interview process for both candidates and employers."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "With over 15 years in AI and machine learning, Michael leads our technical team in developing cutting-edge interview technology."
    },
    {
      name: "Priya Patel",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "Priya ensures our AI interview platform delivers exceptional user experiences for both candidates and hiring managers."
    },
    {
      name: "David Wilson",
      role: "Head of AI Research",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      bio: "David leads our AI research team, focusing on natural language processing and emotion recognition technologies."
    }
  ];

  const timelineItems = [
    {
      year: "2019",
      title: "Founded",
      description: "Aura AI was founded with the mission to transform interview processes with artificial intelligence."
    },
    {
      year: "2020",
      title: "First Product Launch",
      description: "Released our first AI-powered interview preparation tool for candidates."
    },
    {
      year: "2021",
      title: "Enterprise Solution",
      description: "Launched our enterprise platform for employers to streamline their hiring processes."
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded operations to serve clients in over 30 countries worldwide."
    },
    {
      year: "2023",
      title: "Advanced AI Features",
      description: "Introduced emotion recognition and advanced feedback systems to our platform."
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Named as one of the top HR tech innovations by leading industry analysts."
    }
  ];

  return (
    <EnhancedBackground>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About <span className="text-brand-primary">Aura</span> AI
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Transforming the interview experience with advanced artificial intelligence
              </motion.p>
            </motion.div>
            
            {/* Our Mission Section */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  At Aura AI, we're dedicated to revolutionizing the interview process by leveraging 
                  cutting-edge artificial intelligence. We believe that interviewing should be a fair, 
                  efficient, and insightful experience for everyone involved.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our mission is to help candidates showcase their true potential while enabling employers 
                  to make better hiring decisions through objective, data-driven insights.
                </p>
                <p className="text-lg text-muted-foreground">
                  By removing bias and focusing on skills and competencies, we're creating a more equitable 
                  job market where talent thrives and organizations build stronger teams.
                </p>
              </motion.div>
              
              <motion.div
                className={`rounded-xl overflow-hidden relative aspect-video ${
                  isDarkMode ? 'bg-brand-primary/10' : 'bg-brand-primary/5'
                } border ${
                  isDarkMode ? 'border-white/10' : 'border-brand-primary/10'
                }`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Team working together" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            
            {/* Our Story Timeline */}
            <motion.div 
              className="mb-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
              
              <div className="relative">
                {/* Center line */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${
                  isDarkMode ? 'bg-white/20' : 'bg-brand-primary/20'
                }`}></div>
                
                <div className="space-y-16">
                  {timelineItems.map((item, index) => (
                    <motion.div 
                      key={item.year}
                      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                        <div className="mb-2 text-brand-primary font-bold text-xl">{item.year}</div>
                        <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      
                      <div className="relative my-4 md:my-0">
                        <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                          index % 2 === 0 ? 'left-full ml-2 md:ml-0 md:left-auto md:right-0 md:mr-6' : 'left-full ml-2 md:ml-0 md:left-0 md:ml-6'
                        } h-[2px] w-8 ${isDarkMode ? 'bg-white/20' : 'bg-brand-primary/20'}`}></div>
                        
                        <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-background border border-white/20' : 'bg-white border border-brand-primary/20'
                        }`}>
                          <div className="w-4 h-4 rounded-full bg-brand-primary"></div>
                        </div>
                        
                        <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                          index % 2 === 0 ? 'right-full mr-2 md:mr-0 md:right-auto md:left-0 md:ml-6' : 'right-full mr-2 md:mr-0 md:right-0 md:mr-6'
                        } h-[2px] w-8 ${isDarkMode ? 'bg-white/20' : 'bg-brand-primary/20'}`}></div>
                      </div>
                      
                      <div className="w-full md:w-1/2"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className={`rounded-xl overflow-hidden bg-card shadow-lg ${
                      isDarkMode ? 'border border-white/10' : 'border border-gray-200'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                      <p className="text-brand-primary font-medium text-sm mb-4">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </EnhancedBackground>
  );
};

export default About;
