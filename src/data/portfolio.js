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
    title: "ConceptMap",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "React Flow"],
    description:
      "A full-stack visual knowledge graph app where users build interactive concept maps with typed relationships and understanding-level tracking.",
    highlights: [
      "Graph-based MongoDB schema with distinct Concept & Connection collections, preventing cascading consistency issues on deletion.",
      "Four-layer REST API (Service → Controller → Route → Server) with real-time graph sync and context-based UI notifications.",
    ],
    image: "/images/conceptmap.jpg",
    link: "https://concept-map-ten.vercel.app/",
    github: "https://github.com/Muizzahmed786/ConceptMap", // add if public
  },
  {
    title: "Aurora'26 Web Portal",
    stack: ["React.js", "Tailwind CSS", "REST API"],
    description:
      "Official website for Aurora'26 by ISTE Manipal, supporting 600+ registrations with team creation, join/leave flows, and full form validation.",
    highlights: [
      "Integrated backend REST APIs for user registration, team management, and form validation.",
      "Built a responsive navbar and footer used consistently across all pages and devices.",
    ],
    image: "/images/aurora.jpg",
    link: "https://github.com/ISTE-26/Aurora-26/",
    github: "https://github.com/ISTE-26/Aurora-26/",
  },
  {
    title: "GitCompass",
    stack: ["React", "FastAPI", "Python", "Supabase", "React Flow", "D3.js"],
    description:
      "A full-stack analytical tool designed for developers to visualize and understand a repository's evolution by mining raw Git history.",
    highlights: [
      "A Python/FastAPI backend utilizing GitPython to efficiently extract and serve tenant-isolated Git metadata via Supabase.",
      "An interactive Vite/React frontend utilizing React Flow and Recharts to render complex architectural maps, interactive timelines, and visual development stories.",
      "Integrated the Gemini AI API to provide intelligent, automated analysis of historical codebase evolution and architectural hotspots."
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