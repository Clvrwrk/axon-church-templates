export type NavItem = { label: string; to: string };
export type ServiceTime = { day: string; time: string; note?: string };
export type Ministry = {
  id: string;
  name: string;
  blurb: string;
  audience: string;
  icon: string;
};
export type Sermon = {
  id: string;
  title: string;
  series: string;
  speaker: string;
  date: string;
  duration: string;
  image: string;
};
export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  blurb: string;
};
export type Campus = {
  id: string;
  name: string;
  city: string;
  address: string;
  times: string[];
  image: string;
};
export type Group = {
  id: string;
  name: string;
  focus: string;
  day: string;
  time: string;
  open: boolean;
};
export type TemplateConfig = {
  slug: string;
  themeClass: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  size: "Small" | "Mid-size" | "Large" | "Multi-campus" | "Young Adult";
  style: string;
  bestFor: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  heroImage: string;
  gallery: string[];
  serviceTimes: ServiceTime[];
  nav: NavItem[];
  beliefs: string[];
  staff: { name: string; role: string; bio: string }[];
  ministries: Ministry[];
  sermons: Sermon[];
  events: EventItem[];
  campuses?: Campus[];
  groups?: Group[];
  features: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  accentWord: string;
};

const img = {
  worship1:
    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80&auto=format&fit=crop",
  worship2:
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=80&auto=format&fit=crop",
  community:
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1600&q=80&auto=format&fit=crop",
  kids: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80&auto=format&fit=crop",
  youth:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
  outdoors:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80&auto=format&fit=crop",
  modern:
    "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1600&q=80&auto=format&fit=crop",
  stage:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80&auto=format&fit=crop",
  coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
  prayer:
    "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80&auto=format&fit=crop",
  building:
    "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=80&auto=format&fit=crop",
  hands:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80&auto=format&fit=crop",
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80&auto=format&fit=crop",
  city: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80&auto=format&fit=crop",
  night:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80&auto=format&fit=crop",
  group:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80&auto=format&fit=crop",
  recovery:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop",
  bible:
    "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80&auto=format&fit=crop",
  essentialHero: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80&auto=format&fit=crop",
  growthHero: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1600&q=80&auto=format&fit=crop",
  discipleshipHero: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80&auto=format&fit=crop",
  multisiteHero: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80&auto=format&fit=crop",
  modernHero: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80&auto=format&fit=crop",
};

export const templates: TemplateConfig[] = [
  {
    slug: "essential",
    themeClass: "theme-essential",
    name: "Harbor Light Church",
    shortName: "Harbor Light",
    tagline: "A simple, warm place to belong by the sea.",
    description:
      "Essential is built for smaller churches that want a clean, welcoming site without the clutter—perfect for coastal and community-focused congregations.",
    size: "Small",
    style: "Warm · Coastal · Classic",
    bestFor: "Churches under 200, plant campuses, family churches",
    city: "Seaside, OR",
    address: "412 Ocean Avenue, Seaside, OR 97138",
    phone: "(503) 555-0142",
    email: "hello@harborlight.church",
    heroImage: img.essentialHero,
    gallery: [img.essentialHero, img.community, img.family, img.kids, img.coffee],
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", note: "Classic service" },
      { day: "Sunday", time: "10:45 AM", note: "Family service" },
      { day: "Wednesday", time: "6:30 PM", note: "Prayer & worship" },
    ],
    nav: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Ministries", to: "/ministries" },
      { label: "Sermons", to: "/sermons" },
      { label: "Events", to: "/events" },
      { label: "Give", to: "/give" },
      { label: "Visit", to: "/visit" },
    ],
    beliefs: [
      "The Bible is God’s inspired Word and our final authority.",
      "Salvation is by grace through faith in Jesus Christ alone.",
      "The Church is a family called to love God and neighbor.",
      "Baptism and communion are ordinances given by Christ.",
      "We live on mission until He returns.",
    ],
    staff: [
      {
        name: "Pastor Mark Ellison",
        role: "Lead Pastor",
        bio: "Mark has shepherded Harbor Light for 12 years with a heart for families and the coastal community.",
      },
      {
        name: "Sarah Ellison",
        role: "Kids & Families",
        bio: "Sarah creates warm, age-appropriate spaces where children meet Jesus.",
      },
      {
        name: "David Chen",
        role: "Worship Leader",
        bio: "David leads simple, heartfelt worship that helps the whole room sing.",
      },
    ],
    ministries: [
      {
        id: "kids",
        name: "Harbor Kids",
        blurb: "Safe, joyful Sunday environments for infants through elementary.",
        audience: "Ages 0–11",
        icon: "👶",
      },
      {
        id: "youth",
        name: "Tide Youth",
        blurb: "Midweek hangouts, Scripture, and mentors for middle & high school.",
        audience: "Grades 6–12",
        icon: "🌊",
      },
      {
        id: "groups",
        name: "Home Groups",
        blurb: "Weekly circles for prayer, meals, and real friendship.",
        audience: "All adults",
        icon: "🏠",
      },
      {
        id: "serve",
        name: "Local Serve",
        blurb: "Beach cleanups, food pantry, and neighbor care projects.",
        audience: "All ages",
        icon: "🤝",
      },
    ],
    sermons: [
      {
        id: "s1",
        title: "Light for the Harbor",
        series: "Living Light",
        speaker: "Pastor Mark Ellison",
        date: "Aug 3, 2026",
        duration: "32 min",
        image: img.outdoors,
      },
      {
        id: "s2",
        title: "When Storms Rise",
        series: "Living Light",
        speaker: "Pastor Mark Ellison",
        date: "Jul 27, 2026",
        duration: "28 min",
        image: img.worship2,
      },
      {
        id: "s3",
        title: "Belong Before You Believe",
        series: "Open House",
        speaker: "Sarah Ellison",
        date: "Jul 20, 2026",
        duration: "24 min",
        image: img.community,
      },
    ],
    events: [
      {
        id: "e1",
        title: "Beach Baptisms",
        date: "Aug 16, 2026",
        time: "11:30 AM",
        location: "Seaside Beach",
        blurb: "Celebrate new life in Christ with a picnic after the service.",
      },
      {
        id: "e2",
        title: "Family Picnic Sunday",
        date: "Aug 23, 2026",
        time: "12:30 PM",
        location: "Church Lawn",
        blurb: "Bring a side dish—we’ll provide burgers and games.",
      },
      {
        id: "e3",
        title: "Prayer Night",
        date: "Sep 3, 2026",
        time: "6:30 PM",
        location: "Sanctuary",
        blurb: "A quiet evening of worship and intercession for our city.",
      },
    ],
    features: [
      "Warm hero storytelling",
      "Service times front and center",
      "Simple ministries grid",
      "Visit & give CTAs",
      "Mobile-first layout",
    ],
    ctaPrimary: "Plan Your Visit",
    ctaSecondary: "Watch a Message",
    accentWord: "Welcome",
  },
  {
    slug: "growth",
    themeClass: "theme-growth",
    name: "Northbridge Community Church",
    shortName: "Northbridge",
    tagline: "Growing people who love Jesus and their city.",
    description:
      "Northbridge ships the Café Nova system—cream layered surfaces, forest green, Instrument Serif, atmospheric video, and clear next-step pathways for growing suburban churches.",
    size: "Mid-size",
    style: "Café Nova · Warm · Formational",
    bestFor: "Growing suburban churches 300–1500",
    city: "Plano, TX",
    address: "8800 Legacy Drive, Plano, TX 75024",
    phone: "(972) 555-0188",
    email: "info@northbridge.church",
    heroImage: img.growthHero,
    gallery: [img.growthHero, img.community, img.kids, img.stage, img.family],
    serviceTimes: [
      { day: "Saturday", time: "5:00 PM", note: "Evening worship" },
      { day: "Sunday", time: "9:00 AM", note: "Worship + kids" },
      { day: "Sunday", time: "11:00 AM", note: "Worship + kids" },
    ],
    nav: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Ministries", to: "/ministries" },
      { label: "Sermons", to: "/sermons" },
      { label: "Events", to: "/events" },
      { label: "Give", to: "/give" },
      { label: "Visit", to: "/visit" },
    ],
    beliefs: [
      "Jesus is Lord—fully God and fully man.",
      "Scripture is true and sufficient for life and godliness.",
      "The gospel transforms individuals, families, and cities.",
      "Every believer is called to serve and make disciples.",
      "The local church is God’s plan A for the world.",
    ],
    staff: [
      {
        name: "Pastor Jordan Hale",
        role: "Lead Pastor",
        bio: "Jordan casts vision for multiplication—disciples, leaders, and campuses.",
      },
      {
        name: "Mia Torres",
        role: "Next Gen Pastor",
        bio: "Mia builds seamless kids-to-youth pathways that stick with families.",
      },
      {
        name: "Chris Nguyen",
        role: "Worship Pastor",
        bio: "Chris crafts weekend experiences that are excellent and accessible.",
      },
      {
        name: "Lauren Price",
        role: "Connections Director",
        bio: "Lauren helps first-time guests find groups and serving teams fast.",
      },
    ],
    ministries: [
      {
        id: "kids",
        name: "NB Kids",
        blurb: "High-energy, gospel-centered environments every weekend.",
        audience: "Birth–5th grade",
        icon: "🎈",
      },
      {
        id: "students",
        name: "NB Students",
        blurb: "Wednesday nights that combine fun, teaching, and small groups.",
        audience: "6th–12th grade",
        icon: "⚡",
      },
      {
        id: "groups",
        name: "Life Groups",
        blurb: "Semester-based groups across the metro for every life stage.",
        audience: "Adults",
        icon: "🔗",
      },
      {
        id: "care",
        name: "Care Ministry",
        blurb: "Counseling referrals, benevolence, and hospital visitation.",
        audience: "Anyone in need",
        icon: "💙",
      },
    ],
    sermons: [
      {
        id: "s1",
        title: "Next Step Faith",
        series: "Forward",
        speaker: "Pastor Jordan Hale",
        date: "Aug 2, 2026",
        duration: "36 min",
        image: img.building,
      },
      {
        id: "s2",
        title: "Teams That Multiply",
        series: "Forward",
        speaker: "Lauren Price",
        date: "Jul 26, 2026",
        duration: "30 min",
        image: img.community,
      },
      {
        id: "s3",
        title: "Raising Resilient Kids",
        series: "Home Base",
        speaker: "Mia Torres",
        date: "Jul 19, 2026",
        duration: "34 min",
        image: img.kids,
      },
    ],
    events: [
      {
        id: "e1",
        title: "Growth Track Launch",
        date: "Aug 17, 2026",
        time: "12:30 PM",
        location: "Connection Center",
        blurb: "Four Sundays to membership, serving, and leadership.",
      },
      {
        id: "e2",
        title: "Family Fun Night",
        date: "Aug 29, 2026",
        time: "6:00 PM",
        location: "Gym & Courtyard",
        blurb: "Inflatables, food trucks, and free photos for the whole family.",
      },
      {
        id: "e3",
        title: "Serve Day",
        date: "Sep 12, 2026",
        time: "9:00 AM",
        location: "Citywide sites",
        blurb: "Hundreds of volunteers blessing schools and neighborhoods.",
      },
    ],
    features: [
      "Café Nova layered cream shell",
      "Instrument Serif word reveals",
      "Loop-in-view atmospheric video",
      "Magnetic CTAs & tilt cards",
      "Bento life gallery",
    ],
    ctaPrimary: "I’m New Here",
    ctaSecondary: "Find a Group",
    accentWord: "Grow",
  },
  {
    slug: "discipleship",
    themeClass: "theme-discipleship",
    name: "Rooted Fellowship",
    shortName: "Rooted",
    tagline: "Deep roots. Real relationships. Everyday obedience.",
    description:
      "Rooted ships the Aura visual system—stone surfaces, neon-orange accents, stacking pathway cards, and motion-first storytelling for churches that prioritize formation over production.",
    size: "Mid-size",
    style: "Aura · Formational · High-depth",
    bestFor: "Churches prioritizing groups, classes, and mentoring",
    city: "Asheville, NC",
    address: "215 Maple Street, Asheville, NC 28801",
    phone: "(828) 555-0160",
    email: "hello@rooted.church",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop",
    ],
    serviceTimes: [
      { day: "Sunday", time: "10:00 AM", note: "Gathered worship" },
      { day: "Tuesday", time: "7:00 PM", note: "House churches" },
      { day: "Thursday", time: "6:30 PM", note: "Formation classes" },
    ],
    nav: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Groups", to: "/groups" },
      { label: "Sermons", to: "/sermons" },
      { label: "Events", to: "/events" },
      { label: "Give", to: "/give" },
      { label: "Visit", to: "/visit" },
    ],
    beliefs: [
      "Discipleship is apprenticeship to Jesus in everyday life.",
      "Community is essential—no one grows alone.",
      "Scripture forms our minds and practices.",
      "Prayer and presence fuel mission.",
      "Every member is a minister.",
    ],
    staff: [
      {
        name: "Pastor Elena Brooks",
        role: "Lead Pastor",
        bio: "Elena shepherds a culture of slow, sturdy spiritual formation.",
      },
      {
        name: "James Okonkwo",
        role: "Groups Pastor",
        bio: "James coaches hosts and mentors who open their homes weekly.",
      },
      {
        name: "Priya Shah",
        role: "Formation Lead",
        bio: "Priya designs pathways from first steps to long-term apprenticeship.",
      },
    ],
    ministries: [
      {
        id: "groups",
        name: "House Churches",
        blurb: "Neighborhood gatherings for meals, Scripture, and prayer.",
        audience: "All adults",
        icon: "Home",
      },
      {
        id: "classes",
        name: "Formation Classes",
        blurb: "Semester courses on prayer, theology, and spiritual practices.",
        audience: "Adults",
        icon: "GraduationCap",
      },
      {
        id: "mentor",
        name: "Mentoring",
        blurb: "One-to-one discipleship matches across life stages.",
        audience: "Adults",
        icon: "Users",
      },
      {
        id: "care",
        name: "Healing Circles",
        blurb: "Safe groups for grief, recovery, and emotional health.",
        audience: "Anyone healing",
        icon: "HeartHandshake",
      },
    ],
    groups: [
      {
        id: "g1",
        name: "West End House Church",
        focus: "Gospel of John",
        day: "Tuesday",
        time: "7:00 PM",
        open: true,
      },
      {
        id: "g2",
        name: "Young Professionals",
        focus: "Faith at work",
        day: "Wednesday",
        time: "6:30 PM",
        open: true,
      },
      {
        id: "g3",
        name: "Parents of Teens",
        focus: "Family discipleship",
        day: "Thursday",
        time: "7:30 PM",
        open: false,
      },
      {
        id: "g4",
        name: "Recovery Circle",
        focus: "Freedom & support",
        day: "Monday",
        time: "7:00 PM",
        open: true,
      },
    ],
    sermons: [
      {
        id: "s1",
        title: "Abide First",
        series: "With Jesus",
        speaker: "Pastor Elena Brooks",
        date: "Aug 2, 2026",
        duration: "29 min",
        image:
          "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80&auto=format&fit=crop",
      },
      {
        id: "s2",
        title: "Tables That Heal",
        series: "With Jesus",
        speaker: "James Okonkwo",
        date: "Jul 26, 2026",
        duration: "27 min",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
      },
      {
        id: "s3",
        title: "Practices for Ordinary Days",
        series: "Rule of Life",
        speaker: "Priya Shah",
        date: "Jul 19, 2026",
        duration: "31 min",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    events: [
      {
        id: "e1",
        title: "Groups Kickoff Dinner",
        date: "Aug 18, 2026",
        time: "6:00 PM",
        location: "Fellowship Hall",
        blurb: "Meet hosts, sample cuisines, and join a house church.",
      },
      {
        id: "e2",
        title: "Silent Retreat Saturday",
        date: "Sep 5, 2026",
        time: "9:00 AM",
        location: "Mountain Lodge",
        blurb: "A half-day of guided silence, Scripture, and rest.",
      },
      {
        id: "e3",
        title: "Mentor Matching Night",
        date: "Sep 15, 2026",
        time: "7:00 PM",
        location: "Main Hall",
        blurb: "Pair with a mentor for a six-month discipleship journey.",
      },
    ],
    features: [
      "Aura stacking pathway cards",
      "Word-by-word hero reveal",
      "Dual diagonal marquees",
      "Formation loop terminal",
      "FAQ + visit CTA form",
    ],
    ctaPrimary: "Find a Group",
    ctaSecondary: "Start Formation",
    accentWord: "Abide",
  },
  {
    slug: "multisite",
    themeClass: "theme-multisite",
    name: "Citylight Church",
    shortName: "Citylight",
    tagline: "One church. Many neighborhoods. Shared mission.",
    description:
      "Citylight ships Aura Literary Minimalism—parchment grounds, terra-cotta accents, kinetic uppercase type, and campus storytelling for multi-location churches.",
    size: "Multi-campus",
    style: "Literary · Editorial · Unified",
    bestFor: "Multi-campus and large auditorium churches",
    city: "Denver, CO",
    address: "1000 Arena Way, Denver, CO 80202",
    phone: "(303) 555-0199",
    email: "hello@citylight.church",
    heroImage: img.multisiteHero,
    gallery: [img.multisiteHero, img.stage, img.city, img.worship2, img.modern],
    serviceTimes: [
      { day: "Saturday", time: "4:00 PM & 6:00 PM", note: "Downtown" },
      { day: "Sunday", time: "9:00 AM & 11:00 AM", note: "All campuses" },
      { day: "Sunday", time: "5:00 PM", note: "Online live" },
    ],
    nav: [
      { label: "Home", to: "/" },
      { label: "Campuses", to: "/about" },
      { label: "Ministries", to: "/ministries" },
      { label: "Sermons", to: "/sermons" },
      { label: "Events", to: "/events" },
      { label: "Give", to: "/give" },
      { label: "Visit", to: "/visit" },
    ],
    beliefs: [
      "We are one church in multiple locations.",
      "The gospel is for every neighborhood.",
      "Excellence serves people; people are not props.",
      "Local pastors care for local people.",
      "We plant and partner for city-wide impact.",
    ],
    staff: [
      {
        name: "Pastor Aaron Kim",
        role: "Lead Pastor",
        bio: "Aaron preaches the weekend message and champions multi-campus unity.",
      },
      {
        name: "Renee Douglas",
        role: "Campus Pastor — Downtown",
        bio: "Renee leads the flagship campus with a heart for the urban core.",
      },
      {
        name: "Marcus Webb",
        role: "Campus Pastor — Highlands",
        bio: "Marcus builds neighborhood teams and local mission partnerships.",
      },
      {
        name: "Sofia Alvarez",
        role: "Creative Director",
        bio: "Sofia aligns stage, media, and brand across every location.",
      },
    ],
    campuses: [
      {
        id: "c1",
        name: "Downtown",
        city: "Denver",
        address: "1000 Arena Way",
        times: ["Sat 4:00 & 6:00 PM", "Sun 9:00 & 11:00 AM"],
        image: img.multisiteHero,
      },
      {
        id: "c2",
        name: "Highlands",
        city: "Denver",
        address: "2200 Federal Blvd",
        times: ["Sun 9:00 & 11:00 AM"],
        image: img.city,
      },
      {
        id: "c3",
        name: "Aurora",
        city: "Aurora",
        address: "450 Peoria St",
        times: ["Sun 10:00 AM"],
        image: img.building,
      },
      {
        id: "c4",
        name: "Online",
        city: "Everywhere",
        address: "citylight.church/live",
        times: ["Sun 9:00 AM, 11:00 AM, 5:00 PM"],
        image: img.modern,
      },
    ],
    ministries: [
      {
        id: "kids",
        name: "City Kids",
        blurb: "Secure check-in and age-graded experiences at every campus.",
        audience: "Birth–5th",
        icon: "⭐",
      },
      {
        id: "students",
        name: "City Students",
        blurb: "Midweek gatherings that connect teens across locations.",
        audience: "6th–12th",
        icon: "🎤",
      },
      {
        id: "groups",
        name: "City Groups",
        blurb: "Hundreds of groups mapped by zip code and interest.",
        audience: "Adults",
        icon: "📍",
      },
      {
        id: "serve",
        name: "City Serve",
        blurb: "Shared serving days and ongoing justice partnerships.",
        audience: "All ages",
        icon: "🏙️",
      },
    ],
    sermons: [
      {
        id: "s1",
        title: "One Church, Many Rooms",
        series: "Together",
        speaker: "Pastor Aaron Kim",
        date: "Aug 2, 2026",
        duration: "38 min",
        image: img.multisiteHero,
      },
      {
        id: "s2",
        title: "Neighbors on Mission",
        series: "Together",
        speaker: "Renee Douglas",
        date: "Jul 26, 2026",
        duration: "35 min",
        image: img.city,
      },
      {
        id: "s3",
        title: "Lights On",
        series: "City Hope",
        speaker: "Marcus Webb",
        date: "Jul 19, 2026",
        duration: "33 min",
        image: img.stage,
      },
    ],
    events: [
      {
        id: "e1",
        title: "All-Campus Night of Worship",
        date: "Aug 22, 2026",
        time: "7:00 PM",
        location: "Downtown Arena",
        blurb: "Every campus together for a night of worship and vision.",
      },
      {
        id: "e2",
        title: "Baptism Weekend",
        date: "Sep 6–7, 2026",
        time: "All services",
        location: "All campuses",
        blurb: "Public declarations of faith across the city.",
      },
      {
        id: "e3",
        title: "Leader Summit",
        date: "Sep 19, 2026",
        time: "9:00 AM",
        location: "Downtown",
        blurb: "Training for group leaders, team leads, and campus staff.",
      },
    ],
    features: [
      "Kinetic uppercase hero",
      "Campus portrait cards",
      "Editorial message grid",
      "Shimmer value bar",
      "Numbered FAQ accordion",
    ],
    ctaPrimary: "Find a Campus",
    ctaSecondary: "Watch Live",
    accentWord: "Together",
  },
  {
    slug: "modern",
    themeClass: "theme-modern",
    name: "The Foundry",
    shortName: "Foundry",
    tagline: "Church for the curious, creative, and city-minded.",
    description:
      "Foundry ships the ATEEVIBES visual system — gritty paper-and-ink collage, dual marquees, and street-level energy for young adult and urban church plants who refuse to look corporate.",
    size: "Young Adult",
    style: "Urban · Collage · Editorial",
    bestFor: "Church plants, young adult, creative urban communities",
    city: "Nashville, TN",
    address: "88 Warehouse Row, Nashville, TN 37203",
    phone: "(615) 555-0133",
    email: "hey@thefoundry.church",
    heroImage:
      "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/motion.webp",
    gallery: [
      "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/lb-crew.webp",
      "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/motion.webp",
      "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/skyline.webp",
      "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/lb-detail.webp",
      "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/fabric.webp",
    ],
    serviceTimes: [
      { day: "Sunday", time: "10:00 AM", note: "Warehouse gathering" },
      { day: "Sunday", time: "6:00 PM", note: "Evening (monthly)" },
      { day: "Thursday", time: "7:00 PM", note: "Community night" },
    ],
    nav: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Community", to: "/ministries" },
      { label: "Talks", to: "/sermons" },
      { label: "Events", to: "/events" },
      { label: "Give", to: "/give" },
      { label: "Visit", to: "/visit" },
    ],
    beliefs: [
      "Jesus is better than anything the city offers.",
      "Doubt is welcome at the table.",
      "Creativity is a form of worship.",
      "Justice and mercy walk together.",
      "Community happens around real tables.",
    ],
    staff: [
      {
        name: "Pastor Lex Morgan",
        role: "Lead Pastor",
        bio: "Lex plants churches that feel like home for skeptics and creatives.",
      },
      {
        name: "Avery Quinn",
        role: "Community Lead",
        bio: "Avery hosts dinners, hangs, and first-time guest experiences.",
      },
      {
        name: "Jordan Lee",
        role: "Music Director",
        bio: "Jordan curates ambient, band-driven worship nights.",
      },
    ],
    ministries: [
      {
        id: "dinners",
        name: "Table Dinners",
        blurb: "Weekly shared meals in apartments and lofts across town.",
        audience: "Young adults",
        icon: "Users",
      },
      {
        id: "create",
        name: "Create Collective",
        blurb: "Artists, makers, and musicians collaborating for the city.",
        audience: "Creatives",
        icon: "Palette",
      },
      {
        id: "serve",
        name: "City Partners",
        blurb: "Ongoing work with shelters, schools, and refugee care.",
        audience: "All",
        icon: "HandHeart",
      },
      {
        id: "study",
        name: "Deep Dive",
        blurb: "Honest theology nights with Q&A and conversation.",
        audience: "Curious adults",
        icon: "Compass",
      },
    ],
    sermons: [
      {
        id: "s1",
        title: "Warehouse Hope",
        series: "Found",
        speaker: "Pastor Lex Morgan",
        date: "Aug 2, 2026",
        duration: "30 min",
        image:
          "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/motion.webp",
      },
      {
        id: "s2",
        title: "Faith for Skeptics",
        series: "Found",
        speaker: "Pastor Lex Morgan",
        date: "Jul 26, 2026",
        duration: "28 min",
        image:
          "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/skyline.webp",
      },
      {
        id: "s3",
        title: "Making Room",
        series: "Tables",
        speaker: "Avery Quinn",
        date: "Jul 19, 2026",
        duration: "26 min",
        image:
          "https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@ateevibes-v1/ateevibes/img/lb-crew.webp",
      },
    ],
    events: [
      {
        id: "e1",
        title: "Open Mic Night",
        date: "Aug 14, 2026",
        time: "7:30 PM",
        location: "The Foundry",
        blurb: "Poetry, songs, and stories from the community.",
      },
      {
        id: "e2",
        title: "City Serve Saturday",
        date: "Aug 30, 2026",
        time: "9:00 AM",
        location: "Meet at Warehouse Row",
        blurb: "Serve local partners, then lunch together.",
      },
      {
        id: "e3",
        title: "Baptism in the River",
        date: "Sep 13, 2026",
        time: "4:00 PM",
        location: "Cumberland River",
        blurb: "A public celebration of new faith outdoors.",
      },
    ],
    features: [
      "ATEEVIBES collage hero system",
      "Dual-track marquee bands",
      "Parallax motion story block",
      "Lookbook cutout board",
      "City-grid neighborhood map",
    ],
    ctaPrimary: "Come Hang",
    ctaSecondary: "Listen to a Talk",
    accentWord: "Belong",
  },
  {
    slug: "soluna",
    themeClass: "theme-soluna",
    name: "Soluna Church",
    shortName: "Soluna",
    tagline: "A serene place to belong, grow, and follow Jesus.",
    description:
      "Soluna is a small-church template with earthy olive greens, soft creams, organic circular layouts, and breathable whitespace—built for contemplative congregations that value calm hospitality over production.",
    size: "Small",
    style: "Contemplative · Organic · Minimal",
    bestFor: "Small churches, plants, contemplative & family congregations",
    city: "Santa Monica, CA",
    address: "214 Ocean Park Blvd, Santa Monica, CA 90405",
    phone: "(310) 555-0190",
    email: "hello@soluna.church",
    heroImage:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80&auto=format&fit=crop",
    ],
    serviceTimes: [
      { day: "Sunday", time: "9:00 AM", note: "Prayer & presence" },
      { day: "Sunday", time: "10:00 AM", note: "Main gathering + kids" },
      { day: "Tuesday", time: "7:00 PM", note: "Home circles" },
    ],
    nav: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Ministries", to: "/ministries" },
      { label: "Sermons", to: "/sermons" },
      { label: "Events", to: "/events" },
      { label: "Give", to: "/give" },
      { label: "Visit", to: "/visit" },
    ],
    beliefs: [
      "Jesus is Lord—fully God and fully man, our Savior and King.",
      "Scripture is God’s Word and our guide for life and faith.",
      "The Church is a family called to love God and neighbor.",
      "Belonging comes before perfection; grace makes room for all.",
      "We live on mission until He returns.",
    ],
    staff: [
      {
        name: "Pastor Elena Brooks",
        role: "Lead Pastor",
        bio: "Elena shepherds Soluna with a calm, Scripture-shaped presence and a heart for first-time guests.",
      },
      {
        name: "David Park",
        role: "Worship & Community",
        bio: "David leads simple worship and helps people find home circles across the city.",
      },
      {
        name: "James Okonkwo",
        role: "Kids & Families",
        bio: "James builds warm kids environments where children meet Jesus safely.",
      },
      {
        name: "Sarah J.",
        role: "Evening Communion",
        bio: "Sarah hosts quiet evening gatherings for prayer and communion.",
      },
    ],
    ministries: [
      {
        id: "kids",
        name: "Soluna Kids",
        blurb: "Safe, joyful Sunday spaces where children meet Jesus at their pace.",
        audience: "Ages 0–11",
        icon: "Baby",
      },
      {
        id: "groups",
        name: "Home Circles",
        blurb: "Weekly gatherings in living rooms for prayer, meals, and friendship.",
        audience: "All adults",
        icon: "Home",
      },
      {
        id: "worship",
        name: "Sunday Gathering",
        blurb: "Simple worship, honest teaching, and space to breathe with God.",
        audience: "Everyone",
        icon: "Sparkles",
      },
      {
        id: "serve",
        name: "Neighbor Care",
        blurb: "Food pantry, visits, and local projects that love our city well.",
        audience: "All ages",
        icon: "HandHeart",
      },
    ],
    sermons: [
      {
        id: "s1",
        title: "Come and See",
        series: "Open House",
        speaker: "Pastor Elena Brooks",
        date: "Aug 2, 2026",
        duration: "28 min",
        image:
          "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200&q=80&auto=format&fit=crop",
      },
      {
        id: "s2",
        title: "Tables That Heal",
        series: "Open House",
        speaker: "David Park",
        date: "Jul 26, 2026",
        duration: "26 min",
        image:
          "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
      },
      {
        id: "s3",
        title: "Quiet Strength",
        series: "Psalms",
        speaker: "Pastor Elena Brooks",
        date: "Jul 19, 2026",
        duration: "31 min",
        image:
          "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    events: [
      {
        id: "e1",
        title: "Neighborhood Picnic",
        date: "Aug 18, 2026",
        time: "12:30 PM",
        location: "Church Courtyard",
        blurb: "Bring a side dish—we provide sandwiches, blankets, and games.",
      },
      {
        id: "e2",
        title: "Home Circles Kickoff",
        date: "Sep 6, 2026",
        time: "6:00 PM",
        location: "Main Hall",
        blurb: "Meet hosts and join a circle for the fall semester.",
      },
      {
        id: "e3",
        title: "Beach Baptisms",
        date: "Sep 14, 2026",
        time: "4:00 PM",
        location: "Santa Monica Beach",
        blurb: "Celebrate new life in Christ with worship at the water’s edge.",
      },
    ],
    features: [
      "Circular hero overflow layout",
      "Organic stats arch bar",
      "Horizontal ministries carousel",
      "Weekly schedule with leaders",
      "Generosity tier cards",
    ],
    ctaPrimary: "Plan Your Visit",
    ctaSecondary: "Watch a Message",
    accentWord: "Belong",
  },
];

export function getTemplate(slug: string) {
  return templates.find((t) => t.slug === slug);
}

export function getAllTemplateSlugs() {
  return templates.map((t) => t.slug);
}
