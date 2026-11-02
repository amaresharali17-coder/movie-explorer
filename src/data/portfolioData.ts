import { Project, ExperienceItem, SkillCategory, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Amaresh Arali',
  title: 'Java Full-Stack Developer | Aspiring Software Engineer',
  tagline: 'Building Scalable Java Architectures, Robust Databases & AI-Assisted Solutions',
  heroDescription:
    "I'm a Computer Science Engineering student passionate about building practical software solutions, developing full-stack applications, and exploring AI-powered technologies.",
  email: 'amaresharali17@gmail.com',
  phone: '+91 6361563528',
  phoneDisplay: '+91 6361563528',
  linkedin: 'https://linkedin.com/in/amaresh-arali',
  github: 'https://github.com/amaresharali17-coder',
  location: 'Bengaluru, Karnataka, India',
  resumeUrl: '/Amaresh_Arali_Resume.pdf',
  targetRoles: [
    'Java Developer',
    'Full-Stack Developer',
    'Software Engineer',
    'AI Software Developer',
    'Graduate Software Engineer',
  ],
};

export const MARQUEE_TECH = [
  'JAVA',
  'ADVANCED JAVA',
  'SQL',
  'MYSQL',
  'POSTGRESQL',
  'HTML',
  'CSS',
  'JAVASCRIPT',
  'JDBC',
  'JSP',
  'SERVLETS',
  'OOP',
  'DOCKER',
  'GIT',
  'GOOGLE CLOUD PLATFORM',
  'PYTHON',
];

export const ABOUT_CONTENT = {
  heading: 'ABOUT ME',
  subheading: 'ENGINEERING FOUNDATION & PASSION',
  bio: [
    "I'm Amaresh Arali, a Computer Science and Engineering student at Bangalore College of Engineering and Technology.",
    "I enjoy developing software applications, solving programming problems, and exploring technologies that solve real-world challenges.",
    "My primary focus is Java development, object-oriented programming, database management, and full-stack web application development.",
    "Through my internship and personal projects, I'm continuously improving my technical knowledge and gaining practical software development experience.",
    "I'm particularly interested in software engineering, AI-powered applications, and scalable technology solutions.",
  ],
  highlights: [
    { label: 'Current Role', value: 'AI Software Developer Intern' },
    { label: 'Company', value: 'TAP Academy, Bengaluru' },
    { label: 'Education', value: 'B.E. in CSE (2023 – 2027)' },
    { label: 'Core Specialization', value: 'Java & Full-Stack Systems' },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'PROGRAMMING LANGUAGES',
    iconName: 'Code2',
    description: 'Core syntax and fundamentals for enterprise and web applications.',
    skills: ['Java', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'JAVA DEVELOPMENT',
    iconName: 'Coffee',
    description: 'Server-side application engineering, OOP principles and enterprise patterns.',
    skills: [
      'Core Java',
      'Advanced Java',
      'OOP',
      'JDBC',
      'JSP',
      'Servlets',
      'MVC Architecture',
    ],
  },
  {
    title: 'DATABASES',
    iconName: 'Database',
    description: 'Relational data modeling, query optimization and storage integrity.',
    skills: [
      'MySQL',
      'PostgreSQL',
      'SQL Queries',
      'Joins',
      'Database Design',
      'Relational Databases',
    ],
  },
  {
    title: 'DEVELOPER TOOLS',
    iconName: 'Terminal',
    description: 'Modern development environments, containerization and cloud tooling.',
    skills: [
      'Eclipse',
      'IntelliJ IDEA',
      'Visual Studio Code',
      'Visual Studio',
      'Git',
      'Docker',
      'Google Cloud Platform',
    ],
  },
  {
    title: 'OTHER SKILLS',
    iconName: 'Cpu',
    description: 'Analytical execution, modern workflows and AI acceleration.',
    skills: [
      'Problem Solving',
      'Full-Stack Development',
      'AI-Assisted Development',
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'tap-academy',
    company: 'TAP Academy',
    role: 'AI Software Developer Intern',
    location: 'Bengaluru, Karnataka',
    duration: 'April 2026 – Present',
    type: 'Internship',
    highlights: [
      'Developing and maintaining projects using Core Java, Advanced Java and MySQL.',
      'Applying object-oriented design and database-driven application logic.',
      'Building responsive front-end interfaces and integrating them with Java backend services.',
      'Using AI tools to accelerate coding, debugging and testing.',
      'Delivering web projects through prompt-driven and iterative development.',
      'Working on the in-house TAI platform in a structured project-based environment.',
    ],
    technologies: [
      'Core Java',
      'Advanced Java',
      'MySQL',
      'JDBC',
      'OOP',
      'TAI Platform',
      'AI-Assisted Dev',
    ],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'tantra-luxe',
    number: '01',
    title: 'TANTRA LUXE',
    subtitle: 'Fashion E-Commerce Web Application',
    category: 'Full-Stack Development',
    technologies: [
      'Java 21',
      'Jakarta Servlets',
      'JSP',
      'JDBC',
      'MySQL',
      'Apache Tomcat 10.1',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
    description:
      'Developed a full-stack fashion e-commerce web application with MVC architecture, relational database integration and product management functionality.',
    duration: 'June 2026 – July 2026',
    keyFeatures: [
      'Implemented robust Model-View-Controller (MVC) architectural pattern separating business logic from view rendering.',
      'Designed an 8-table interconnected MySQL relational schema with primary and foreign key constraints.',
      'Built interactive product catalog with search, categorization, and sorting filters.',
      'Implemented category-based filtering and size-specific product variant matrices.',
      'Integrated real-time inventory management with stock level tracking.',
      'Configured and deployed backend server on Apache Tomcat 10.1 using Java 21, Jakarta Servlets, JSP and MySQL JDBC.',
    ],
    architecture: [
      'View Layer: Responsive JSP Pages with CSS3 & JS',
      'Controller Layer: Jakarta Servlets handling HTTP routing & session management',
      'Model Layer: Java Beans & DAO (Data Access Object) pattern',
      'Persistence: JDBC connection pooling to 8-table MySQL database',
    ],
    mockupType: 'ecommerce',
    isUpcomingOrPrivate: true,
  },
  {
    id: 'fileless-malware-detection',
    number: '02',
    title: 'FILELESS MALWARE DETECTION & EVIDENCE INTEGRITY SYSTEM',
    subtitle: 'Memory Forensics and Evidence Integrity System',
    category: 'AI | Cybersecurity | Blockchain',
    status: 'IN PROGRESS',
    technologies: [
      'Deep Learning',
      'Memory Forensics',
      'SHA-256',
      'Blockchain Ledger',
      'Python',
      'Volatile Memory Analysis',
    ],
    description:
      'Developing a live memory forensics system to detect fileless malware and maintain the integrity of digital forensic evidence through blockchain-based verification.',
    duration: 'June 2026 – Present',
    keyFeatures: [
      'Capturing live volatile RAM dumps from active running operating systems without disk alteration.',
      'Extracting running processes, injected dynamic link libraries (DLLs), and hidden threads from memory dumps.',
      'Developing a deep learning neural classifier to distinguish benign execution patterns from malicious fileless behavioral anomalies.',
      'Integrating SHA-256 cryptographic hashing for tamper-proof digital evidence fingerprints.',
      'Storing evidence hashes, Unix timestamps, and tamper-resistant evidence IDs onto an immutable blockchain ledger.',
      'Building an automated verification module to validate complete forensic chain of custody and evidence integrity.',
    ],
    architecture: [
      'Capture Engine: Volatile memory acquisition subsystem',
      'Extraction Pipeline: Memory artifact parser (Processes, DLLs, Threads)',
      'Inference Engine: Deep neural network for behavior classification',
      'Integrity Ledger: Blockchain timestamping with SHA-256 hash chains',
    ],
    mockupType: 'cybersecurity',
    isUpcomingOrPrivate: false,
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'bcet',
    degree: 'Bachelor of Engineering – Computer Science and Engineering',
    institution: 'Bangalore College of Engineering and Technology',
    location: 'Bengaluru, Karnataka',
    duration: '2023 – 2027',
    details: [
      'Focusing on Object-Oriented Programming, Data Structures & Algorithms, DBMS, and Operating Systems.',
      'Actively developing practical software architectures, backend services, and AI systems.',
    ],
  },
  {
    id: 'jnv',
    degree: 'Class 12 – Science',
    institution: 'Jawahar Navodaya Vidyalaya',
    location: 'Kuknoor, Koppal',
    duration: '2023',
    details: [
      'Specialized in Physics, Chemistry, Mathematics, and Computer Science.',
      'Developed strong analytical problem-solving foundation in STEM curriculum.',
    ],
  },
];
