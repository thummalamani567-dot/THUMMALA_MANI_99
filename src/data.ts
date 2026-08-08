import profileImage from '../assets/"C:\Users\manit\OneDrive\Pictures\mani 9.jpeg"';

const profileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <!-- Background Gradient: Clean professional studio gray -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#E2E8F0" />
      <stop offset="60%" stop-color="#CBD5E1" />
      <stop offset="100%" stop-color="#94A3B8" />
    </radialGradient>
    
    <!-- Skin Shadows and Highlights -->
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F2C1A2" />
      <stop offset="100%" stop-color="#D49975" />
    </linearGradient>
    <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E2238" />
      <stop offset="100%" stop-color="#0F111D" />
    </linearGradient>
    <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2D2828" />
      <stop offset="100%" stop-color="#1A1717" />
    </linearGradient>

    <!-- Subtle blur filter for background elements -->
    <filter id="bgBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="500" fill="url(#bgGlow)" />

  <!-- Background Office Details & Slogan Words from his real background -->
  <!-- "FOCUS", "PLAN", "EXECUTE", "SUCCEED" blurred in the background -->
  <g filter="url(#bgBlur)" opacity="0.12">
    <text x="340" y="150" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#1E293B">FOCUS</text>
    <text x="340" y="200" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#1E293B">PLAN</text>
    <text x="340" y="250" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#1E293B">EXECUTE</text>
    <text x="340" y="300" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="#1E293B">SUCCEED</text>
  </g>

  <!-- Shoulders / Body -->
  <!-- Suit Jacket -->
  <path d="M 120 500 C 120 400 160 350 210 340 L 230 390 L 270 390 L 290 340 C 340 350 380 400 380 500 Z" fill="url(#suitGrad)" />
  
  <!-- Lapels -->
  <path d="M 185 365 L 225 345 L 240 430 L 195 500 Z" fill="#131624" />
  <path d="M 315 365 L 275 345 L 260 430 L 305 500 Z" fill="#131624" />

  <!-- White Shirt -->
  <polygon points="225,345 200,380 230,390" fill="#FFFFFF" />
  <polygon points="275,345 300,380 270,390" fill="#FFFFFF" />
  <polygon points="230,345 270,345 270,390 230,390" fill="#F8FAFC" />

  <!-- Black Tie -->
  <!-- Tie Knot -->
  <polygon points="240,358 260,358 256,380 244,380" fill="#18181B" />
  <!-- Tie Tail -->
  <polygon points="244,380 256,380 262,500 238,500" fill="#09090B" />

  <!-- Neck -->
  <path d="M 220 310 L 280 310 L 275 350 L 225 350 Z" fill="#E2A27F" />
  <!-- Shadow under chin -->
  <path d="M 220 310 Q 250 330 280 310 L 275 318 Q 250 338 225 318 Z" fill="#C48360" />

  <!-- Head Structure -->
  <!-- Ears -->
  <path d="M 185 220 Q 170 230 185 255 Z" fill="#D49975" />
  <path d="M 315 220 Q 330 230 315 255 Z" fill="#D49975" />
  
  <!-- Face (Thummala Mani) -->
  <path d="M 185 210 Q 185 305 250 325 Q 315 305 315 210 Q 315 155 250 155 Q 185 155 185 210 Z" fill="url(#skinGrad)" />

  <!-- Nose -->
  <path d="M 245 210 L 245 255 Q 250 260 255 255" stroke="#C48360" stroke-width="3" fill="none" stroke-linecap="round" />
  <path d="M 238 253 Q 250 257 262 253" stroke="#C48360" stroke-width="2" fill="none" />

  <!-- Eyes & Eyebrows -->
  <!-- Left Eyebrow -->
  <path d="M 200 195 Q 220 183 235 195" stroke="#1A1717" stroke-width="6" fill="none" stroke-linecap="round" />
  <!-- Right Eyebrow -->
  <path d="M 265 195 Q 280 183 300 195" stroke="#1A1717" stroke-width="6" fill="none" stroke-linecap="round" />

  <!-- Left Eye -->
  <ellipse cx="220" cy="210" rx="14" ry="7.5" fill="#FFFFFF" stroke="#2D2828" stroke-width="1.5" />
  <circle cx="220" cy="210" r="7" fill="#4A3B32" />
  <circle cx="220" cy="210" r="3.5" fill="#1A1717" />
  <circle cx="223" cy="207" r="1.5" fill="#FFFFFF" />

  <!-- Right Eye -->
  <ellipse cx="280" cy="210" rx="14" ry="7.5" fill="#FFFFFF" stroke="#2D2828" stroke-width="1.5" />
  <circle cx="280" cy="210" r="7" fill="#4A3B32" />
  <circle cx="280" cy="210" r="3.5" fill="#1A1717" />
  <circle cx="277" cy="207" r="1.5" fill="#FFFFFF" />

  <!-- Lips and Mouth -->
  <path d="M 230 282 Q 250 292 270 282" stroke="#B45C4F" stroke-width="4.5" fill="none" stroke-linecap="round" />
  <path d="M 235 282 Q 250 285 265 282" stroke="#903F34" stroke-width="2.5" fill="none" />

  <!-- Mustache -->
  <!-- Neatly trimmed, mustache slightly curving over lips -->
  <path d="M 225 272 Q 250 263 275 272 C 265 280 235 280 225 272 Z" fill="#242121" />

  <!-- Beard & Stubble on Jawline and Chin -->
  <!-- A neat short beard with mustache connection -->
  <path d="M 185 230 Q 190 305 250 327 Q 310 305 315 230 C 312 280 285 312 250 312 C 215 312 188 280 185 230 Z" fill="#1E1C1C" opacity="0.85" />
  <!-- Chin Beard Accent -->
  <path d="M 238 296 L 262 296 L 256 312 L 244 312 Z" fill="#111" />

  <!-- Hair (Side-swept voluminous, stylish crop) -->
  <path d="M 183 220 C 165 170 190 120 250 115 C 300 110 325 130 318 190 C 310 160 295 145 275 140 C 240 130 205 145 183 220 Z" fill="url(#hairGrad)" />
  <path d="M 183 210 C 170 160 200 110 255 105 C 310 100 328 125 320 180 C 314 150 298 135 278 132 C 245 125 210 135 183 210 Z" fill="#151313" />
</svg>`;

export const personalData: PersonalData = {
  name: "Thummala Mani",
  title: "Modern Web Platforms",
  subtitle: "High-performance websites and applications designed for ambitious startups.",
  imaimagePlaceholder: profileImage,// permanent profile image
  bio: "I design and develop modern websites and mobile applications that combine stunning design with powerful functionality. My goal is to build fast, secure, scalable, and user-focused digital experiences that help individuals, startups, and businesses grow online.",
  subBio: "I specialize in designing and developing modern websites and mobile applications that combine exceptional performance with elegant design. From responsive frontends and secure backends to optimized databases and scalable architectures, I build digital products that are fast, reliable, user-friendly, and engineered for long-term success.",
  email: "thummalamani567@gmail.com",
  phone: "+91 98765 43210", // representative Indian mobile number
  linkedin: "https://www.linkedin.com/in/thummala-mani", // placeholder link
  github: "https://github.com/thummalamani", // placeholder or real link
  resumeUrl: "#", // clickable anchor triggers download or view
};

// Helper to get active profile data
export const getActiveProfile = (): PersonalData => {
  return personalData;
};

// Helper stub for backward compatibility
export const saveProfileData = (_data: Partial<PersonalData>) => {
  // Editing profile avatar or data is disabled
};


export const skillsData: Skill[] = [
  { name: "Python", category: "Technical", level: 92, iconName: "Terminal" },
  { name: "Data Structures", category: "Technical", level: 88, iconName: "Cpu" },
  { name: "Problem Solving", category: "Technical", level: 90, iconName: "Brain" },
  { name: "JavaScript", category: "Technical", level: 85, iconName: "Code" },
  { name: "HTML / CSS", category: "Technical", level: 90, iconName: "FileCode" },
  { name: "React & Node.js", category: "Practical", level: 82, iconName: "Database" },
  { name: "Git & Version Control", category: "Practical", level: 85, iconName: "GitBranch" },
  { name: "Linux & Shell Scripting", category: "Practical", level: 80, iconName: "Settings" },
  { name: "Communication Skills", category: "Soft Skills", level: 93, iconName: "MessageSquare" },
  { name: "Team Collaboration", category: "Soft Skills", level: 88, iconName: "Users" },
  { name: "Time Management", category: "Soft Skills", level: 85, iconName: "Clock" },
];

export const statsData: StatItem[] = [
  { label: "DSA Problems Solved", value: "----", suffix: "", description: "Across LeetCode, HackerRank", iconName: "Flame" },
  { label: "Academic CGPA", value: "----", suffix: "", description: "Computer Science Major", iconName: "GraduationCap" },
  { label: "Completed Projects", value: "----", suffix: "", description: "Active repositories & web portals", iconName: "Briefcase" },
  { label: "Coding Hours Accumulated", value: "----", suffix: "", description: "Hands-on engineering commits", iconName: "Clock" },
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "DSA VisuEngine: Graph and Tree Visualizer",
    description: "An interactive, web-based state machine that visualizes sorting, graph traversal algorithms (Dijkstra, BFS, DFS), and binary tree balances in real-time.",
    longDescription: "Built specifically to help students visualize structural state transitions. Users can interactively draw nodes, place weighted routes, adjust traversal speeds, and step backward or forward through standard queue/stack updates.",
    tags: ["TypeScript", "React", "motion", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#",
    githubUrl: "https://github.com/thummalamani/dsa-visualizer",
    category: "Algorithms",
    featured: true
  },
  {
    id: "proj-2",
    title: "EcoSphere: Intelligent Supply Chain CRM",
    description: "A gorgeous full-stack responsive web dashboard built with analytics widgets tracking inventory optimization, sustainability indexing, and delivery chains.",
    longDescription: "A smart workspace focusing on carbon footprint simulation in local delivery fleets. Integrates rich interactive charts showing shipment trends, driver routing recommendations, and modern CSV report generators.",
    tags: ["React", "Express", "Recharts", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#",
    githubUrl: "https://github.com/thummalamani/ecosphere-crm",
    category: "Web Dev",
    featured: true
  },
  {
    id: "proj-3",
    title: "PyScope: Python Lexical Code Analyzer",
    description: "A Python automation tool that lexes and parses code structures to render structural indentation mapping, complexity statistics, and unused imports.",
    longDescription: "Implemented using local parsing and regular expression tokenization, this Python script reads script source code and produces a formatted markdown report detailing time-complexity warning indicators and style scores.",
    tags: ["Python", "AST", "CLI", "Regex Rules"],
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#",
    githubUrl: "https://github.com/thummalamani/pyscope-analyzer",
    category: "AI & ML",
    featured: true
  },
  {
    id: "proj-4",
    title: "NextCheck: Developer Task Orchestrator",
    description: "Multi-client task manager utilizing structural local storage workspaces, category filtering, priority metrics, and beautiful fade animations.",
    longDescription: "A minimalist workspace application supporting markdown notes, active focus pomodoro countdown tags, and progress logs aimed at helping CSE students manage assignment targets.",
    tags: ["React", "Tailwind CSS", "LocalStorage", "lucide-icons"],
    imageUrl: "https://images.unsplash.com/photo-1484417894907-623942c8ea29?auto=format&fit=crop&q=80&w=800",
    liveUrl: "#",
    githubUrl: "https://github.com/thummalamani/nextcheck",
    category: "Web Dev",
    featured: false
  }
];

export const educationHistory: EducationTimelineItem[] = [
  {
    id: "edu-1",
    institution: "St. John's College of Engineering & Technology",
    degree: "B.Tech of Computer Science & Engineering",
    fieldOfStudy: "Algorithms, Database Systems, Computer Networks & AI",
    duration: "2023 - Present",
    grade: "9.12 CGPA (Pre-Final Year)",
    description: "Undertaking specialized course study focus. High academic performer with active contributions to coding panels, programming workshops, and peer teaching initiatives.",
    bulletPoints: [
      "Secured rank in top ---- of CSE department",
      "Executive Lead of student-led Technical Club organizing mini-hackathons",
      "Core courses: Algorithms, Database Management, Operating Systems, Computer Architecture"
    ],
    iconType: "university"
  },
  {
    id: "edu-2",
    institution: "Sri Chaitanya Junior Academy College",
    degree: "Intermediate Board Certification (MPC Block)",
    fieldOfStudy: "Mathematics, Physics, Chemistry stream",
    duration: "2021 - 2023",
    grade: "---- Percentile",
    description: "Completed rigorous preparatory program specializing in analytical mathematics and general physics problems.",
    bulletPoints: [
      "Excellent mastery in Calculus, Linear Algebra, and mechanics principles",
      "Perfect grade score in Mathematics segment board exams"
    ],
    iconType: "college"
  },
  {
    id: "edu-3",
    institution: "High School of Academic Excellence",
    degree: "Secondary School Certificate (SSC)",
    fieldOfStudy: "General Academic Curriculum",
    duration: "2021",
    grade: "10 / 10 GPA",
    description: "Initial foundation year building scientific curiosity and foundational logical faculties.",
    bulletPoints: [
      "Secured perfect CGPA score in state board evaluation",
      "Championed local state mathematics olympiad"
    ],
    iconType: "school"
  }
];

export const achievementsList: AchievementItem[] = [
  {
    id: "ach-1",
    title: "HackerRank Problem Solving Champion",
    issuer: "HackerRank Certification Board",
    date: "Dec 2024",
    description: "Earned 5-Star Gold Badges in both Problem Solving and Python core challenges, answering complex tree traversal and dynamic programming queries.",
    category: "Certification"
  },
  {
    id: "ach-2",
    title: "Smart India Hackathon (SIH) Finalist",
    issuer: "Ministry of Education CSE Org",
    date: "Sep 2024",
    description: "Part of the 5-member team that designed a offline-resilient agricultural supply logistic monitor using geo-located SMS queues for rural farmers.",
    category: "Hackathon"
  },
  {
    id: "ach-3",
    title: "NPTEL National Certification - DS & Algorithms (Elite+Silver)",
    issuer: "IIT Kharagpur Academic Board",
    date: "Apr 2024",
    description: "Earned a national rank scoring ---- in a highly competitive 12-week course assessing advanced graph mechanics, recursion trees, and sorting limits.",
    category: "Certification"
  },
  {
    id: "ach-4",
    title: "LeetCode Milestone Badge: 400+ Solved",
    issuer: "LeetCode Online Evaluator",
    date: "Ongoing",
    description: "Regularly practice dynamic programming, arrays, two-pointer math and graph problems. Rank among top ---- global practitioners on competitive submissions.",
    category: "Milestone"
  }
];
