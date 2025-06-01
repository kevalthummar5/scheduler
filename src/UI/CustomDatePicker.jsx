import { InputAdornment } from "@mui/material"
import { CalendarMonthOutlined, ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { styled } from "@mui/material/styles"

// Styled DatePicker with custom input styling
const StyledDatePicker = styled(DatePicker)(({ isWeek }) => ({
   width: "100%",
   "& .MuiInputBase-root": {
      borderRadius: "15px !important",
      backgroundColor: isWeek ? "#ffffff" : "#f8f9fa",
      border: "2px solid green !important",
      cursor: "pointer !important", // Make entire input clickable
      "&:hover": {
         borderColor: "#007bff",
         backgroundColor: "#ffffff",
         boxShadow: "0 2px 8px rgba(0, 123, 255, 0.15)"
      },
      "&.Mui-focused": {
         borderColor: "#007bff",
         backgroundColor: "#ffffff",
         boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)"
      },
      "& fieldset": {
         border: "none !important"
      }
   },
   "& .MuiInputBase-input": {
      padding: "10px 8px !important",
      fontSize: "16px !important", // Fixed font size (was 2px)
      fontWeight: "500 !important",
      color: "#495057 !important",
      cursor: "pointer !important",
      "&::placeholder": {
         color: "#6c757d !important",
         opacity: 1
      }
   },
   "& .MuiInputAdornment-root": {
      "& .MuiSvgIcon-root": {
         color: "#6c757d !important",
         fontSize: "24px !important",
         transition: "color 0.3s ease",
         cursor: "pointer !important"
      }
   },
   "&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "#495057 !important"
   },
   "& .MuiInputLabel-root": {
      color: "#6c757d !important",
      fontWeight: "600 !important",
      fontSize: "16px !important",
      "&.Mui-focused": {
         color: "#6c757d !important"
      }
   }
}))

// Global styles for custom calendar popup
const calendarPopupStyles = `
  /* Calendar popup container */
  .MuiPickersPopper-paper {
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
    border: 1px solid #e9ecef !important;
    padding : 12px !important;
    overflow: hidden !important;
  }

  /* Navigation arrows */
  .MuiPickersArrowSwitcher-root .MuiIconButton-root {
    color: #6c757d !important;
  }
  
  .MuiPickersArrowSwitcher-root .MuiIconButton-root:hover {
    background-color: #f8f9fa !important;
    color: #495057 !important;
  }

  /* Calendar header */
  .MuiPickersCalendarHeader-root {
    padding: 8px 0px 8px 8px !important;
    margin: 0px 16px !important;
  }

  .MuiPickersCalendarHeader-label {
    color: #495057 !important;
    font-weight: 600 !important;
    font-size: 18px !important;
  }

  /* Individual date cells */
  .MuiPickersDay-root {
    border-radius: 8px !important;
    padding : 0px !important;
    font-size : 16px !important;
    transition: all 0.3s ease !important;
    font-weight: 500 !important;
  }
  
  /* Date hover effect - light pink background and pink border */
  .MuiPickersDay-root:hover {
    background-color: #fce4ec !important;
    border: 2px solid #e91e63 !important;
    color: #c2185b !important;
    transform: scale(1.05) !important;
  }
  
  /* Selected date - gradient background and border radius */
  .MuiPickersDay-root.Mui-selected {
    background: linear-gradient(#f94141,#f4a0db) !important;
    border-radius: 8px !important;
    color: white !important;
    font-weight: bold !important;
  }
  
  /* Selected date hover effect */
  .MuiPickersDay-root.Mui-selected:hover {
    background: linear-gradient(#f94141,#f4a0db) !important;
    transform: scale(1.1) !important;
    box-shadow: 0 6px 16px rgba(233, 30, 99, 0.4) !important;
  }

  /* Today's date indicator */
  .MuiPickersDay-today {
    border: 2px solid #c2185b !important;
    color : #c2185b !important;
    background-color: rgba(243, 72, 197, 0.26) !important;
  }

  /* Week days header - Fixed font size and responsive text */
  .MuiDayCalendar-weekDayLabel {
    color: #6c757d !important;
    font-weight: 600 !important;
    font-size: 14px !important; /* Fixed from 1px */
    text-transform: none !important;
  }

    /* Override default weekday labels for mobile */
    .MuiDayCalendar-weekDayLabel:nth-child(1)::after { content: 'Su'; }
    .MuiDayCalendar-weekDayLabel:nth-child(2)::after { content: 'Mo'; }
    .MuiDayCalendar-weekDayLabel:nth-child(3)::after { content: 'Tu'; }
    .MuiDayCalendar-weekDayLabel:nth-child(4)::after { content: 'We'; }
    .MuiDayCalendar-weekDayLabel:nth-child(5)::after { content: 'Th'; }
    .MuiDayCalendar-weekDayLabel:nth-child(6)::after { content: 'Fr'; }
    .MuiDayCalendar-weekDayLabel:nth-child(7)::after { content: 'Sa'; }
    
    .MuiDayCalendar-weekDayLabel {
      text-indent: -9999px;
      position: relative;
    }
    
    .MuiDayCalendar-weekDayLabel::after {
      text-indent: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  

  /* Month/Year navigation buttons */
  .MuiPickersCalendarHeader-switchViewButton {
    color: #495057 !important;
    font-weight: 600 !important;
  }

  /* Remove mobile toolbar/header */
  .MuiPickersLayout-toolbar {
    display: none !important; 
  }

  /* Remove mobile footer action buttons completely */
  .MuiPickersLayout-actions {
    display: none !important; 
  }

  /* Remove dialog action buttons */
  .MuiDialogActions-root {
    display: none !important;
  }

  /* Remove action bar */
  .MuiPickersLayout-actionBar {
    display: none !important;
  }

  /* Remove mobile buttons container */
  .MuiPickersLayout-root .MuiDialogActions-root {
    display: none !important;
  }

  /* Remove any action buttons wrapper */
  .MuiPickersLayout-root .MuiPickersLayout-actions {
    display: none !important;
  }

  .MuiPickersCalendarHeader-switchViewButton:hover {
    background-color: #e9ecef !important;
  }
  
`

// Inject styles only once
if (!document.querySelector("#custom-calendar-styles")) {
   const style = document.createElement("style")
   style.id = "custom-calendar-styles"
   style.textContent = calendarPopupStyles
   document.head.appendChild(style)
}

const CustomDatePicker = ({ value, onChange, label, isWeek = false, ...props }) => {
   // Set default value to today if no value provided
   const today = new Date()
   const currentValue = value ? new Date(value) : today

   // Format display value based on isWeek prop
   const getDisplayFormat = () => {
      return isWeek ? "EEEE, MMMM dd" : "MMMM dd, yyyy"
   }

   const handleDateChange = (newValue) => {
      if (onChange) {
         // Convert back to string format for consistency
         const dateString = newValue ? newValue.toISOString().split("T")[0] : ""
         const event = {
            target: { value: dateString }
         }
         onChange(event)
      }
   }

   return (
      <div style={{ width: "100%", margin: "5px 0" }}>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StyledDatePicker
               value={currentValue}
               onChange={handleDateChange}
               label={label}
               format={getDisplayFormat()}
               isWeek={isWeek}
               closeOnSelect={true}
               slots={{
                  leftArrowIcon: ArrowBackIosOutlined,
                  rightArrowIcon: ArrowForwardIosOutlined,
                  openPickerIcon: () => null // Remove default calendar icon
               }}
               slotProps={{
                  textField: {
                     InputProps: {
                        startAdornment: (
                           <InputAdornment position="start">
                              <CalendarMonthOutlined style={{ color: "#6c757d", fontSize: "24px" }} />
                           </InputAdornment>
                        ),
                        // Make entire input field clickable
                        style: { cursor: "pointer" },
                        readOnly: true // Prevent keyboard input, force calendar popup
                     },
                     // Additional props to make clicking anywhere open the calendar
                     onClick: (event) => {
                        // Find the DatePicker component and trigger open
                        const datePicker = event.currentTarget.closest(".MuiFormControl-root")
                        if (datePicker) {
                           const openButton = datePicker.querySelector("button") || datePicker.querySelector('[role="button"]')
                           if (openButton) {
                              openButton.click()
                           }
                        }
                     },
                     style: { cursor: "pointer" }
                  }
               }}
               {...props}
            />
         </LocalizationProvider>
      </div>
   )
}

export default CustomDatePicker