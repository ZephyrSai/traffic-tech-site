export const company = {
  name: "Traffic Tech",
  legalName: "Traffic Tech (Gulf) W.L.L.",
  tagline: "Intelligent infrastructure for the roads of tomorrow",
  founded: 2000,
  email: "ttg@traffic-tech.com",
  phone: "+974 4426 9000",
  fax: "+974 4466 6832",
  description:
    "Award-winning, ISO-certified total solutions provider of integrated systems in traffic management, intelligent transportation, parking, security, communications and truck weigh stations — serving the Arabian Gulf since 2000.",
};

export const stats = [
  { value: 25, suffix: "+", label: "Years in the Gulf" },
  { value: 2000, suffix: "+", label: "Projects delivered" },
  { value: 600, suffix: "+", label: "Clients served" },
  { value: 500, suffix: "+", label: "Qualified specialists" },
];

export const clients = [
  "Ashghal (PWA)",
  "QatarEnergy",
  "Lusail (LREDC)",
  "Hamad Medical Corp.",
  "Qatar University",
  "City Center Doha",
  "Qatar Building Co.",
  "Tekfen Construction",
];

export type Platform = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  features: { title: string; text: string }[];
  accent: "signal" | "mint" | "amberglow";
};

export const platforms: Platform[] = [
  {
    slug: "utms",
    name: "UTMS",
    kicker: "Unified Traffic Management System",
    summary:
      "One operating platform for the entire road network. UTMS unifies signal control, ITS field assets, ANPR, parking, surveillance and weigh stations into a single command-and-control layer — one screen, one data model, one source of truth for operators and authorities.",
    features: [
      {
        title: "Unified command & control",
        text: "Signals, VMS, CCTV, detectors, parking and enforcement managed from a single operations console with role-based access.",
      },
      {
        title: "Open integration fabric",
        text: "Vendor-neutral connectors for SCATS, SCADA, IoT sensors and legacy field equipment — no rip-and-replace required.",
      },
      {
        title: "Corridor & event orchestration",
        text: "Pre-planned response scenarios for incidents, weather and major events, executed across every subsystem in seconds.",
      },
      {
        title: "Network-wide KPIs",
        text: "Live journey times, saturation, emissions and safety indicators rolled up from street level to national dashboards.",
      },
    ],
    accent: "signal",
  },
  {
    slug: "ai",
    name: "AI Traffic Intelligence",
    kicker: "Applied AI for mobility",
    summary:
      "Machine learning models trained on Gulf-region traffic turn raw detector, camera and ANPR feeds into foresight: incidents detected in seconds, demand forecast hours ahead, and signal timings that continuously optimise themselves.",
    features: [
      {
        title: "AI incident detection",
        text: "Computer vision spots stopped vehicles, queues, pedestrians and debris on live CCTV — before the first call comes in.",
      },
      {
        title: "Predictive traffic forecasting",
        text: "Short- and long-horizon demand forecasts for corridors, events and seasons, powering proactive network management.",
      },
      {
        title: "Adaptive signal optimisation",
        text: "Reinforcement-learning timing plans layered on SCATS-class controllers to cut delay and stops at network scale.",
      },
      {
        title: "ANPR analytics at GCC scale",
        text: "Journey-time matrices, origin–destination patterns and watch-list intelligence built on our SmartANPR engine.",
      },
    ],
    accent: "mint",
  },
  {
    slug: "digital-twin",
    name: "Digital Twin",
    kicker: "A living model of your network",
    summary:
      "A calibrated, real-time virtual replica of the physical road network — fed by live field data. Test policy, geometry and signal changes in simulation before committing a single rial to the street.",
    features: [
      {
        title: "Live network mirror",
        text: "Field detectors, signals and ANPR continuously synchronise the twin, so simulation always starts from reality.",
      },
      {
        title: "What-if scenario lab",
        text: "Model lane closures, new developments, event traffic and emergency evacuations with microscopic fidelity.",
      },
      {
        title: "Design validation",
        text: "Validate intersection designs, corridor upgrades and parking schemes against measured demand before construction.",
      },
      {
        title: "Operator training & rehearsal",
        text: "Rehearse incident response and major-event plans in the twin — with zero risk to the live network.",
      },
    ],
    accent: "amberglow",
  },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: "traffic-signals-utc",
    name: "Traffic Signals & Urban Traffic Control",
    short:
      "Signal installations, intersection design, signal analysis and complete UTC systems — including SCATS adaptive control deployed citywide in Lusail.",
    icon: "signals",
  },
  {
    slug: "its",
    name: "Intelligent Transportation Systems",
    short:
      "Full-spectrum ITS: audit, planning, design, integration, commissioning and long-term operation & maintenance of ITS assets and control rooms.",
    icon: "its",
  },
  {
    slug: "anpr",
    name: "ANPR Systems",
    short:
      "SmartANPR — our highly accurate number-plate recognition platform, reading all GCC licence plates for tolling, enforcement and analytics.",
    icon: "anpr",
  },
  {
    slug: "parking",
    name: "Parking Management Systems",
    short:
      "End-to-end parking: design, supply, integration, guidance systems, commissioning, and multi-year operation for malls, cities and hospitals.",
    icon: "parking",
  },
  {
    slug: "wim",
    name: "Weigh-in-Motion & Truck Weigh Stations",
    short:
      "Design, build, operation and maintenance of WIM sites and weigh inspection stations across Qatar's strategic highway network.",
    icon: "wim",
  },
  {
    slug: "ev-charging",
    name: "EV Charging Systems",
    short:
      "Products and turnkey delivery for electric-vehicle charging infrastructure — from single sites to citywide rollouts like Lusail City.",
    icon: "ev",
  },
  {
    slug: "security",
    name: "Security Systems",
    short:
      "Citywide CCTV, access control and integrated security platforms for critical infrastructure, utilities and urban districts.",
    icon: "security",
  },
  {
    slug: "communications",
    name: "Communications Systems",
    short:
      "In-house design, supply and installation of fibre and wireless communications backbones that carry every ITS and security network we build.",
    icon: "comms",
  },
  {
    slug: "surveillance",
    name: "Traffic Monitoring & Law Enforcement",
    short:
      "Speed and red-light enforcement, surveillance and violation-management systems that make corridors measurably safer.",
    icon: "enforcement",
  },
  {
    slug: "scada-iot",
    name: "SCADA, Automation & IoT",
    short:
      "Industrial-grade SCADA, automation and IoT sensor networks — the telemetry layer beneath our digital-twin and AI offerings.",
    icon: "scada",
  },
  {
    slug: "data-collection",
    name: "Traffic Data Collection",
    short:
      "PWA-approved traffic counts, classification and origin–destination studies feeding planning, design and model calibration.",
    icon: "data",
  },
  {
    slug: "signs",
    name: "Traffic & Directional Signs",
    short:
      "Traffic signs, directional signage, gantries and steel sign structures — manufactured in-house through Sigma Metal Industries.",
    icon: "signs",
  },
  {
    slug: "safety",
    name: "Safety Equipment & Work Zones",
    short:
      "Work-zone safety products and traffic safety equipment protecting crews and road users on live carriageways.",
    icon: "safety",
  },
  {
    slug: "lighting-em",
    name: "Street Lighting & E&M Services",
    short:
      "Street lighting plus electrical & mechanical services delivered alongside our roadway and infrastructure projects.",
    icon: "lighting",
  },
];

export type Project = {
  name: string;
  scope: string;
  client: string;
  contractor?: string;
  year: number;
  category: string;
};

export const projects: Project[] = [
  {
    name: "Lusail Expressway",
    scope: "Flagship ITS and traffic management delivery on Qatar's signature expressway corridor.",
    client: "Public Works Authority (PWA) – Ashghal",
    year: 2019,
    category: "Traffic Management & ITS",
  },
  {
    name: "Intelligent Traffic Signal System — Lusail City (CP-22A)",
    scope: "Design and build of citywide adaptive signal control using SCATS.",
    client: "Lusail Real Estate Development Co. (LREDC)",
    year: 2020,
    category: "Traffic Management & ITS",
  },
  {
    name: "CCTV Security System — Lusail Citywide & Utility Buildings (CP23-B2)",
    scope: "Design and build of citywide CCTV security, fixed and call-off works.",
    client: "Lusail Real Estate Development Co. (LREDC)",
    year: 2021,
    category: "Security Systems",
  },
  {
    name: "EV Chargers in Lusail City (CP22-A)",
    scope: "Design, supply and installation of electric-vehicle chargers across Lusail City.",
    client: "Lusail Real Estate Development Co. (LREDC)",
    year: 2021,
    category: "EV Charging",
  },
  {
    name: "ITS Control Room O&M (ITS_005/R)",
    scope: "Operation and maintenance framework contract for ITS in Qatar.",
    client: "Public Works Authority (PWA) – Ashghal",
    year: 2021,
    category: "Operation & Maintenance",
  },
  {
    name: "Strategic Highways Weigh Stations — Qatar North (ZF_070)",
    scope: "Operation and maintenance of five weigh inspection stations.",
    client: "Public Works Authority (PWA) – Ashghal",
    contractor: "Qatar Building Co.",
    year: 2021,
    category: "Weigh Stations",
  },
  {
    name: "Strategic Highways Weigh Stations — Qatar South (ZF_071)",
    scope: "Operation and maintenance of six weigh inspection stations on Salwa Highway.",
    client: "Public Works Authority (PWA) – Ashghal",
    contractor: "Intelligent Technology Systems Co.",
    year: 2021,
    category: "Weigh Stations",
  },
  {
    name: "EVPS Traffic Management System — HMC",
    scope: "Supply, installation and commissioning of the EVPS traffic management system.",
    client: "Hamad Medical Corporation",
    year: 2020,
    category: "Traffic Management & ITS",
  },
  {
    name: "ITS Assets O&M — Qatar South (ITS_003)",
    scope: "Operation & maintenance framework contract for ITS assets.",
    client: "Public Works Authority (PWA) – Ashghal",
    year: 2020,
    category: "Operation & Maintenance",
  },
  {
    name: "ITS Communication Network O&M (ITS_002)",
    scope: "Operation & maintenance of the ITS communications network in Qatar.",
    client: "Public Works Authority (PWA) – Ashghal",
    year: 2020,
    category: "Operation & Maintenance",
  },
  {
    name: "City Center Mall Doha — Smart Parking",
    scope: "PMS, parking guidance, ANPR and signage with five-year comprehensive maintenance.",
    client: "City Center Company",
    year: 2020,
    category: "Parking",
  },
  {
    name: "Al Khor Expressway — Amiri Guard CCTV",
    scope: "Supply, installation and commissioning of CCTV systems.",
    client: "Public Works Authority (PWA) – Ashghal",
    contractor: "Tekfen Construction",
    year: 2020,
    category: "Security Systems",
  },
];

export const offices = [
  {
    country: "Qatar",
    title: "Qatar Corporate Office",
    lines: [
      "6th Floor, Buzwair Building 53",
      "Rawdat Al Khail Street 330",
      "Zone 25, Al Mansoura",
      "P.O. Box 30704, Doha, Qatar",
    ],
    phone: "+974 4426 9000",
    email: "ttg@traffic-tech.com",
    hours: "Sun–Thu, 08:00 – 17:30",
  },
  {
    country: "Saudi Arabia",
    title: "KSA Corporate Office",
    lines: [
      "Building 8, Floor 6",
      "Olaya Street",
      "P.O. Box 13524",
      "Riyadh, Saudi Arabia",
    ],
    phone: "+966 11 450 3183",
    email: "ttsa@traffic-tech.com",
    hours: "Sun–Thu, 08:00 – 17:00",
  },
];

export const milestones = [
  {
    year: "2000",
    text: "Founded in Doha to serve the Arabian Gulf — Qatar, UAE, Kuwait, Bahrain, Saudi Arabia and Oman.",
  },
  {
    year: "2010s",
    text: "Became an approved PWA (Ashghal) and QatarEnergy contractor; delivered signals, ITS and weigh stations across Qatar's expressway programme.",
  },
  {
    year: "2019",
    text: "Delivered ITS on the landmark Lusail Expressway, part of Qatar's world-class infrastructure drive toward National Vision 2030.",
  },
  {
    year: "2021",
    text: "Platinum Award at the QatarEnergy 7-Star Safety Awards; citywide SCATS, CCTV and EV-charging programmes in Lusail City.",
  },
  {
    year: "2022",
    text: "Infrastructure readiness for the FIFA World Cup — traffic systems performing at global scale.",
  },
  {
    year: "2026",
    text: "Partnered with Qatar University to advance traffic-safety research; launched AI, Digital Twin and UTMS platform offerings.",
  },
];

export const nav = [
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Products & Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
