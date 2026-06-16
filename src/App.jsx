import { motion, useScroll, useSpring } from 'framer-motion';
import './index.css';
import Header from './components/Header.jsx';
import About from './components/About.jsx';
import Resume from './components/Resume.jsx';
import Portfolio from './components/Portfolio.jsx';
import Contact from './components/Contact.jsx';
import CosmicBackground from './components/CosmicBackground.jsx';


import Chatbot from "./components/Chatbot.jsx";

const sectionMotionProps = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <div className="app">
      <CosmicBackground />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <main className="main-content">
        <motion.div {...sectionMotionProps}>
          <About />
        </motion.div>
        <motion.div {...sectionMotionProps}>
          <Resume />
        </motion.div>
        <motion.div {...sectionMotionProps}>
          <Portfolio />
        </motion.div>
        <motion.div {...sectionMotionProps}>
          <Contact />
        </motion.div>
      </main>

      { }
      <Chatbot />
    </div>
  );
}

export default App;