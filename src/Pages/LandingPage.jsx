import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Variants for staggered animations of content
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

// Variant for slide-in animation (from left)
const slideIn = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const LandingPage = () => {
  // Features for individual cards
  const features = [
    "Consolidate your projects and tasks in one organized dashboard.",
    "Experience intuitive drag-and-drop functionality that makes rearranging tasks effortless.",
    "Stay updated with smart, real-time notifications tailored to your schedule."
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden flex flex-col items-center">
      {/* Background Animations */}
      {/* Rotating Orange Rings */}
      <motion.div
        initial={{ rotate: 0, scale: 0 }}
        animate={{ rotate: 360, scale: 1.5 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute border-2 border-orange-600 rounded-full w-86 h-86 opacity-50"
        style={{ top: '7%', left: '7%' }}
      />
      <motion.div
        initial={{ rotate: 0, scale: 0 }}
        animate={{ rotate: 360, scale: 1.5 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute border-2 border-orange-600 rounded-full w-86 h-86 opacity-50"
        style={{ top: '7%', right: '7%' }}
      />
      {/* Bouncing Circle */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 50 }}
        transition={{ duration: 2, yoyo: Infinity, ease: "easeInOut" }}
        className="absolute bg-orange-600 rounded-full w-64 h-64 opacity-20"
        style={{ bottom: '-50px', right: '5%' }}
      />
{/*        
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 50 }}
        transition={{ duration: 2, yoyo: Infinity, ease: "easeInOut" }}
        className="absolute bg-orange-600 rounded-full w-64 h-64 opacity-20"
        style={{ bottom: '-50px', left: '5%' }}
      /> */}

      {/* Pulsing Blob */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute bg-orange-600 rounded-full filter blur-2xl w-80 h-80 opacity-40"
        style={{ top: '50%', left: '-100px' }}
      />

      {/* Hero Content Card with extra top margin to separate from nav bar */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative z-10 max-w-3xl mx-auto p-10 bg-gray-800 bg-opacity-95 rounded-2xl shadow-2xl text-center mt-24"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          CONQUER YOUR CHAOS WITH <span className="text-orange-600">GERA</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-8">
          Ever feel like your tasks are plotting against you? Turn that mayhem into miracles.
          Let GERA be your secret sauce for epic productivity sprinkled with a dash of humor.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-orange-600 text-white rounded-full text-lg font-semibold shadow-xl hover:bg-orange-700 transition-all"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Explanation Sections wrapped in animated cards */}
      <section className="w-full px-6 py-16 bg-gray-900 space-y-10">
        {/* What is GERA? */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto p-14 bg-gray-800 bg-opacity-95 rounded-2xl shadow-2xl relative"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center text-white mb-4">
            What is GERA?
            <motion.div
             initial={{ scale: 0.8 }}
             animate={{ scale: 1.2 }}
             transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
             className="absolute bg-orange-600 rounded-full filter blur-xl w-80 h-80 opacity-40"
             style={{ top: '20%', right: '-300px' }}
      />
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-300 text-center">
            GERA is a cutting-edge productivity platform that centralizes task management, scheduling, and real-time notifications into one intuitive workspace.
          </motion.p>
        </motion.div>

        {/* How GERA Works */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-3xl mx-auto p-10 bg-gray-800 bg-opacity-95 rounded-2xl shadow-2xl"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-4">
            How GERA Works
            {/* <motion.div
             initial={{ scale: 0.8 }}
             animate={{ scale: 1.2 }}
             transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
             className="absolute bg-orange-600 rounded-full filter blur-2xl w-80 h-80 opacity-40"
             style={{ top: '50%', right: '-100px' }}
           /> */}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-6">
            With a sophisticated drag-and-drop interface, GERA lets you prioritize tasks and projects with ease. Set deadlines and receive smart notifications so you can stay on track without the chaos.
          </motion.p>
        </motion.div>

        {/* Features & Benefits with individual slide-in cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto p-10 bg-gray-800 bg-opacity-95 rounded-2xl shadow-2xl"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-6 text-center">
            Features & Benefits
            <motion.div
             initial={{ scale: 0.8 }}
             animate={{ scale: 1.2 }}
             transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
             className="absolute bg-orange-600 rounded-full filter blur-2xl w-80 h-80 opacity-40"
             style={{ top: '70%', right: '-100px' }}
            />
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={slideIn} 
                className="p-6 bg-gray-900 bg-opacity-95 rounded-2xl shadow-xl"
              >
                <p className="text-lg text-gray-300">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="text-4xl font-bold text-white mb-6"
        >
          Ready to transform your productivity?
        </motion.h2>
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-orange-600 text-white rounded-full text-xl font-semibold shadow-xl hover:bg-orange-700 transition-all"
          >
            Join GERA Now
          </motion.button>
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
