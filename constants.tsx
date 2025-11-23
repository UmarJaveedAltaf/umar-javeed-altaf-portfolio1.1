import { Brain, Database, FileCode, Microscope, Search, Coins, Image, Pill, Server } from 'lucide-react';
import { Project, Education, Certification, SkillCategory } from './types';

export const SOCIAL_LINKS = {
  github: "https://github.com/UmarJaveedAltaf",
  linkedin: "https://www.linkedin.com/in/umar-javeed-altaf-61b057201/",
  email: "altafumar637@gmail.com",
  location: "Boston, MA",
  phone: "857-351-4858"
};

export const EDUCATION_DATA: Education[] = [
  {
    school: "Northeastern University",
    location: "Boston, MA",
    degree: "M.S. Artificial Intelligence",
    period: "Jan 2025 – Exp. Jun 2026",
    gpa: "3.6/4.0",
    coursework: "Deep Learning, NLP, Generative AI, LLMs,AI Algorithms"
  },
  {
    school: "University at Buffalo",
    location: "Buffalo, NY",
    degree: "M.S. Artificial Intelligence",
    period: "Aug 2024 – Dec 2024",
    gpa: "3.2/4.0",
    coursework: "Big Data, ML, Vector Databases, Foundations of AI"
  },
  {
    school: "Muffakham Jah College of Engineering & Technology (MJCET)",
    location: "Hyderabad, India",
    degree: "B.E. Computer Science (AI & Data Science)",
    period: "2020 – 2024",
    gpa: "First Class Honours"
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    title: "ContraBERT",
    icon: Microscope,
    tags: ["BERT", "NLP", "Deep Learning"],
    description: [
      "Enhanced BERT by replacing NSP with contrastive triplet loss for improved semantic similarity.",
      "Achieved measurable performance gains on MNLI benchmarks."
    ],
    github: "#"
  },
  {
    title: "MED-EASE (Published in IJIRT)",
    icon: Pill,
    tags: ["Healthcare AI", "ML", "Research"],
    description: [
      "Developed an ML-driven drug recommendation system analyzing symptoms for personalized treatments.",
      "Published research demonstrating high predictive accuracy across multiple disease categories."
    ],
    github: "#"
  },
  {
    title: "Indian Currency Classifier",
    icon: Coins,
    tags: ["Computer Vision", "CNN", "TensorFlow"],
    description: [
      "Built a CNN classifier using TensorFlow/PyTorch to identify Indian currency notes from images.",
      "Achieved high accuracy with augmentation, class balancing, and optimized architectures."
    ],
    github: "#"
  },
  {
    title: "Image Retrieval System",
    icon: Image,
    tags: ["CV", "Feature Extraction", "Search"],
    description: [
      "Implemented a content-based visual search system using feature extraction techniques.",
      "Enabled fast and accurate similarity-based retrieval of visual content."
    ],
    github: "#"
  }
];

export const SKILLS_CORE: string[] = [
  "Supervised/Unsupervised ML",
  "Generative AI, LLMs",
  "Prompt Engineering",
  "Recommender Systems",
  "TensorFlow, PyTorch, Keras",
  "CNNs, RNNs, Transformers",
  "NLTK, spaCy"
];

export const SKILLS_PROGRAMMING = [
  { category: "Languages", items: ["Python", "SQL", "C", "R", "JavaScript", "HTML/CSS"] },
  { category: "Data Analysis", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Tableau"] },
  { category: "Databases & Tools", items: ["MySQL", "MongoDB", "Hadoop", "Spark", "Hive"] }
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Building RAG Agents with LLMs", issuer: "NVIDIA", year: "2025" },
  { name: "AI Vector Search Certified Professional", issuer: "Oracle", year: "2025" },
  { name: "Generative AI Fundamentals", issuer: "Databricks", year: "2025" },
  { name: "Foundations of Prompt Engineering", issuer: "AWS", year: "2025" }
];