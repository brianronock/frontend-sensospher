/***********************************************************
 * formatDate.js
 * Utility function to format dates for better readability.
 ***********************************************************/
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };