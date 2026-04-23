import blogTypeScript from '@/assets/file.png'
import blogThree from '@/assets/finder_light.png'
import blogMotion from '@/assets/photos_light.png'
import aiDataAnalyst1 from '@/assets/ai_data_analyst_1.png'
import aiDataAnalyst2 from '@/assets/ai_data_analyst_2.png'
import aiDataAnalyst3 from '@/assets/ai_data_analyst_3.png'
import projectPhishGuard from '@/assets/phish_guard.png'
import projectPortfolio from '@/assets/photos_light.png'
import personal1 from '@/assets/personal_1.jpg'
import personal2 from '@/assets/personal_2.jpg'
import personal3 from '@/assets/personal_3.jpg'
import personal4 from '@/assets/personal_4.jpg'


export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  url?: string
  image: string
  category: string
}

export const aiAnalystScreenshots = {
  1: aiDataAnalyst1,
  2: aiDataAnalyst2,
  3: aiDataAnalyst3,
}

export const projects: Project[] = [
  {
    id: 'nike-ecommerce',
    name: 'DataMind — Autonomous AI Data Analyst',
    description: 'Autonomous AI system for automated data cleaning, EDA, insight generation, and interactive visual analytics.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'FastAPI', 'React', 'PostgreSQL', 'Plotly', 'Ollama'],
    url: 'https://automated-ai-data-analyst-three.vercel.app/',
    image: aiDataAnalyst1,
    category: 'Work',
  },
  {
    id: 'phish-guard',
    name: '⚡ PhishGuard — AI Phishing Detection System',
    description: 'ML-powered URL threat assessment. 90.76% accuracy on 2,488-URL dataset · GradientBoosting · FastAPI · React',
    tech: ['Python', 'GradientBoosting', 'FastAPI', 'React', 'Scikit-learn', 'Vite', 'Axios'],
    url: 'https://phishing-detector-two-nu.vercel.app/',
    image: projectPhishGuard,
    category: 'Work',
  },
  {
    id: 'food-delivery-app',
    name: 'Portfolio Web App',
    description: 'Responsive portfolio desktop interface showcasing projects, resume, contact links, and macOS-inspired interactions.',
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Vite'],
    url: 'https://github.com',
    image: projectPortfolio,
    category: 'Work',
  },
]

export const blogPosts = [
  {
    id: 1,
    title: 'TypeScript Explained: What It Is, Why It Matters, and How to Master It',
    date: 'Sep 2, 2025',
    url: 'https://dev.to',
    image: blogTypeScript,
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Mastering Three.js for 3D Development',
    date: 'Aug 28, 2025',
    url: 'https://dev.to',
    image: blogThree,
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Mastering GSAP Animations',
    date: 'Aug 15, 2025',
    url: 'https://dev.to',
    image: blogMotion,
  },
]

export const techStack = [
  { category: 'Languages', techs: 'Python, JavaScript' },
  { category: 'Data & ML', techs: 'Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, EDA, Feature Engineering' },
  { category: 'Backend', techs: 'FastAPI, Node.js, Express.js, REST APIs' },
  { category: 'Database', techs: 'PostgreSQL, Oracle SQL' },
  { category: 'Frontend', techs: 'React.js, HTML5, CSS3' },
  { category: 'Tools', techs: 'Git, GitHub, Postman, VS Code, Bash' },
]

export const galleryImages = [
  { id: 1, url: personal1, alt: 'Personal Photo 1' },
  { id: 2, url: personal2, alt: 'Personal Photo 2' },
  { id: 3, url: personal3, alt: 'Personal Photo 3' },
  { id: 4, url: personal4, alt: 'Personal Photo 4' },
]
