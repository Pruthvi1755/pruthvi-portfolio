import blogTypeScript from '@/assets/file.png'
import blogThree from '@/assets/finder_light.png'
import blogMotion from '@/assets/photos_light.png'
import aiDataAnalyst1 from '@/assets/ai_data_analyst_1.png'
import projectScamShield from '@/assets/file.png'
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

export const projects: Project[] = [
  {
    id: 'nike-ecommerce',
    name: 'Automated AI Data Analyst',
    description: 'AI-powered data analysis system for automated cleaning, EDA, insight generation, ML prediction, and interactive analytics.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'FastAPI', 'React', 'PostgreSQL', 'Plotly', 'Ollama'],
    url: 'https://automated-ai-data-analyst-three.vercel.app/',
    image: aiDataAnalyst1,
    category: 'Work',
  },
  {
    id: 'ai-resume-analyzer',
    name: 'ScamShield',
    description: 'Multilingual UPI fraud detection system for phishing SMS and malicious URLs across 12+ Indian languages.',
    tech: ['Python', 'MuRIL', 'Transformers', 'ONNX Runtime', 'FastAPI', 'JavaScript', 'MLflow', 'Twilio'],
    url: 'https://github.com/Pruthvi1755',
    image: projectScamShield,
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
