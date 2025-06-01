import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const WeekDayContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '2px 0',
}));

const WeekDayButton = styled(Box)(() => ({
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  border: '1px solid #e9ecef',
  backgroundColor: '#f8f9fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: '#6c757d',
  position: 'relative',
  

  
  '&.selected': {
    background: 'linear-gradient(#d2cccc,#e9dee5)',
    borderColor: 'transparent',
    color: 'black',
    fontWeight: 'bold',
  },
  
  // Radio button inner dot effect for selected state
  '&.selected::after': {
    content: '""',
    position: 'absolute',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}));

const CustomWeekDaySelector = ({ value = [], onChange, label }) => {
  const weekDays = [
    { short: 'Su', full: 'sunday' },
    { short: 'Mo', full: 'monday' },
    { short: 'Tu', full: 'tuesday' },
    { short: 'We', full: 'wednesday' },
    { short: 'Th', full: 'thursday' },
    { short: 'Fr', full: 'friday' },
    { short: 'Sa', full: 'saturday' }
  ];

  const handleDayClick = (dayFull) => {
    let newSelectedDays;
    
    if (value.includes(dayFull)) {
      // Remove day if already selected
      newSelectedDays = value.filter(day => day !== dayFull);
    } else {
      // Add day if not selected
      newSelectedDays = [...value, dayFull];
    }
    
    if (onChange) {
      // Create synthetic event similar to other form controls
      const syntheticEvent = {
        target: { value: newSelectedDays }
      };
      onChange(syntheticEvent);
    }
  };

  return (
    <Box sx={{ width: '100%', margin: '10px 0' }}>
      {label && (
        <Typography 
          sx={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#6c757d', 
            marginBottom: '8px' 
          }}
        >
          {label}
        </Typography>
      )}
      
      <WeekDayContainer>
        {weekDays.map((day) => (
          <WeekDayButton
            key={day.full}
            className={value.includes(day.full) ? 'selected' : ''}
            onClick={() => handleDayClick(day.full)}
            title={day.full.charAt(0).toUpperCase() + day.full.slice(1)}
          >
            {day.short}
          </WeekDayButton>
        ))}
      </WeekDayContainer>
    </Box>
  );
};

export default CustomWeekDaySelector;