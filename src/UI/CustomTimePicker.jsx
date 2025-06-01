import { TextField, InputAdornment, Popover, Box, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px !important',
    // backgroundColor: '#f8f9fa',
    border: '2px solid #e9ecef',
    cursor: 'pointer !important',
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: '#007bff',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 8px rgba(0, 123, 255, 0.15)',
    },
    '&.Mui-focused': {
      borderColor: '#007bff',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)',
    },
    '& fieldset': {
      border: 'none !important',
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px 8px !important',
    fontSize: '16px !important',
    fontWeight: '500 !important',
    color: '#495057 !important',
    cursor: 'pointer !important',
    '&::placeholder': {
      color: '#6c757d !important',
      opacity: 1,
    },
  },
  '& .MuiInputAdornment-root': {
    '& .MuiSvgIcon-root': {
      color: '#6c757d !important',
      fontSize: '24px !important',
      transition: 'color 0.3s ease',
      cursor: 'pointer !important',
    },
  },
  '&:hover .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: '#495057 !important',
  },
  '& .MuiInputLabel-root': {
    color: '#6c757d !important',
    fontWeight: '600 !important',
    fontSize: '16px !important',
    '&.Mui-focused': {
      color: '#6c757d !important',
    },
  },
}));

const TimePickerPopover = styled(Popover)(() => ({
  '& .MuiPaper-root': {
    borderRadius: '16px !important',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12) !important',
    border: '1px solid #e9ecef !important',
    padding: '20px !important',
    overflow: 'hidden !important',
    minWidth: '280px',
    maxHeight: '350px',
  },
}));





const ScrollableTimeList = styled(Box)(() => ({
  maxHeight: '180px',
  overflowY: 'auto',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
  minWidth: '70px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#c1c1c1',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: '#a8a8a8',
    },
  },
}));

const AMPMOption = styled(Typography)(() => ({
  fontSize: '14px !important',
  fontWeight: '600 !important',
  color: '#6c757d !important',
  backgroundColor: '#f8f9fa',
  border: '2px solid #e9ecef',
  borderRadius: '6px',
  padding: '6px 10px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#007bff',
    backgroundColor: '#ffffff',
    color: '#495057 !important',
    transform: 'scale(1.05)',
  },
  '&.selected': {
    background: 'linear-gradient(#f94141,#f4a0db) !important',
    color: 'white !important',
    borderColor: 'transparent !important',
    fontWeight: 'bold !important',
  }
}));

const ScrollableTimeItem = styled(Typography)(() => ({
  fontSize: '16px !important',
  fontWeight: '500 !important',
  color: '#495057 !important',
  padding: '6px 12px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#e3f2fd',
    color: '#1976d2 !important',
  },
  '&.selected': {
    background: 'linear-gradient(#f94141,#f4a0db) !important',
    color: 'white !important',
    fontWeight: 'bold !important',
  }
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: '12px !important',
  fontWeight: '600 !important',
  color: '#6c757d !important',
  textAlign: 'center',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const CustomTimePicker = ({ value, onChange, label, ...props }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAmpm] = useState('AM');
  const anchorRef = useRef(null);

  // Convert 24-hour time to 12-hour components
  const parseTime = (time24) => {
    if (!time24) return { hours: 12, minutes: 0, ampm: 'AM' };
    
    const [h, m] = time24.split(':').map(Number);
    const hours12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampmValue = h >= 12 ? 'PM' : 'AM';
    
    return { hours: hours12, minutes: m, ampm: ampmValue };
  };

  // Convert 12-hour components to 24-hour format
  const formatTo24Hour = (h, m, ap) => {
    let hour24 = h;
    if (ap === 'AM' && h === 12) {
      hour24 = 0;
    } else if (ap === 'PM' && h !== 12) {
      hour24 += 12;
    }
    return `${hour24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  // Format display string
  const formatDisplay = (h, m, ap) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ap}`;
  };

  // Initialize from value prop
  useEffect(() => {
    if (value) {
      const parsed = parseTime(value);
      setHours(parsed.hours);
      setMinutes(parsed.minutes);
      setAmpm(parsed.ampm);
      setDisplayValue(formatDisplay(parsed.hours, parsed.minutes, parsed.ampm));
    } else {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const parsed = parseTime(`${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`);
      setHours(parsed.hours);
      setMinutes(parsed.minutes);
      setAmpm(parsed.ampm);
      setDisplayValue(formatDisplay(parsed.hours, parsed.minutes, parsed.ampm));
    }
  }, [value]);

  const handleTimeChange = (newHours, newMinutes, newAmpm) => {
    const time24 = formatTo24Hour(newHours, newMinutes, newAmpm);
    const display = formatDisplay(newHours, newMinutes, newAmpm);
    
    setHours(newHours);
    setMinutes(newMinutes);
    setAmpm(newAmpm);
    setDisplayValue(display);
    
    if (onChange) {
      const syntheticEvent = {
        target: { value: time24 }
      };
      onChange(syntheticEvent);
    }
  };

  // Generate hour and minute options
  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: "100%", margin: "5px 0" }}>
      <StyledTextField
        ref={anchorRef}
        value={displayValue}
        onClick={handleOpen}
        label={label}
        placeholder="HH:MM AM/PM"
        variant="outlined"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccessTime />
              </InputAdornment>
            ),
            style: { cursor: 'pointer' },
            readOnly: true,
          },
          inputLabel: {
            shrink: true,
          },
        }}
        {...props}
      />

      <TimePickerPopover
        open={open}
        anchorEl={anchorRef.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {/* Hours Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ScrollableTimeList>
              {hourOptions.map((hour) => (
                <ScrollableTimeItem
                  key={hour}
                  className={hours === hour ? 'selected' : ''}
                  onClick={() => handleTimeChange(hour, minutes, ampm)}
                >
                  {hour.toString().padStart(2, '0')}
                </ScrollableTimeItem>
              ))}
            </ScrollableTimeList>
          </Box>

          {/* Separator */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#495057' }}>
              :
            </Typography>
          </Box>

          {/* Minutes Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ScrollableTimeList>
              {minuteOptions.map((minute) => (
                <ScrollableTimeItem
                  key={minute}
                  className={minutes === minute ? 'selected' : ''}
                  onClick={() => handleTimeChange(hours, minute, ampm)}
                >
                  {minute.toString().padStart(2, '0')}
                </ScrollableTimeItem>
              ))}
            </ScrollableTimeList>
          </Box>

          {/* AM/PM Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SectionTitle>Period</SectionTitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
              <AMPMOption 
                className={ampm === 'AM' ? 'selected' : ''}
                onClick={() => handleTimeChange(hours, minutes, 'AM')}
              >
                AM
              </AMPMOption>
              <AMPMOption 
                className={ampm === 'PM' ? 'selected' : ''}
                onClick={() => handleTimeChange(hours, minutes, 'PM')}
              >
                PM
              </AMPMOption>
            </Box>
          </Box>
        </Box>
      </TimePickerPopover>
    </div>
  );
};

export default CustomTimePicker;