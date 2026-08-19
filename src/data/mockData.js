export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'orthofixpharmacy',
    key: 'OFP',
    category: 'Healthcare & Pharmacy',
    stage: 'released', // 'development' | 'testing' | 'decision' | 'released'
    devProgress: 100,
    testProgress: 100,
    developer: 'Silambarasan',
    version: 'v1.0.0',
    releaseVersion: 'v1.0.0',
    devUrl: 'https://orthofixpharmacy.onrender.com',
    targetDate: '19 Aug 2026',
    description: 'Pharmacy inventory tracking, prescription dispatch, and customer order management portal.',
    testStats: { total: 25, passed: 25, failed: 0 },
    testCases: [],
    commits: [
      { id: 'c1', hash: 'a8f912c', message: 'feat: add white & olive green glassmorphism theme components', author: 'Silambarasan', date: '10 mins ago' },
      { id: 'c2', hash: '3e410b9', message: 'fix: optimize pharmacy inventory calculation engine latency', author: 'Silambarasan', date: '1 hour ago' }
    ]
  },
  {
    id: 'proj-2',
    name: 'hospital-OPmanagement',
    key: 'HOP',
    category: 'Hospital & Outpatient Care',
    stage: 'development',
    devProgress: 85,
    testProgress: 90,
    developer: 'Silambarasan',
    version: 'v2.0.0',
    releaseVersion: 'v2.0.0',
    devUrl: 'https://hospital-management-system-2-0z7u.onrender.com',
    targetDate: '25 Aug 2026',
    description: 'Outpatient queue automation, doctor consultation scheduling, and patient Electronic Health Records.',
    testStats: { total: 30, passed: 28, failed: 2 },
    testCases: [
      { id: 'th1', name: 'OPD queue algorithm edge cases', status: 'passed', time: '90ms' },
      { id: 'th2', name: 'EHR encryption and HIPAA compliance', status: 'passed', time: '35ms' },
    ],
    commits: []
  },
  {
    id: 'proj-3',
    name: 'QREMenu',
    key: 'QRE',
    category: 'Hospitality & Digital Menu',
    stage: 'released',
    devProgress: 100,
    testProgress: 100,
    developer: 'Silambarasan',
    version: 'v4.0.0',
    releaseVersion: 'v4.0.0',
    devUrl: 'https://qremenu-4.onrender.com',
    targetDate: '18 Aug 2026',
    description: 'QR code touchless digital ordering, Kitchen Display System (KDS), and contactless payment integration.',
    testStats: { total: 20, passed: 20, failed: 0 },
    testCases: [],
    commits: []
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-orthofix',
    name: 'orthofixpharmacy',
    version: 'v1.0.0',
    environment: 'Production',
    releaseDate: '19 Aug 2026',
    url: 'https://orthofixpharmacy.onrender.com',
    uptime: '99.98%',
    latency: '28ms',
    activeUsers: '3,150',
    status: 'Healthy',
    icon: '⚡',
    category: 'Healthcare & Pharmacy',
    features: ['Prescription Management', 'Pharmacy Inventory Tracking', 'Onrender Cloud Deployment']
  },
  {
    id: 'app-hospital-op',
    name: 'hospital-OPmanagement',
    version: 'v2.0.0',
    environment: 'Production',
    releaseDate: '15 Aug 2026',
    url: 'https://hospital-management-system-2-0z7u.onrender.com',
    uptime: '99.99%',
    latency: '22ms',
    activeUsers: '8,420',
    status: 'Healthy',
    icon: '⚡',
    category: 'Hospital & Outpatient Care',
    features: ['Outpatient Queue System', 'Doctor Consultations', 'Electronic Patient Records']
  },
  {
    id: 'app-qremenu',
    name: 'QREMenu',
    version: 'v4.0.0',
    environment: 'Production',
    releaseDate: '18 Aug 2026',
    url: 'https://qremenu-4.onrender.com',
    uptime: '100.00%',
    latency: '19ms',
    activeUsers: '12,800',
    status: 'Healthy',
    icon: '⚡',
    category: 'Hospitality & Digital Menu',
    features: ['QR Code Digital Ordering', 'Kitchen Display System', 'Contactless Payments']
  }
];

export const TEAM_MEMBERS = [
  { name: 'Silambarasan', role: 'Lead Architect', avatar: '👤', status: 'Online' },
  { name: 'Ananya Sharma', role: 'Senior QA Engineer', avatar: '👩‍🔬', status: 'In Code Review' },
  { name: 'Rajesh Kumar', role: 'Full Stack Developer', avatar: '👨‍💻', status: 'Active Sprint' },
  { name: 'Priya Nair', role: 'UI/UX Product Designer', avatar: '🎨', status: 'Designing' },
];
