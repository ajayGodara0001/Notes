export default function getInitials(str) {
    
    return str
        .split(' ')             // Split the string into words
        .filter(word => word)   // Remove empty strings (handles extra spaces)
        .map(word => word[0].toUpperCase()) // Get the first letter in uppercase
        .join('');              // Combine them as a string
}