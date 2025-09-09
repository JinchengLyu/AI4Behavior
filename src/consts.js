exports.BACKEND = "http://localhost:4005";
//exports.BACKEND = "https://asdhi_backend.xlabub.com";
exports.searchLabel = "matched_transcript";
exports.filterLabels = ["Fidelity", "Parent_Strategy"];

exports.timeToSeconds = (timeStr) => {
  if (!timeStr) return 0; // Handle empty input
  const [minutes, seconds] = timeStr.split(":").map(Number); // Split and convert to numbers
  if (isNaN(minutes) || isNaN(seconds)) return 0; // Invalid format
  return minutes * 60 + seconds; // Calculate total seconds
};
