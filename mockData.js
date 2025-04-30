
// Mock crime data
const crimeData = [
  {
    id: 1,
    title: "Robbery",
    time: "2025-04-24 10:35", 
    emoji: "💰",
    details: "Armed robbery at convenience store. Suspect fled on foot. No injuries reported.",
    latitude: 40.735,
    longitude: -74.000,
  },
  {
    id: 2,
    title: "Assault",
    time: "2025-04-24 06:45",
    emoji: "👊",
    details: "Victim assaulted near subway entrance. Suspect described as male in dark clothing.",
    latitude: 40.725,
    longitude: -74.005,
  },
  {
    id: 3,
    title: "Assault",
    time: "2025-04-24 02:45", 
    emoji: "👊",
    details: "Physical altercation between two individuals. One person injured.",
    latitude: 40.730,
    longitude: -73.998,
  },
  {
    id: 4,
    title: "Grand Theft Auto",
    time: "2025-04-23 18:20", 
    emoji: "🚗",
    details: "Vehicle stolen from parking lot. Black SUV, license plate ABC123.",
    latitude: 40.712,
    longitude: -73.957, // Williamsburg, Brooklyn
  },
  {
    id: 5,
    title: "Vandalism",
    time: "2025-04-23 14:45", 
    emoji: "🎨",
    details: "Graffiti and property damage to storefront. Security footage available.",
    latitude: 40.678,
    longitude: -73.944, // Prospect Heights, Brooklyn
  },
  {
    id: 6,
    title: "Theft",
    time: "2025-04-24 12:00", 
    emoji: "💼",
    details: "Pickpocketing incident on subway platform. Wallet and phone stolen.",
    latitude: 40.750,
    longitude: -73.993, // Midtown Manhattan
  },
  {
    id: 7,
    title: "Drug Activity",
    time: "2025-04-24 10:15", 
    emoji: "💊",
    details: "Suspicious activity observed in park area. Multiple individuals involved.",
    latitude: 40.689,
    longitude: -73.982, // DUMBO, Brooklyn
  },
  {
    id: 8,
    title: "Harassment",
    time: "2025-04-24 08:15", 
    emoji: "🗣️",
    details: "Verbal harassment of store employee. Suspect left scene.",
    latitude: 40.783,
    longitude: -73.971, // Upper East Side
  },
  {
    id: 9,
    title: "Breaking & Entering",
    time: "2025-04-23 22:30", 
    emoji: "🔨",
    details: "Attempted break-in at residential building. No entry gained.",
    latitude: 40.671,
    longitude: -73.977, // Park Slope, Brooklyn
  },
  {
    id: 10,
    title: "Public Disturbance",
    time: "2025-04-23 20:30", 
    emoji: "📢",
    details: "Large group causing disturbance outside nightclub. Police responding.",
    latitude: 40.742,
    longitude: -74.006, // Chelsea
  },
  {
    id: 11,
    title: "Shoplifting",
    time: "2025-04-24 14:10",
    emoji: "🛍️",
    details: "Suspect took merchandise from boutique on Broadway. Store security in pursuit.",
    latitude: 40.725,
    longitude: -73.998, // SoHo
  },
  {
    id: 12,
    title: "Bike Theft",
    time: "2025-04-24 12:30", 
    emoji: "🚲",
    details: "Electric bike stolen from outside restaurant. Lock was cut. Security camera footage available.",
    latitude: 40.728,
    longitude: -73.994, // NoHo
  },
  {
    id: 13,
    title: "Assault",
    time: "2025-04-23 15:55", 
    emoji: "👊",
    details: "Fight broke out between two groups near Washington Square Park. Two individuals injured.",
    latitude: 40.731,
    longitude: -73.997, // Washington Square Park
  },
  {
    id: 14,
    title: "Vandalism",
    time: "2025-04-24 11:45", 
    emoji: "🎨",
    details: "Multiple vehicles damaged on street. Witnesses report seeing group of teenagers fleeing the scene.",
    latitude: 40.727,
    longitude: -73.991, // East Village border
  },
  {
    id: 15,
    title: "Package Theft",
    time: "2025-04-24 13:30", 
    emoji: "📦",
    details: "Packages stolen from apartment building lobby. Suspect caught on security camera.",
    latitude: 40.726,
    longitude: -73.995, // NoHo
  },
  {
    id: 16,
    title: "Public Intoxication",
    time: "2025-04-24 04:20", 
    emoji: "🍺",
    details: "Intoxicated individual causing disturbance at outdoor cafe. Refusing to leave premises.",
    latitude: 40.729,
    longitude: -73.999, // Greenwich Village
  },
  {
    id: 17,
    title: "Phone Snatching",
    time: "2025-04-24 00:05", 
    emoji: "📱",
    details: "Suspect on bicycle snatched phone from pedestrian's hand. Fled north on Lafayette Street.",
    latitude: 40.724,
    longitude: -73.996, // SoHo
  },
  {
    id: 18,
    title: "Trespassing",
    time: "2025-04-23 20:45",
    emoji: "🚪",
    details: "Unauthorized individual found in NYU building. Security escorted person from premises.",
    latitude: 40.730,
    longitude: -73.995, // NYU area
  },
  {
    id: 19,
    title: "Drug Sale",
    time: "2025-04-23 16:40", 
    emoji: "💊",
    details: "Suspected drug transaction observed in park. Multiple individuals involved.",
    latitude: 40.732,
    longitude: -73.998, // Washington Square Park
  },
  {
    id: 20,
    title: "Harassment",
    time: "2025-04-24 13:35", 
    emoji: "🗣️",
    details: "Street performer being harassed by group of individuals. Situation escalating.",
    latitude: 40.727,
    longitude: -73.998, // Greenwich Village
  },
  {
    id: 21,
    title: "Bike Theft",
    time: "2025-04-24 09:15", 
    emoji: "🚲",
    details: "Locked bicycle stolen from outside restaurant on Bleecker Street. Security camera footage available.",
    latitude: 40.735,
    longitude: -74.003, // Bleecker Street area
  },
  {
    id: 22,
    title: "Noise Complaint",
    time: "2025-04-24 05:30", 
    emoji: "🔊",
    details: "Loud music and shouting from apartment building. Multiple residents have complained.",
    latitude: 40.738,
    longitude: -74.005, // Northern West Village
  },
  {
    id: 23,
    title: "Shoplifting",
    time: "2025-04-23 23:45", 
    emoji: "🛍️",
    details: "Suspect took merchandise from boutique on Christopher Street. Store security reviewing footage.",
    latitude: 40.733,
    longitude: -74.002, // Christopher Street
  },
  {
    id: 24,
    title: "Vandalism",
    time: "2025-04-23 20:30", 
    emoji: "🖌️",
    details: "Graffiti found on side of building. Property owner filing report with photos of damage.",
    latitude: 40.729,
    longitude: -73.989, // East Village
  },
  {
    id: 25,
    title: "Suspicious Person",
    time: "2025-04-23 18:15", 
    emoji: "🕵️",
    details: "Individual looking into parked vehicles with flashlight. Wearing dark clothing and backpack.",
    latitude: 40.736,
    longitude: -73.991, // Gramercy area
  },
  {
    id: 26,
    title: "Public Intoxication",
    time: "2025-04-23 21:00", 
    emoji: "🍺",
    details: "Intoxicated individual causing disturbance outside bar on Hudson Street. Refusing to leave area.",
    latitude: 40.730,
    longitude: -74.006, // Hudson Street
  },
  {
    id: 27,
    title: "Vandalism",
    time: "2025-04-23 15:45", 
    emoji: "🖌️",
    details: "Graffiti found on storefront. Business owner requesting increased patrols in area.",
    latitude: 40.725,
    longitude: -73.990, // Lower East Side
  },
  {
    id: 28,
    title: "Package Theft",
    time: "2025-04-24 12:30", 
    emoji: "📦",
    details: "Package stolen from doorstep. Neighbor's security camera may have captured incident.",
    latitude: 40.740,
    longitude: -73.999, // Chelsea area
  },
  {
    id: 29,
    title: "Suspicious Activity",
    time: "2025-04-23 22:20", // Updated
    emoji: "👀",
    details: "Individual observed taking photos of building security features. Left area when approached.",
    latitude: 40.731,
    longitude: -73.987, // East Village
  },
  {
    id: 30,
    title: "Assault",
    time: "2025-04-23 19:15", 
    emoji: "👊",
    details: "Verbal argument escalated to physical altercation. One individual transported to hospital.",
    latitude: 40.737,
    longitude: -74.001, // Greenwich Village
  },
  {
    id: 31,
    title: "Drug Activity",
    time: "2025-04-23 17:15", 
    emoji: "💊",
    details: "Suspected drug transaction observed in park. Multiple individuals involved, dispersed when approached.",
    latitude: 40.731,
    longitude: -74.004, // James J. Walker Park area
  },
  {
    id: 32,
    title: "Harassment",
    time: "2025-04-24 14:05",
    emoji: "🗣️",
    details: "Individual following and verbally harassing pedestrians on Greenwich Avenue. Described as male in red jacket.",
    latitude: 40.738,
    longitude: -74.001, // Greenwich Avenue
  }
];

  
// Traffic data
const trafficData = [
{
    id: 1,
    severity: "high", // high, medium, low
    coordinates: [
    { latitude: 40.733, longitude: -73.997 },
    { latitude: 40.735, longitude: -73.995 },
    ],
},
{
    id: 2,
    severity: "medium",
    coordinates: [
    { latitude: 40.730, longitude: -73.999 },
    { latitude: 40.728, longitude: -74.001 },
    ],
},
{
    id: 3,
    severity: "low",
    coordinates: [
    { latitude: 40.729, longitude: -73.995 },
    { latitude: 40.727, longitude: -73.993 },
    ],
},
];
  
// Mock reports data
const reportsData = [
{
    id: 1,
    title: "Suspicious Activity",
    location: "Central Park",
    time: "2025-04-23 16:45",
    description: "Group of individuals acting suspiciously near the fountain.",
    reportedBy: "Anonymous",
},
{
    id: 2,
    title: "Broken Street Light",
    location: "5th Avenue & 23rd St",
    time: "2025-04-23 22:30", 
    description: "Street light has been out for 3 days, creating a safety hazard.",
    reportedBy: "John D.",
},
{
    id: 3,
    title: "Graffiti",
    location: "Broadway & Houston",
    time: "2025-04-24 09:15",
    description: "New graffiti on the side of the building.",
    reportedBy: "Local Business Owner",
},
{
    id: 4,
    title: "Pothole",
    location: "Bleecker St & 6th Avenue",
    time: "2025-04-24 08:20", 
    description: "Large pothole causing traffic to swerve. Nearly caused an accident this morning.",
    reportedBy: "Daily Commuter",
},
{
    id: 5,
    title: "Abandoned Vehicle",
    location: "West 4th Street",
    time: "2025-04-23 14:10", 
    description: "Black sedan with flat tires has been parked for over 2 weeks. Appears abandoned.",
    reportedBy: "Neighborhood Watch",
},
{
    id: 6,
    title: "Noise Complaint",
    location: "Christopher Street",
    time: "2025-04-24 01:30", 
    description: "Construction work happening after hours. Extremely loud drilling and hammering.",
    reportedBy: "Sleepless Resident",
},
{
    id: 7,
    title: "Fallen Tree Branch",
    location: "Washington Square Park",
    time: "2025-04-23 17:45", 
    description: "Large branch down after yesterday's storm. Blocking part of the walking path.",
    reportedBy: "Park Visitor",
},
{
    id: 8,
    title: "Illegal Dumping",
    location: "Perry Street Alley",
    time: "2025-04-23 22:15",
    description: "Someone dumped furniture and construction debris in the alley. Creating an eyesore and blocking access.",
    reportedBy: "Concerned Citizen",
},
{
    id: 9,
    title: "Water Main Break",
    location: "Hudson & Charles Street",
    time: "2025-04-24 07:30", 
    description: "Water flooding the intersection. Road beginning to buckle. Needs immediate attention.",
    reportedBy: "Local Shop Owner",
},
{
    id: 10,
    title: "Aggressive Panhandling",
    location: "West Village Subway Station",
    time: "2025-04-23 19:20", 
    description: "Individual following commuters and becoming confrontational when refused.",
    reportedBy: "MTA Rider",
},
{
    id: 11,
    title: "Broken Playground Equipment",
    location: "Abingdon Square Park",
    time: "2025-04-23 15:40", 
    description: "Swing set has broken chain and sharp edges. Dangerous for children.",
    reportedBy: "Parent",
},
{
    id: 12,
    title: "Blocked Fire Hydrant",
    location: "Greenwich Avenue",
    time: "2025-04-24 11:25",
    description: "Delivery truck parked in front of fire hydrant for over 3 hours. Safety hazard.",
    reportedBy: "Former Firefighter",
},
{
    id: 13,
    title: "Public Urination",
    location: "Gansevoort Street",
    time: "2025-04-23 23:50", 
    description: "Individuals leaving bars are regularly urinating in the doorway of closed businesses.",
    reportedBy: "Night Shift Worker",
},
{
    id: 14,
    title: "Dangerous Intersection",
    location: "7th Ave & West 10th Street",
    time: "2025-04-23 16:35", 
    description: "Traffic light timing too short for pedestrians to cross safely. Witnessed several near-misses.",
    reportedBy: "Senior Citizen",
},
{
    id: 15,
    title: "Rat Infestation",
    location: "Behind restaurants on Carmine Street",
    time: "2025-04-24 05:15", 
    description: "Significant increase in rat activity due to improper garbage storage. Health concern.",
    reportedBy: "Early Morning Dog Walker",
}
];


export { crimeData, trafficData, reportsData};