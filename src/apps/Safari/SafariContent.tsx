import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Briefcase, ChevronDown } from 'lucide-react'

// You might need to change imports if file structure differs
import footballImg from '../../assets/football_new.jpg'
import bikeImg from '../../assets/bike_new.jpg'
import trekkingImg from '../../assets/trekking_new.jpg'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export function SafariContent() {
  return (
    <div className="flex-1 overflow-y-auto scroll-smooth bg-[#111111] text-white selection:bg-[#ff3b6b]/30">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-20 pb-32 flex flex-col gap-32">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <LifeOutsideSection />
        <ContactSection />
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
      >
        <h2 className="text-7xl md:text-[140px] font-black text-white/5 tracking-tighter uppercase">
          portfolio.
        </h2>
      </motion.div>

      <motion.p variants={fadeInUp} className="text-[#ff3b6b] font-medium text-lg tracking-wide mb-4 z-10 w-full">
        Hey, I'm Pruthvi
      </motion.p>
      <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 z-10 w-full">
        AI/ML Full Stack <br/> <span className="text-white/80">Developer</span>
      </motion.h1>
      
      <motion.div variants={fadeInUp} className="mt-16 animate-bounce z-10">
        <ChevronDown className="text-white/30 w-8 h-8" />
      </motion.div>
    </motion.section>
  )
}

function AboutSection() {
  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative p-10 md:p-14 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden text-center md:text-left">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-center md:justify-start gap-3">
          <Briefcase className="text-[#ff3b6b]" />
          About Me
        </h2>
        <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
          AI/ML-focused Full Stack Developer with strong expertise in Python and JavaScript, building end-to-end intelligent systems from UI to ML pipelines. Experienced in deploying real-world applications including OCR-based health platforms, fraud detection systems, and automated data analytics tools.
        </p>
      </div>
    </motion.section>
  )
}

function SkillsSection() {
  const skills = ['Python', 'JavaScript', 'React', 'Node', 'FastAPI', 'Pandas', 'ML']
  
  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="flex flex-col items-center"
    >
      <motion.h2 variants={fadeInUp} className="text-white/50 text-sm tracking-[0.2em] uppercase mb-8">
        Technical Arsenal
      </motion.h2>
      <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 max-w-2xl">
        {skills.map((skill) => (
          <div 
            key={skill} 
            className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 hover:-translate-y-1 hover:border-[#ff3b6b]/50 transition-all cursor-pointer text-sm font-medium tracking-wide"
          >
            {skill}
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}

function LifeOutsideSection() {
  const cards = [
    {
      title: 'Football',
      description: 'Active football player and team captain, demonstrating leadership, teamwork, and on-field decision-making under pressure.',
      image: footballImg
    },
    {
      title: 'Adventure & Exploration',
      description: 'Passionate about long-distance bike rides and outdoor adventures, building resilience, endurance, and a strong exploratory mindset.',
      image: bikeImg
    },
    {
      title: 'Trek Leadership',
      description: 'Trek Lead experienced in organizing and guiding groups through challenging terrains, ensuring safety, coordination, and group management.',
      image: trekkingImg
    }
  ]

  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">My Life Outside Code</h2>
        <div className="w-12 h-1 bg-[#ff3b6b] mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <motion.div 
            variants={fadeInUp} 
            key={idx} 
            className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col hover:border-white/20 transition-all hover:shadow-2xl"
          >
            <div className="relative h-48 overflow-hidden bg-black/50">
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
            </div>
            <div className="p-6 flex-1 flex flex-col bg-[#161616]">
              <h3 className="text-lg font-bold text-white/95 mb-3 group-hover:text-[#ff3b6b] transition-colors">{card.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed flex-1">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function ContactSection() {
  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="text-center pt-10 border-t border-white/10"
    >
      <h2 className="text-2xl font-bold mb-8">Let's Connect</h2>
      <div className="flex items-center justify-center gap-6">
        <a 
          href="mailto:stevepruthvi@gmail.com" 
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-[#ff3b6b] hover:-translate-y-1 transition-all"
          target="_blank"
          rel="noreferrer"
        >
          <Mail size={20} />
        </a>
        <a 
          href="https://github.com/Pruthvi1755" 
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-[#ff3b6b] hover:-translate-y-1 transition-all"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={20} />
        </a>
        <a 
          href="https://www.linkedin.com/in/pruthvi-t-s-1547392a2/" 
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-[#ff3b6b] hover:-translate-y-1 transition-all"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </motion.section>
  )
}
