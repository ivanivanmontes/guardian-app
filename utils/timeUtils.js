// Add a new function for more detailed time descriptions
const getDetailedTimeElapsed = (timeString) => {
// Parse the time string into a Date object
const incidentTime = new Date(timeString);
const now = new Date();

// Calculate time difference in milliseconds
const timeDiff = now - incidentTime;

// Convert to minutes
const minutesElapsed = Math.floor(timeDiff / (1000 * 60));
const hoursElapsed = Math.floor(minutesElapsed / 60);
const daysElapsed = Math.floor(hoursElapsed / 24);

if (minutesElapsed < 60) {
    return `${minutesElapsed} minute${minutesElapsed !== 1 ? 's' : ''}`;
} else if (hoursElapsed < 24) {
    return `${hoursElapsed} hour${hoursElapsed !== 1 ? 's' : ''}`;
} else {
    return `${daysElapsed} day${daysElapsed !== 1 ? 's' : ''}`;
}
};

export default getDetailedTimeElapsed;
