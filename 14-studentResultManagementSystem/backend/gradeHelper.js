/**
 * Grade helper module
 * Provides utility functions for grade calculation based on percentage
 */

/**
 * Calculate letter grade from percentage
 * Grade thresholds:
 * - A: 90% and above
 * - B: 80-89%
 * - C: 70-79%
 * - D: 60-69%
 * - F: below 60%
 * 
 * @param {number} percentage - The percentage score
 * @returns {string} Letter grade (A, B, C, D, or F)
 */
function calculateGrade(percentage) {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

/**
 * Calculate percentage from marks obtained and maximum marks
 * 
 * @param {number} marksObtained - Marks obtained by student
 * @param {number} maxMarks - Maximum possible marks
 * @returns {number} Percentage rounded to 2 decimal places
 */
function calculatePercentage(marksObtained, maxMarks) {
  if (maxMarks === 0) return 0;
  return Math.round((marksObtained / maxMarks) * 100 * 100) / 100; // Round to 2 decimal places
}

module.exports = {
  calculateGrade,
  calculatePercentage
};
