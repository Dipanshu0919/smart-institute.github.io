const COURSE_DATA ={
  "categories": [
    { "id": "all", "label": "All" },
    { "id": "fullstack", "label": "Full Stack Development" },
    { "id": "dev", "label": "Software Development" },
    { "id": "mobile", "label": "Mobile App Development" },
    { "id": "cloud", "label": "Cloud & DevOps" },
    { "id": "infra", "label": "Networking & Security" },
    { "id": "cybersecurity", "label": "Cyber Security" },
    { "id": "data-science", "label": "Data Science" },
    { "id": "data-analytics", "label": "Data Analytics" },
    { "id": "ai", "label": "AI & Prompt Engineering" },
    { "id": "design", "label": "UI/UX Designing" },
    { "id": "creative", "label": "Creative & Content" },
    { "id": "office", "label": "Office & Business (DCA/ITFT)" },
    { "id": "marketing", "label": "Digital Marketing" }
  ],
  "courses": [
    {
      "id": "java-fullstack",
      "category": "fullstack",
      "tag": "Full Stack Development",
      "level": "",
      "title": "Java Full Stack Development",
      "summary": "Front-end: HTML, CSS, JavaScript with Angular or Vue.js. Back-end: Node.js with MongoDB, ending in live website hosting.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Front-End Development", "items": ["HTML, CSS, JavaScript", "Front-End Framework: Angular", "Front-End Framework: Vue.js"] },
        { "heading": "Back-End Development", "items": ["Node.js", "Database Connectivity Tools: MongoDB", "Live Website Hosting"] }
      ]
    },
    {
      "id": "php-fullstack",
      "category": "fullstack",
      "tag": "Full Stack Development",
      "level": "",
      "title": "PHP Full Stack Development",
      "summary": "Front-end: HTML, CSS, JavaScript with React or Bootstrap. Back-end: PHP with MySQL, ending in live website hosting.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Front-End Development", "items": ["HTML, CSS, JavaScript", "Front-End Framework: React", "Front-End Framework: Bootstrap"] },
        { "heading": "Back-End Development", "items": ["PHP", "Database Connectivity Tools: MySQL", "Live Website Hosting"] }
      ]
    },
    {
      "id": "python-fullstack",
      "category": "fullstack",
      "tag": "Full Stack Development",
      "level": "",
      "title": "Python Full Stack Development",
      "summary": "Front-end: HTML, CSS, JavaScript with React. Back-end: Python with Django/Flask and SQL, ending in live website hosting.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Front-End Development", "items": ["HTML, CSS, JavaScript", "Front-End Framework: React"] },
        { "heading": "Back-End Development", "items": ["Python, Django / Flask", "Database Connectivity Tools: SQL", "Live Website Hosting"] }
      ]
    },
    {
      "id": "web-programming",
      "category": "dev",
      "tag": "Web Development",
      "level": "",
      "title": "Web Programming",
      "summary": "Notepad and Sublime workflow through HTML5, CSS3, JavaScript, PHP, WordPress and advanced internet skills.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Notepad", "Sublime", "HTML5", "CSS3", "Java Script", "PHP", "WordPress", "Advance Internet", "Website Hosting (FTP)", "Live Projects"] }
      ]
    },
    {
      "id": "c-cpp",
      "category": "dev",
      "tag": "Programming",
      "level": "",
      "title": "C & C++ Programming",
      "summary": "Core programming logic, data structures and problem-solving - the foundation most tech careers start on.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Programming fundamentals", "Control structures & functions", "Arrays, pointers & structures", "Object-oriented basics (C++)", "Data structures fundamentals", "Practice assignments & exam"] }
      ]
    },
    {
      "id": "core-advance-java",
      "category": "dev",
      "tag": "Programming",
      "level": "",
      "title": "Core & Advance Java",
      "summary": "Object-oriented fundamentals through advanced concepts - ready for interviews and Java full-stack work.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Core Java: OOP, collections, exception handling", "Multithreading & file handling", "Advance Java: Servlets & JSP basics", "Database connectivity (JDBC)", "Interview preparation & mock tests"] }
      ]
    },
    {
      "id": "dotnet",
      "category": "dev",
      "tag": "Programming",
      "level": "",
      "title": ".Net Programming",
      "summary": "C# and the .Net framework for building enterprise-style desktop and web applications.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["C# language fundamentals", "Object-oriented programming in .Net", "Windows Forms / desktop applications", "ASP.Net web application basics", "Hands-on project work"] }
      ]
    },
    {
      "id": "mysql",
      "category": "dev",
      "tag": "Database",
      "level": "",
      "title": "MySQL",
      "summary": "Relational database design, queries and administration - the database skill every developer needs.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Database design fundamentals", "SQL queries & joins", "Stored procedures & functions", "Indexing & performance basics", "Database administration basics"] }
      ]
    },
    {
      "id": "python-programming",
      "category": "dev",
      "tag": "Programming",
      "level": "",
      "title": "Python Programming",
      "summary": "Core syntax to automation, file handling and APIs - a strong base for web, data and DevOps work alike.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Python syntax & core concepts", "Functions, file handling & modules", "Automation scripting", "Working with APIs", "Mini projects & assignments"] }
      ]
    },
    {
      "id": "cloud-devops",
      "category": "cloud",
      "tag": "Cloud & DevOps",
      "level": "",
      "title": "Cloud Computing & DevOps",
      "summary": "A four-module program: Windows Server & Linux networking, core cloud concepts across AWS/Azure/GCP, hands-on Azure & AWS administration, and DevOps & cloud architecture.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Module 1 - Win Server & Linux Networks", "items": [
          "Basics of Server Management",
          "LAN, MAN and WAN",
          "OSI Layers",
          "Distributed Systems: Network, Internet",
          "Web Service and Security",
          "Distributed File System",
          "DFS and Distributed Algorithms",
          "High Performance Computing: Programming Models, Cluster Computing",
          "Grid Programming, Parallelism",
          "Information Storage Management: RAID and Levels",
          "Backup, Recovery & Replication",
          "Interfacing with Virtualization",
          "Cloud Computing Tools & Techniques"
        ]},
        { "heading": "Module 2 - Core Cloud Concepts", "items": [
          "Introduction to Cloud Computing",
          "Cloud Service Providers: AWS, GCP, Microsoft Azure",
          "Cloud Computing Architecture: Virtualization, Virtual Machines, Containers, Serverless Computing",
          "Cloud Security and Compliance",
          "Cloud Storage and Databases",
          "Networking and Connectivity",
          "Monitoring and Management",
          "Cloud Migration and DevOps",
          "Cost Optimization",
          "Case Studies and Best Practices"
        ]},
        { "heading": "Module 3 - Azure & AWS Administration", "items": [
          "Azure Infrastructure Deployment and Management",
          "Azure Identity and Access Management",
          "Azure Networking, Storage Solutions & Virtual Machines",
          "Azure Monitoring and Security",
          "AWS Identity and Access Management",
          "AWS Networking and Compute Services",
          "AWS Storage and Content Delivery",
          "AWS Database Services",
          "AWS Monitoring and Security",
          "AWS High Availability and Fault Tolerance",
          "Cost Optimization, Case Studies and Best Practices"
        ]},
        { "heading": "Module 4 - DevOps and Cloud Architecture", "items": [
          "Cloud Architecture Design Patterns",
          "Infrastructure as Code",
          "Continuous Integration and Continuous Deployment",
          "Containerization and Orchestration",
          "Cloud Migration",
          "Security and Compliance",
          "Monitoring, Logging and Analytics",
          "High Availability and Disaster Recovery"
        ]}
      ]
    },
    {
      "id": "hardware-networking",
      "category": "infra",
      "tag": "A+ N+",
      "level": "",
      "title": "Computer Hardware & Networking",
      "summary": "CompTIA A+ and Network+ foundations - hardware troubleshooting and core networking concepts.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["PC hardware assembly & troubleshooting", "Operating system installation & support", "Networking fundamentals", "Network devices & cabling", "TCP/IP basics", "Exam-oriented practice"] }
      ]
    },
    {
      "id": "ccna",
      "category": "infra",
      "tag": "CCNA",
      "level": "",
      "title": "Cisco Certified Network Associate",
      "summary": "Routing, switching and network fundamentals on real lab hardware, mapped to official CCNA topics.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Networking fundamentals", "Routing & switching concepts", "IP addressing & subnetting", "Network security fundamentals", "Automation & programmability basics", "Hands-on lab practice"] }
      ]
    },
    {
      "id": "mcsa",
      "category": "infra",
      "tag": "MCSA",
      "level": "",
      "title": "Microsoft Certified Solutions Associate",
      "summary": "Windows Server administration and management, mapped to Microsoft's official certification path.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Windows Server installation & configuration", "Active Directory administration", "Storage & file services", "Network services administration", "Exam-oriented practice"] }
      ]
    },
    {
      "id": "linux-redhat",
      "category": "infra",
      "tag": "Linux",
      "level": "",
      "title": "Red Hat & Kali Linux Administration",
      "summary": "Linux system administration on Red Hat and Kali - the OS skills behind every server and security role.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Linux fundamentals & shell scripting", "User & file system administration", "Red Hat server administration", "Kali Linux security tools overview", "Hands-on lab practice"] }
      ]
    },
    {
      "id": "ceh",
      "category": "cybersecurity",
      "tag": "C|EH",
      "level": "",
      "title": "Certified Ethical Hacker",
      "summary": "Vulnerability assessment and penetration testing fundamentals, practiced in a contained lab environment.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Ethical hacking fundamentals & footprinting", "Scanning networks & vulnerability analysis", "System hacking techniques", "Web application & network attacks", "Practical lab exercises & exam prep"] }
      ]
    },
    {
      "id": "chfi",
      "category": "cybersecurity",
      "tag": "C|HFI",
      "level": "",
      "title": "Computer Hacking Forensic Investigator",
      "summary": "Digital forensics - evidence collection, incident investigation and reporting for cybersecurity incidents.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Computer forensics fundamentals", "Evidence collection & chain of custody", "Investigating file systems & operating systems", "Network & cloud forensics basics", "Case-based lab exercises"] }
      ]
    },
    {
      "id": "cnd",
      "category": "cybersecurity",
      "tag": "C|ND",
      "level": "",
      "title": "Certified Network Defender",
      "summary": "Defensive network security - protecting, detecting and responding to threats across an organization's network.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Network security fundamentals & protocols", "Network defense management", "Threat detection & response", "Firewalls, IDS/IPS & VPN basics", "Defense-focused lab exercises"] }
      ]
    },
    {
      "id": "cct",
      "category": "cybersecurity",
      "tag": "C|CT",
      "level": "",
      "title": "Certified Cybersecurity Technician",
      "summary": "Entry-level cybersecurity fundamentals across networking, security operations and system administration.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Information security fundamentals", "Network security basics", "Identity & access management basics", "Security operations fundamentals", "Foundational lab exercises"] }
      ]
    },
    {
      "id": "eces",
      "category": "cybersecurity",
      "tag": "E|CES",
      "level": "",
      "title": "Certified Encryption Specialist",
      "summary": "Cryptography fundamentals and applied encryption techniques used to secure data and communications.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Cryptography fundamentals", "Symmetric & asymmetric encryption", "Hashing algorithms", "PKI and digital certificates", "Applied cryptography lab exercises"] }
      ]
    },
    {
      "id": "cpent",
      "category": "cybersecurity",
      "tag": "C|PENT",
      "level": "",
      "title": "Certified Penetration Testing Professional",
      "summary": "Advanced, hands-on penetration testing across networks, applications and cloud environments.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["Advanced network penetration testing", "Web application penetration testing", "Cloud penetration testing basics", "Exploitation & post-exploitation techniques", "Advanced hands-on lab exercises"] }
      ]
    },
    {
      "id": "office-automation",
      "category": "office",
      "tag": "DCA",
      "level": "",
      "title": "Advance Office Automation",
      "summary": "Computer basics, English typing, Notepad/WordPad, MS Word, Excel & PowerPoint, printing, hardware and network concepts, and internet skills (email, surfing, downloading, uploading).",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": [
          "Computer Basics",
          "English Typing",
          "Notepad, WordPad",
          "Microsoft Word",
          "Microsoft Excel",
          "Microsoft PowerPoint",
          "Printing Method",
          "Hardware Concept",
          "Network Concept",
          "Internet: Email ID, Surfing, Downloading, Uploading etc.",
          "Assignment & Exam"
        ]}
      ]
    },
    {
      "id": "advanced-excel",
      "category": "office",
      "tag": "Office Tools",
      "level": "",
      "title": "Advanced Excel",
      "summary": "Data consolidation, validation, H/VLookup, workbook sharing & protection, automation, goal seek, references & links, pivot tables, macros, what-if analysis, data tables and scenarios.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": [
          "Consolidate Data",
          "Data Validation",
          "H/VLookup",
          "Sharing Workbooks",
          "Protecting Workbooks",
          "Automating Workbook",
          "Goal Seek",
          "References and Links",
          "Pivot Tables",
          "Reports & Forms",
          "Macro",
          "What-If Analysis",
          "Evaluate Formula",
          "Creating Sparklines",
          "Mapping Data",
          "Data Tables",
          "Scenarios"
        ]}
      ]
    },
    {
      "id": "graphics-dtp",
      "category": "office",
      "tag": "Design",
      "level": "",
      "title": "Graphics (DTP)",
      "summary": "Typing in Hindi/Marathi/English, MS Paint, CorelDRAW (logos, banners, visiting & wedding cards), Photoshop (photo editing, posters, text effects) and Illustrator.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": [
          "Typing (Hindi/Marathi/English)",
          "Painting Using MS Paint",
          "CorelDRAW: Logo, Banner, Visiting Card, Wedding Card",
          "Photoshop: Photo Editing, Poster Making, Text Effect",
          "Illustrator",
          "Assignment & Project",
          "Exam"
        ]}
      ]
    },
    {
      "id": "tally-erp9",
      "category": "office",
      "tag": "Tally ERP 9",
      "level": "",
      "title": "Tally ERP 9 - Financial Accounting",
      "summary": "Intro to accounting, company creation, trial balance, order processing, voucher entries, godown & stock journal, receipt/delivery notes, price lists, batch details, tax ledger and cheque printing.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": [
          "Introduction to Accounting",
          "Company Creation",
          "Trial Balance",
          "Order Processing",
          "Voucher Entries",
          "Godown Entry",
          "Receipt Note",
          "Delivery Note",
          "Rejection In/Out Note",
          "Manufacturing Journal",
          "Inventory Note",
          "Stock Journal",
          "Price List",
          "Discount",
          "Batch Wise Details",
          "Interest Calculation",
          "Tax Ledger",
          "Cheque Printing"
        ]}
      ]
    },
    {
      "id": "tally-prime-gst",
      "category": "office",
      "tag": "Tally Prime",
      "level": "",
      "title": "Advance Tally Prime & GST",
      "summary": "Ledgers, stock & voucher entry, multi-currency, cost centers, point of sale, payroll, budgets and reports, plus full GST - SGST, CGST, IGST and UTGST - with F11/F12 configuration.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": [
          "Ledger",
          "Stock Entry",
          "Voucher Entry",
          "Debit-Credit Note",
          "Stock-Physical Journal",
          "Price List",
          "Batch Wise Details",
          "Actual & Bill Quantity",
          "MRS",
          "Multi Currency",
          "Cost Center",
          "Point of Sale",
          "Scenarios Management",
          "Zero Value Entry",
          "Payroll",
          "Budget",
          "Reports",
          "Excise for Dealers",
          "Tax Invoice",
          "F11 Features",
          "F12 Configuration",
          "Export Data to Excel",
          "GST: SGST, CGST, IGST, UTGST",
          "Practice & Assignment"
        ]}
      ]
    },
    {
      "id": "digital-marketing",
      "category": "marketing",
      "tag": "Digital Marketing",
      "level": "",
      "title": "Digital Marketing",
      "summary": "From fundamentals, website planning and SEO through social media, email, PPC, affiliate & influencer marketing, growth hacking and AI-driven digital marketing - with Google Ads & Analytics practice.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Module 1", "items": [
          "Fundamental of Digital Marketing",
          "Website Planning & Analysis",
          "Website Design and Development",
          "Search Engine Optimization",
          "Social Media Optimization",
          "Online Reputation Management",
          "Web Analytics",
          "Blogging",
          "Google AdSense",
          "Google Adword",
          "Video Advertising",
          "App Store Optimization"
        ]},
        { "heading": "Module 2", "items": [
          "Search Engine Marketing",
          "Social Media Marketing",
          "Content Marketing",
          "Email Marketing",
          "Mobile Marketing",
          "E-Commerce Marketing",
          "Pay-Per Click Marketing",
          "Video Marketing",
          "Affiliate Marketing",
          "Influencer Marketing",
          "Marketing and Sales Automation",
          "Growth Hacking",
          "AI Digital Marketing"
        ]}
      ]
    },
    {
      "id": "data-science",
      "category": "data-science",
      "tag": "Data Science",
      "level": "",
      "title": "Data Science",
      "summary": "Core programming through advanced analytics - Python, Machine Learning, AI, and NLP for data-driven decision making.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Programming Fundamentals", "items": ["C++", "Python"] },
        { "heading": "Data Science Concepts", "items": ["Advance Topics", "Machine Learning", "AI", "NLP", "Data Science Applications"] }
      ]
    },
    {
      "id": "data-analytics",
      "category": "data-analytics",
      "tag": "Data Analytics",
      "level": "",
      "title": "Data Analytics",
      "summary": "Master data analysis tools and techniques - Excel, Power BI, Tableau, Python, AI and comprehensive data analysis.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Data Tools", "items": ["Advance Excel", "Power BI", "Tableau", "Python"] },
        { "heading": "Analytics Skills", "items": ["AI Applications", "Data Analysis", "Reporting & Visualization"] }
      ]
    },
    {
      "id": "english-speaking",
      "category": "office",
      "tag": "Communication",
      "level": "",
      "title": "English Speaking",
      "summary": "Build effective communication skills through English language practice and professional speaking techniques.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": ["English Grammar Basics", "Vocabulary Building", "Pronunciation Practice", "Speaking & Conversation", "Professional Communication", "Presentation Skills"] }
      ]
    },
    {
      "id": "software-development",
      "category": "dev",
      "tag": "Software Development",
      "level": "",
      "title": "Software Development",
      "summary": "Complete development lifecycle - Java, PHP, and Python for building robust software applications.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Languages", "items": ["Java", "PHP", "Python"] },
        { "heading": "Development Concepts", "items": ["Object-Oriented Programming", "Software Design Patterns", "Best Practices"] }
      ]
    },
    {
      "id": "dne",
      "category": "infra",
      "tag": "DNE",
      "level": "",
      "title": "Diploma in Networking Engineer",
      "summary": "Comprehensive networking program covering hardware, IT certification, and networking fundamentals for IT infrastructure careers.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Curriculum", "items": [
          "Hardware & IT Certification",
          "Networking N1 Certification",
          "MCSA [Microsoft Certified Solutions Associate]",
          "CCNA [Cisco Certified Network Associate]",
          "Linux Administration",
          "Hands-on Lab Practice"
        ]}
      ]
    },
    {
      "id": "ai-prompt-engineering",
      "category": "ai",
      "tag": "AI & Prompt Engineering",
      "level": "",
      "title": "AI Tools & Prompt Engineering",
      "summary": "Master AI tools and technologies — ChatGPT, DALL-E, Midjourney, and advanced prompt engineering techniques for maximizing AI capabilities.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "AI Fundamentals", "items": ["Introduction to AI and Machine Learning", "Understanding Large Language Models", "AI Ethics and Safety"] },
        { "heading": "AI Tools & Platforms", "items": ["ChatGPT and Advanced Prompting", "DALL-E and Image Generation", "Midjourney for Creative AI", "Other Popular AI Tools"] },
        { "heading": "Prompt Engineering Mastery", "items": ["Crafting Effective Prompts", "Few-Shot and Zero-Shot Prompting", "Fine-tuning AI Responses", "Real-World AI Applications"] }
      ]
    },
    {
      "id": "mobile-app-dev",
      "category": "mobile",
      "tag": "Mobile Development",
      "level": "",
      "title": "Mobile App Development",
      "summary": "Build native and cross-platform mobile apps — iOS with Swift, Android with Kotlin, and React Native for both platforms.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Mobile Fundamentals", "items": ["Mobile App Concepts", "UI/UX for Mobile", "Mobile Performance Optimization"] },
        { "heading": "iOS Development", "items": ["Swift Programming", "iOS SDK and Frameworks", "App Store Deployment"] },
        { "heading": "Android Development", "items": ["Kotlin Programming", "Android SDK and Libraries", "Google Play Store Deployment"] },
        { "heading": "Cross-Platform Development", "items": ["React Native Basics", "Flutter Introduction", "Hybrid App Development"] }
      ]
    },
    {
      "id": "ui-ux-design",
      "category": "design",
      "tag": "UI/UX Design",
      "level": "",
      "title": "UI/UX Designing",
      "summary": "Create stunning user interfaces and experiences — Figma, Adobe XD, design principles, wireframing, prototyping, and usability testing.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Design Fundamentals", "items": ["Design Principles and Psychology", "Color Theory and Typography", "Visual Hierarchy and Layout"] },
        { "heading": "Design Tools", "items": ["Figma Mastery", "Adobe XD Essentials", "Prototyping Tools", "Collaboration in Design"] },
        { "heading": "User Research & Testing", "items": ["User Research Methods", "Wireframing and Mockups", "Usability Testing", "Accessibility Standards"] },
        { "heading": "Real-World Projects", "items": ["Website Design", "Mobile App Design", "Design Systems", "Portfolio Projects"] }
      ]
    },
    {
      "id": "content-writing",
      "category": "creative",
      "tag": "Content Writing",
      "level": "",
      "title": "Content Writing",
      "summary": "Master content creation across platforms — blog writing, copywriting, SEO optimization, social media content, and technical writing.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Writing Fundamentals", "items": ["Grammar and Writing Style", "Tone and Voice Development", "Editing and Proofreading"] },
        { "heading": "Content Types", "items": ["Blog Writing Strategies", "Copywriting for Sales", "Social Media Content Creation", "Technical Writing"] },
        { "heading": "SEO & Optimization", "items": ["SEO Content Writing", "Keyword Research", "Meta Descriptions and Tags", "Content Optimization"] },
        { "heading": "Practical Skills", "items": ["Freelance Writing", "Building a Portfolio", "Client Communication", "Project Management"] }
      ]
    },
    {
      "id": "video-editing",
      "category": "creative",
      "tag": "Video Editing",
      "level": "",
      "title": "Video Editing",
      "summary": "Professional video editing — Adobe Premiere Pro, DaVinci Resolve, effects, color grading, sound design, and YouTube/social media optimization.",
      "meta": ["Certificate included", "Career Based Course"],
      "syllabus": [
        { "heading": "Video Editing Basics", "items": ["Video Formats and Codecs", "Non-Linear Editing Concepts", "Timeline and Sequence Management"] },
        { "heading": "Editing Software", "items": ["Adobe Premiere Pro Mastery", "DaVinci Resolve Advanced", "Final Cut Pro Essentials", "Free Tools: DaVinci and Shotcut"] },
        { "heading": "Advanced Techniques", "items": ["Transitions and Effects", "Color Grading and Correction", "Sound Design and Audio Mixing", "Motion Graphics and Animations"] },
        { "heading": "Content Creation", "items": ["YouTube Video Optimization", "Social Media Video Formats", "Cinematic Techniques", "Portfolio Projects"] }
      ]
    }
  ]
}