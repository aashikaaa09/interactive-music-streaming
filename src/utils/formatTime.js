/**
 * Formats time in seconds to MM:SS string
 * @param {number} seconds 
 * @returns {string} Formatted time (e.g., "03:45")
 */
export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
