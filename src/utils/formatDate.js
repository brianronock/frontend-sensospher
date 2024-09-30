/***********************************************************
    src/utils/formatDate.js
/********************************************************************************************************
Purpose:
This utility file provides a simple function to format dates into a more readable format.

#Key Function:
- `formatDate(dateString)`: Converts a date string into a more human-readable format using JavaScript’s `toLocaleDateString()`.

How it integrates:
- This function can be used in components that need to display dates, such as posts in the live feed or timestamps in the sensor data.
********************************************************************************************************/
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };