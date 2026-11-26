// Fallback content shown instantly while the API loads (or if it is asleep/offline).
// Mirrors backend/api/management/commands/seed_portfolio.py
export const SEED = {
  profile: {
    name: 'Despina',
    full_name: 'Nnebo Despina',
    role: 'UI/UX Designer and Front End Developer',
    intro:
      'I turn ideas into clean, modern interfaces that feel smooth, intuitive and visually striking, and I build them so they work on every screen.',
    about:
      'I’m a creative UI/UX designer and front-end developer who loves turning ideas into real products. I enjoy building designs that are simple, beautiful, and easy to use while ensuring every screen feels consistent and purposeful. I’m passionate about solving problems through design and creating experiences people actually enjoy.',
    email: 'despinannebs22@gmail.com',
    phone: '+234 813 5744 702',
    whatsapp: '2348135744702',
    location: 'Enugu, Nigeria',
    years_experience: '1+',
    clients_count: '1',
    satisfaction: '100%',
    available: true,
    availability_label: 'Open to new projects',
  },
  socials: [
    { id: 1, platform: 'behance', label: 'despinannebs22', url: 'https://behance.net/despinannebs22' },
    { id: 2, platform: 'x', label: 'callme_despina', url: 'https://x.com/callme_despina' },
    { id: 3, platform: 'instagram', label: 'callme_despina', url: 'https://instagram.com/callme_despina' },
    { id: 4, platform: 'tiktok', label: 'callme_despina', url: 'https://tiktok.com/callme_despina' },
  ],
  tools: [
    { id: 1, name: 'VS Code', level: 97, icon_src: '/img/vscode.webp' },
    { id: 2, name: 'Figma', level: 90, icon_src: '/img/figma.webp' },
    { id: 3, name: 'Sketch', level: 40, icon_src: '/img/sketch.webp' },
  ],
  experience: [
    { id: 1, title: 'App Front End Developer ~ Flutter', period: '2026', description: 'Worked on building responsive interfaces and improving user experience across multiple mobile applications, focusing on performance, accessibility, and clean design.' },
    { id: 2, title: 'Web Front End Development ~ React', period: '2025', description: 'Worked on building responsive interfaces and improving user experience across multiple websites & webapps, focusing on performance, accessibility, and clean design.' },
    { id: 3, title: 'UI/UX Design ~ Figma', period: '2025', description: 'Worked on building responsive interfaces and creating user experience across multiple web & mobile sites and applications, focusing on performance, accessibility, and clean design.' },
  ],
  education: [
    { id: 1, title: 'App Front End Development ~ Flutter', period: '2026', description: 'Studied core principles of app development and design, gaining practical skills in building responsive, user-friendly digital products.' },
    { id: 2, title: 'Web Front End Development ~ React', period: '2026', description: 'Studied core principles of web development and UI/UX design, gaining practical skills in building responsive, user-friendly digital products.' },
    { id: 3, title: 'UI/UX Design ~ Figma', period: '2025', description: 'Studied core principles of website & app development and UI/UX design, gaining practical skills in building responsive, user-friendly digital products.' },
  ],
  faqs: [
    { id: 1, question: 'What services do you offer?', answer: 'I design and develop modern websites and mobile interfaces, focusing on clean UI, smooth user experience, and responsive frontend development.' },
    { id: 2, question: 'How much do your services cost?', answer: 'My pricing ranges from $10 to $3000 depending on project size, complexity, and estimated delivery timeline.' },
    { id: 3, question: 'Do you build full websites or only design?', answer: 'I can both design interfaces and develop frontend websites, depending on what the project requires.' },
    { id: 4, question: 'How long does a project take?', answer: 'Delivery time depends on the scope of the project, but most projects typically take anywhere from a few days to a few weeks.' },
    { id: 5, question: 'What tools do you use for your work?', answer: 'I mainly use Figma for design and React, HTML, CSS, and JavaScript for frontend development.' },
    { id: 6, question: 'Can you redesign an existing website?', answer: 'Yes, I can improve or completely redesign existing websites to make them more modern, responsive, and user-friendly.' },
    { id: 7, question: 'Do you work with clients internationally?', answer: 'Yes, I work with clients from different countries and communicate remotely throughout the entire project process.' },
    { id: 8, question: 'What do you need to start a project?', answer: 'I usually need a clear idea of the project, any references or inspirations, and your required features or goals.' },
    { id: 9, question: 'Can you maintain or update my website?', answer: 'Yes, I can help with ongoing maintenance, updates, and improvements after the initial project is completed.' },
    { id: 10, question: 'How do we communicate during a project?', answer: 'We can communicate through email, WhatsApp, or any preferred platform to ensure smooth updates and feedback.' },
  ],
  reviews: [],
  projects: [
    { id: 1, name: 'TrustMed - Mobile App For Health Care', category: 'mobile-ui', tags: ['UI/UX', 'App Design', 'Health Care'], image_src: '/projects/trustmed.webp', color: '#DDF3EA', description: '', figma_link: 'https://www.figma.com/proto/Piw3jVG2paalP73mVsX0L5/Team-C?page-id=0%3A1&node-id=63-567&p=f&viewport=649%2C145%2C0.02&t=86pAZsid15LleDws-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=445%3A1756&show-proto-sidebar=1', behance_link: 'https://www.behance.net/gallery/235491973/TrustMed-Mobile-App-For-HealthCare', website_link: '', featured: true },
    { id: 2, name: 'Secure Homes - Web App For Purchasing Properties', category: 'web-ui', tags: ['UI/UX', 'Website Design', 'E-commerce'], image_src: '/projects/secure-homes.webp', color: '#E3E8FF', description: '', figma_link: 'https://www.figma.com/proto/1smtbMcS45xRCv57y1pHba/Secure-Homes?node-id=1-2&p=f&viewport=446%2C187%2C0.02&t=r91ewc51scxlKmNm-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2&show-proto-sidebar=1&page-id=0%3A1', behance_link: '', website_link: '', featured: true },
    { id: 3, name: 'Pizza Square - Website for Purchasing Pizza', category: 'web-dev', tags: ['Website', 'Frontend Dev', 'E-commerce'], image_src: '/projects/pizza-square.webp', color: '#FFE3D6', description: '', figma_link: '', behance_link: '', website_link: 'https://pizza-square-web.vercel.app', featured: true },
    { id: 4, name: 'Snowell Electric - Website for Buying Electric Appliances', category: 'web-dev', tags: ['Website', 'Frontend Dev', 'E-commerce'], image_src: '/projects/snowell.webp', color: '#E9F1FF', description: '', figma_link: '', behance_link: '', website_link: 'https://snowell-electric.vercel.app', featured: true },
  ],
}

export const CATEGORIES = [
  { key: 'mobile-ui', label: 'Mobile UI/UX' },
  { key: 'web-ui', label: 'Website UI/UX' },
  { key: 'web-dev', label: 'Website development' },
]
