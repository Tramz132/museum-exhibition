/**
 * Format date string into Indonesian readable format
 * @param {string} dateString - YYYY-MM-DD
 * @returns {string} - DD Month YYYY
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

/**
 * Returns Tailwind CSS badge classes based on status string (Tersedia, Dipinjam, Perbaikan, Pending, Approved, Rejected)
 * @param {string} status
 * @returns {string} - Tailwind CSS class names
 */
export const getStatusBadgeColor = (status) => {
  switch (status) {
    // Item status states
    case 'Tersedia':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Dipinjam':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Perbaikan':
      return 'bg-amber-100 text-amber-800 border-amber-200';
      
    // Loan status states
    case 'Pending':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Approved':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Rejected':
      return 'bg-rose-100 text-rose-800 border-rose-200';
      
    default:
      return 'bg-slate-105 text-slate-800 border-slate-200';
  }
};

/**
 * Truncate long descriptions with suspension dots
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 80) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
