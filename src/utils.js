export const formatDate1 = (dateString)=> {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
}
// Helper function to format date from YYYY-MM-DD to "Month DD YYYY"
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
}

// Helper function to format time from 24-hour to 12-hour format
function formatTime(timeString) {
  if (!timeString) return '';
  
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
  return `${displayHour}:${minutes} ${ampm}`;
}

// Helper function to get day from date (for monthly repeats)
function getDayFromDate(dateString) {
  const date = new Date(dateString);
  return date.getDate();
}

// Helper function to format weekdays array
function formatWeekdays(weekdaysArray) {
  if (!weekdaysArray || weekdaysArray.length === 0) return '';
  
  const dayMap = {
    'sunday': 'Sunday',
    'monday': 'Monday', 
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday': 'Friday',
    'saturday': 'Saturday'
  };
  
  const formattedDays = weekdaysArray.map(day => dayMap[day] || day);
  
  if (formattedDays.length === 1) {
    return formattedDays[0];
  } else if (formattedDays.length === 2) {
    return formattedDays.join(' and ');
  } else {
    return formattedDays.slice(0, -1).join(', ') + ', and ' + formattedDays[formattedDays.length - 1];
  }
}

// Main function to generate schedule description
export const  generateScheduleDescription=(item) =>{
  const {
    on_status,
    on_day,
    on_time,
    repeat_count,
    repeat_type,
    repeat_day,
    repeat_time,
    repeat_weekday,
    end_status,
    end_on_day,
    end_on_after
  } = item;

  let description = 'This flow will ';

  // Handle scheduling type (on vs repeat)
  if (on_status === 'on') {
    // One-time schedule
    description += `take place on ${formatDate(on_day)} at ${formatTime(on_time)}`;
  } else if (on_status === 'repeat') {
    // Recurring schedule
    if (repeat_type === 'minute' || repeat_type === 'hour') {
      description += `take place every ${repeat_count} ${repeat_type}${repeat_count > 1 ? 's' : ''}`;
    } else if (repeat_type === 'month') {
      description += `take place every month on the ${getDayFromDate(repeat_day)}${getOrdinalSuffix(getDayFromDate(repeat_day))} at ${formatTime(repeat_time)}`;
    } else if (repeat_type === 'week') {
      const weekdaysText = formatWeekdays(repeat_weekday);
      description += `take place every week on ${weekdaysText} at ${formatTime(repeat_time)}`;
    }
  }

  // Handle end conditions
  if (end_status === 'on') {
    description += ` until ${formatDate(end_on_day)}`;
  } else if (end_status === 'after') {
    const occurrences = end_on_after.split(' ')[0]; // Extract number from "1 occurrence"
    description += ` for ${occurrences} occurrence${occurrences > 1 ? 's' : ''}`;
  } else if (end_status === 'never') {
    description += ' and will never end';
  }

  description += '.';

  return description;
}

// Helper function to add ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Helper function to format weekdays array to abbreviated format
function formatWeekdaysShort(weekdaysArray) {
  if (!weekdaysArray || weekdaysArray.length === 0) return '';
  
  const dayMap = {
    'sunday': 'Su',
    'monday': 'Mo', 
    'tuesday': 'Tu',
    'wednesday': 'We',
    'thursday': 'Th',
    'friday': 'Fr',
    'saturday': 'Sa'
  };
  
  return weekdaysArray.map(day => dayMap[day] || day).join(', ');
}

// Function to get start date/day details for first span
function getStartDetails(item) {
  const { on_status, on_day, repeat_type, repeat_day, repeat_weekday } = item;
  
  if (on_status === 'on') {
    // Show formatted date for one-time schedule
    return formatDate(on_day);
  } else if (on_status === 'repeat') {
    if (repeat_type === 'month') {
      // Show day abbreviation for monthly repeat
      return getDayFromDate(repeat_day);
    } else if (repeat_type === 'week') {
      // Show weekday abbreviations for weekly repeat
      return formatWeekdaysShort(repeat_weekday);
    }
  }
  
  return '';
}

// Function to get end details for second span
function getEndDetails(item) {
  const { end_status, end_on_day, end_on_after } = item;
  
  if (end_status === 'never') {
    return 'Never End';
  } else if (end_status === 'on') {
    return `Ends on ${formatDate(end_on_day)}`;
  } else if (end_status === 'after') {
    // Extract number from "1 occurrence" string
    const occurrences = end_on_after.split(' ')[0];
    return `${occurrences} Occurrence${occurrences > 1 ? 's' : ''}`;
  }
  
  return '';
}

// Function to get time details for time section
function getTimeDetails(item) {
  const { on_status, on_time, repeat_time } = item;
  
  if (on_status === 'on') {
    return `Scheduled at ${formatTime(on_time)}`;
  } else if (on_status === 'repeat') {
    return `Repeats at ${formatTime(repeat_time)}`;
  }
  
  return '';
}

// Export all helper functions
export { 
  getStartDetails, 
  getEndDetails, 
  getTimeDetails, 
  formatDate, 
  formatTime 
};
