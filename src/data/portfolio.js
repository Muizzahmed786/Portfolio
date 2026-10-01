// ── Portfolio Content ─────────────────────────────────────────────────────
// Edit this file to update your portfolio content.

export const personal = {
  name: "Muizz Ahmed",
  role: "Full-Stack Developer",
  tagline: "Building things for the web.",
  bio: "I'm a pre-final year student pursuing B.Tech in Information Technology student at Manipal Institute of Technology with a passion for full-stack development and systems thinking. I enjoy building products that are both technically solid and genuinely useful",
  email: "mmdmuizzahmed.09.a@gmail.com",
  phone: "+91 8882568682",
  location: "Gurugram, Haryana",
  github: "https://github.com/Muizzahmed786",
  linkedin: "https://www.linkedin.com/in/m-md-muizz-ahmed-080936324/",
  avatar: "/images/profile.jpg",
  handle: "muizzahmed"
};

export const education = [
  {
    institution: "Manipal Institute of Technology",
    degree: "B.Tech in Information Technology",
    duration: "July 2024 – Present",
    location: "Manipal, Karnataka",
    cgpa: 8.93,

    semesters: [
      {
        semester: "Semester I",
        sgpa: 9.00
      },
      {
        semester: "Semester II",
        sgpa: 9.05
      },
      {
        semester: "Semester III",
        sgpa: 8.9
      },
      {
        semester: "Semester IV",
        sgpa: 8.77
      }
    ]
  },

  {
    institution: "KR Mangalam World School",
    degree: "High School Diploma (Grade 12)",
    duration: "April 2018 – April 2024",
    location: "Gurugram, Haryana",
    percentage: 95
  }
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "C", "C++", "SQL", "JavaScript"],
  },
  {
    category: "Web Development",
    items: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      "Git",
      "Vercel",
      "Render",
      "Postman",
      "OpenCV",
    ],
  },
  {
    category: "Libraries",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    category: "Coursework",
    items: [
      "Data Structures",
      "Algorithms",
      "Artificial Intelligence",
      "Computer Networks",
      "Operating Systems",
      "Database Management Systems",
      "Object-Oriented Programming",
    ],
  },
];

export const projects = [
  {
    id: "conceptmap",
    title: "ConceptMap",
    type: "WEB APPLICATION",
    status: "COMPLETED",
    year: "2026",
    tabColor: "#16171B",
    accentColor: "#10B981",
    featured: true,
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "React Flow"],
    description:
      "Built a full-stack application for knowledge graph visualization, using technologies such as React, Node.js, Express and MongoDB, allowing to build concepts nodes and specify relationship types and their level of understanding on the canvas.",
    highlights: [
      "Created a four-layer REST API (Service → Controller → Route → Server) with JWT-based authentication, and used React Flow library for graph visualization, while preserving the memoized node state during render cycles.",
      "Supports real-time graph updates across 50+ concept nodes with no perceptible rendering lag, maintaining smooth pan and zoom interactions through React Flow’s virtualized canvas.",
    ],
    image: "/images/conceptmap.jpg",
    link: "https://concept-map-ten.vercel.app/",
    github: "https://github.com/Muizzahmed786/ConceptMap",
  },
  {
    id: "aurora",
    title: "Aurora'26 Web Portal",
    type: "EVENT PLATFORM",
    status: "ACTIVE",
    year: "2026",
    tabColor: "#16171B",
    accentColor: "#06B6D4",
    stack: ["React.js", "Tailwind CSS", "REST API"],
    description:
      "Built the Hackathon event page and core team management features for Aurora’26 by ISTE Manipal, including user registration, team creation, and join/leave flows with form validation.",
    highlights: [
      "Integrated front-end UI components with backend REST APIs, implementing a responsive navigation bar and footer for uniform layout on all pages.",
      "Successfully handled 600+ registrations for events through the portal, helping to create a smooth user experience during the event.",
    ],
    image: "/images/aurora.jpg",
    link: "https://github.com/ISTE-26/Aurora-26/",
    github: "https://github.com/ISTE-26/Aurora-26/",
  },
  {
    id: "gitcompass",
    title: "GitCompass",
    type: "DEVELOPER TOOL",
    status: "IN DEVELOPMENT",
    year: "2026",
    tabColor: "#16171B",
    accentColor: "#F59E0B",
    stack: ["React", "FastAPI", "Python", "Supabase", "D3.js"],
    description:
      "Co-Developed GitCompass, a repository intelligence tool capable of analyzing up to 500 sequential commits and 2,000 hotspots within the codebase to provide development stories and visual graphs while ensuring strict backend memory consumption limits.",
    highlights: [
      "Platform built using React, Vite, FastAPI, Python, and Supabase. Integrated the Gemini API for automated insights, GitPython for analyzing repositories, JWT for security, Row-Level Security for secure data isolation, and D3.js for interactive visualizations.",
      "Addressed the problem of analyzing unknown codebases through transforming complicated repository history into clear visual insights and AI driven summaries that could help developers shorten their onboarding process and understand the architectural changes.",
    ],
    image: "/images/gitcompass.jpg",
    link: "",
    github: "https://github.com/Muizzahmed786/GitCompass",
  },
];

export const techUrls = {
  "Python": "https://docs.python.org/3/",
  "Java": "https://docs.oracle.com/en/java/",
  "C": "https://en.cppreference.com/w/c",
  "C++": "https://cplusplus.com/doc/",
  "SQL": "https://dev.mysql.com/doc/",
  "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "React.js": "https://react.dev/",
  "React": "https://react.dev/",
  "Node.js": "https://nodejs.org/en/docs",
  "Express.js": "https://expressjs.com/",
  "MongoDB": "https://www.mongodb.com/docs/",
  "HTML": "https://developer.mozilla.org/en-US/docs/Web/HTML",
  "CSS": "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "Tailwind CSS": "https://tailwindcss.com/docs",
  "Git": "https://git-scm.com/doc",
  "Vercel": "https://vercel.com/docs",
  "Render": "https://render.com/docs",
  "Postman": "https://learning.postman.com/docs/introduction/",
  "OpenCV": "https://docs.opencv.org/",
  "Pandas": "https://pandas.pydata.org/docs/",
  "NumPy": "https://numpy.org/doc/",
  "Matplotlib": "https://matplotlib.org/stable/contents.html",
  "FastAPI": "https://fastapi.tiangolo.com/",
  "Supabase": "https://supabase.com/docs",
  "React Flow": "https://reactflow.dev/docs",
  "D3.js": "https://d3js.org/",
  "REST API": "https://developer.mozilla.org/en-US/docs/Glossary/REST"
};