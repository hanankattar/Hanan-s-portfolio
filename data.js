/* ============================================================
   DEFAULT PROJECT DATA (seed only)
   ------------------------------------------------------------
   This file only supplies the STARTING set of projects, the
   first time the site loads in a browser. After that, all
   reads/writes go through js/store.js, which keeps the live
   list in the browser's local storage — so you can add, edit,
   or delete projects from the Admin page (admin.html) any time,
   including new projects you build in the future, without
   touching this file or any HTML.

   To permanently save your changes (so they survive clearing
   browser data, or show up on another computer/browser), use
   the "Export data.js" button on the Admin page and replace
   this file with what it gives you, then re-upload/commit it.

   Field notes:
   - "id" must be unique and URL-safe (lowercase, no spaces).
   - "status" is "done" or "in-progress".
   - "pinned" (optional, true/false) — a pinned project gets its
     own featured section above the regular list (used here for
     the senior project). Leave it out or set false for normal
     projects.
   - "cover" / "gallery" — set by the Admin page when you upload
     images there; can also be a plain path like
     "images/projects/foo.jpg" if you add files manually.
   ============================================================ */

const DEFAULT_PROJECTS = [
  {
    id: "senior-project",
    title: "Memory Thief",
    summary: "An AI-powered assistive system for people with Alzheimer's disease and dementia — a personal memory archive that grows into a daily cognitive assistant.",
    tagline: "My senior/capstone project: an assistive system that helps people with Alzheimer's and dementia hold on to their memories and routines.",
    status: "in-progress",
    pinned: true,
    role: "Senior / capstone project",
    year: "",
    tech: [],
    cover: "",
    gallery: [],
    description: [
      "Memory Thief is my current senior project direction: an AI-powered assistive system for people with Alzheimer's disease and dementia.",
      "It creates a personalized digital memory archive — storing family members, photos, personal stories, important events, routines, and preferences.",
      "The system includes a Raspberry Pi smart device (camera, microphone, speaker, display) that recognizes familiar people and gives the patient their name and relationship, and can record new stories or memories. A companion mobile app lets family members add memories and photos, manage the patient's profile, and receive notifications about important events.",
      "The core idea is that it grows with the patient: it starts as a memory archive, becomes a daily cognitive assistant as the disease progresses, and can preserve the person's stories and voice as a digital legacy.",
      "This project is still in progress — details here will be updated as the build develops."
    ],
    highlights: [
      "Personalized digital memory archive (people, photos, stories, routines)",
      "Raspberry Pi device with camera, mic, speaker, and display for face/voice recognition",
      "Companion mobile app for family members to manage memories and get notifications",
      "Designed to grow with the patient over time, from archive to daily assistant"
    ],
    code: "",
    links: { repo: "", demo: "" }
  },
  {
    id: "crimetracker",
    title: "CrimeTracker",
    summary: "A team-built information management system for crime-related records, delivered as a web, mobile, and desktop application with a shared relational database.",
    tagline: "A crime-record management system delivered across web, mobile, and desktop, backed by one relational database.",
    status: "done",
    role: "Team project — database design & backend logic",
    year: "",
    tech: ["PHP", "MySQL", "JavaScript", "AJAX", "HTML", "CSS"],
    cover: "",
    gallery: [],
    description: [
      "CrimeTracker is a system for entering, organizing, and displaying structured crime-related information — built as a team project and delivered across three platforms: web, mobile, and desktop.",
      "I worked on the relational database design and the SQL queries that store and retrieve records accurately, along with the backend logic connecting the different clients to the shared database.",
      "The system includes statistical dashboards that present the organized data clearly, turning raw entries into readable summaries."
    ],
    highlights: [
      "Delivered as a web, mobile, and desktop application from one shared database",
      "Designed relational database tables for structured record-keeping",
      "Wrote SQL queries to store and retrieve records accurately",
      "Built statistical dashboards on top of the stored data"
    ],
    code: `-- Example: a simplified table from the CrimeTracker schema
CREATE TABLE incidents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  case_type VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  reported_at DATETIME NOT NULL,
  status ENUM('open','closed') DEFAULT 'open'
);`,
    links: { repo: "", demo: "" }
  },
  {
    id: "chess-game",
    title: "Chess Game",
    summary: "Details coming soon.",
    tagline: "Details coming soon.",
    status: "done",
    role: "",
    year: "",
    tech: [],
    cover: "",
    gallery: [],
    description: ["Full write-up coming soon — check back shortly."],
    highlights: [],
    code: "",
    links: { repo: "", demo: "" }
  },
  {
    id: "tripoli-web-app",
    title: "Tripoli Web App",
    summary: "Details coming soon.",
    tagline: "Details coming soon.",
    status: "done",
    role: "",
    year: "",
    tech: [],
    cover: "",
    gallery: [],
    description: ["Full write-up coming soon — check back shortly."],
    highlights: [],
    code: "",
    links: { repo: "", demo: "" }
  },
  {
    id: "knights-tour",
    title: "Knight's Tour Solver",
    summary: "A constraint satisfaction project with a full Pygame GUI: animated solving, live backtrack counters, audio feedback, and multiple algorithms.",
    tagline: "A visual, interactive solver for the classic Knight's Tour problem, comparing multiple search strategies in real time.",
    status: "done",
    role: "University course project (CSP)",
    year: "",
    tech: ["Python", "Pygame"],
    cover: "",
    gallery: [],
    description: [
      "Built for a Constraint Satisfaction Problems course, this project solves the Knight's Tour problem with a full graphical interface rather than just printing a result.",
      "The GUI animates the solving process live, shows a running backtrack counter, and gives audio feedback as the knight moves.",
      "It implements and lets you compare multiple algorithms, including Warnsdorff's Rule, alongside 'Quartet' and 'Junction' strategies."
    ],
    highlights: [
      "Animated, step-by-step visualization of the search process",
      "Live backtrack counter and audio feedback",
      "Multiple interchangeable solving algorithms (Warnsdorff's Rule, Quartet, Junction)"
    ],
    code: "",
    links: { repo: "", demo: "" }
  },
  {
    id: "lebanon-tourism-guide",
    title: "Lebanon Tourism Guide App",
    summary: "A fully documented systems analysis project for a mobile tourism guide, including activity diagrams, class diagrams, and an ERD.",
    tagline: "A systems analysis and design project for a mobile app guiding visitors around Lebanon's attractions.",
    status: "done",
    role: "University course project (CSC 332 — Systems Analysis)",
    year: "",
    tech: ["Systems Analysis & Design", "draw.io", "UML"],
    cover: "",
    gallery: [],
    description: [
      "Completed for CSC 332, this project focused on the systems analysis and design behind a Lebanon tourism guide app rather than a finished build.",
      "Deliverables included activity diagrams, class diagrams, and an entity-relationship diagram (ERD), all modeled in draw.io."
    ],
    highlights: [
      "Activity diagrams mapping user flows through the app",
      "Class diagrams defining the app's object structure",
      "A full entity-relationship diagram (ERD) for the underlying data"
    ],
    code: "",
    links: { repo: "", demo: "" }
  },
  {
    id: "safeguard",
    title: "SafeGuard",
    summary: "A .NET MAUI emergency escalation mobile app with GPS, text-to-speech, inactivity monitoring, and WhatsApp deep-link alerts.",
    tagline: "A cross-platform mobile app that escalates for help automatically when a user goes unresponsive.",
    status: "done",
    role: "Solo project",
    year: "",
    tech: ["C#", ".NET MAUI", "GPS", "Text-to-Speech", "WhatsApp API"],
    cover: "",
    gallery: [],
    description: [
      "SafeGuard is a mobile emergency-escalation app built with .NET MAUI in C#.",
      "It monitors for user inactivity and can trigger an escalation flow automatically, using GPS to share location and text-to-speech for spoken alerts.",
      "Escalation messages are sent through a WhatsApp deep-link integration, so alerts reach a contact directly without needing a custom backend."
    ],
    highlights: [
      "GPS location capture for emergency alerts",
      "Text-to-speech for spoken notifications",
      "Inactivity monitoring that triggers escalation automatically",
      "WhatsApp deep-link integration for sending alerts"
    ],
    code: "",
    links: { repo: "", demo: "" }
  },
  {
    id: "login-system-encryption",
    title: "Login System — Custom Encryption",
    summary: "A login system built around a custom-written algorithm that encrypts data in a specific way of my own design.",
    tagline: "A login system with hand-written encryption logic, rather than relying on a standard library alone.",
    status: "done",
    role: "Solo project",
    year: "",
    tech: [],
    cover: "",
    gallery: [],
    description: [
      "This login system is built around an encryption algorithm I wrote myself, designed to encrypt stored data in a specific way rather than using an off-the-shelf method directly.",
      "Full write-up of the algorithm and implementation coming soon — check back shortly."
    ],
    highlights: [],
    code: "",
    links: { repo: "", demo: "" }
  }
];
