import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import { UnfoldMore, ExpandMore } from "@mui/icons-material"

import CustomRadio from "./UI/CustomRadio"
import { useState } from "react"
import CustomDatePicker from "./UI/CustomDatePicker"
import CustomTimePicker from "./UI/CustomTimePicker"
import { styled } from "@mui/material/styles"
import { FormControl, MenuItem, Select } from "@mui/material"
import CustomWeekDaySelector from "./UI/CustomWeekDaySelector"

// Simple styled FormControlLabel - just bigger and bold
const StyledFormControlLabel = styled(FormControlLabel)(() => ({
   "& .MuiFormControlLabel-label": {
      fontSize: "16px",
      fontWeight: "bold"
   }
}))
function AddSchedule({handleAddSchedule}) {
   const [scheduleDetail, setscheduleDetail] = useState({
      on_status: "on",
      on_day: new Date().toISOString().split("T")[0],
      on_time: new Date().toTimeString().slice(0, 5),
      repeat_day: new Date().toISOString().split("T")[0],
      repeat_time: new Date().toTimeString().slice(0, 5),
      end_status: "never",
      end_on_after: "1 occurrence",
      repeat_weekday: [],
      repeat_count: 1,
      repeat_type: "minute",
      end_on_day: new Date().toISOString().split("T")[0]
   })
   const addHandler = ()=>{
    handleAddSchedule(scheduleDetail)
    setscheduleDetail({
      on_status: "on",
      on_day: new Date().toISOString().split("T")[0],
      on_time: new Date().toTimeString().slice(0, 5),
      repeat_day: new Date().toISOString().split("T")[0],
      repeat_time: new Date().toTimeString().slice(0, 5),
      end_status: "never",
      end_on_after: "1 occurrence",
      repeat_weekday: [],
      repeat_count: 1,
      repeat_type: "minute",
      end_on_day: new Date().toISOString().split("T")[0]
   })
   }

   return (
      <div style={{ padding: "8px 16px" }}>
         <RadioGroup
            value={scheduleDetail.on_status}
            aria-labelledby="demo-customized-radios"
            name="customized-radios"
            onChange={(e) => setscheduleDetail({ ...scheduleDetail, on_status: e.target.value })}
         >
            <StyledFormControlLabel value="on" control={<CustomRadio />} label="On" />
            <CustomDatePicker
               value={scheduleDetail.on_day}
               onChange={(e) => setscheduleDetail({ ...scheduleDetail, on_day: e.target.value })}
               isWeek={true}
            />
            <CustomTimePicker value={scheduleDetail.on_time} onChange={(e) => setscheduleDetail({ ...scheduleDetail, on_time: e.target.value })} />

            <hr style={{ margin: "8px 0" }}></hr>
            <StyledFormControlLabel value="repeat" control={<CustomRadio />} label="Repeat" />

            <div style={{ display: "flex" }}>
               <FormControl variant="outlined" sx={{ p: 0, width: "30%" }}>
                  <Select
                     value={scheduleDetail.repeat_count}
                     onChange={(e) => setscheduleDetail({ ...scheduleDetail, repeat_count: e.target.value })}
                     IconComponent={UnfoldMore}
                  >
                     {[...Array(50)].map((_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                           {i + 1}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <FormControl variant="outlined" sx={{ marginLeft: "auto", p: 0, width: "65%" }}>
                  <Select
                     value={scheduleDetail.repeat_type}
                     onChange={(e) => setscheduleDetail({ ...scheduleDetail, repeat_type: e.target.value })}
                     IconComponent={ExpandMore}
                  >
                     <MenuItem value="minute">Minute</MenuItem>
                     <MenuItem value="hour">Hour</MenuItem>
                     <MenuItem value="week">Week</MenuItem>
                     <MenuItem value="month">Month</MenuItem>
                  </Select>
               </FormControl>
            </div>
            {scheduleDetail.repeat_type === "week" && (
               <div>
                  <CustomWeekDaySelector
                     value={scheduleDetail.repeat_weekday}
                     onChange={(e) => setscheduleDetail({ ...scheduleDetail, repeat_weekday: e.target.value })}
                     label="Repeat On"
                  />
                  <CustomTimePicker
                     value={scheduleDetail.repeat_time}
                     onChange={(e) => setscheduleDetail({ ...scheduleDetail, repeat_time: e.target.value })}
                  />
               </div>
            )}

            {scheduleDetail.repeat_type === "month" && (
               <div>
                  <p
                     style={{
                        fontSize: "16px",
                        lineHeight: "1.5",
                        fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
                        fontWeight: "600",
                        color: "#6c757d",
                        marginTop: "10px"
                     }}
                  >
                     Repeat On
                  </p>
                  <CustomDatePicker
                     value={scheduleDetail.repeat_day}
                     onChange={(e) => setscheduleDetail({ ...scheduleDetail, repeat_day: e.target.value })}
                     isWeek={true}
                  />
                  <CustomTimePicker
                     value={scheduleDetail.repeat_time}
                     onChange={(e) => setscheduleDetail({ ...scheduleDetail, repeat_time: e.target.value })}
                  />
               </div>
            )}
         </RadioGroup>
         <hr style={{ margin: "8px 0" }}></hr>
         <h3
            style={{
               fontSize: "16px",
               lineHeight: "1.5",
               fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
               fontWeight: "600",
            }}
         >
            Ends
         </h3>
         <RadioGroup
            value={scheduleDetail.end_status}
            aria-labelledby="demo-customized-radios"
            name="customized-radios"
            onChange={(e) => setscheduleDetail({ ...scheduleDetail, end_status: e.target.value })}
         >
            <StyledFormControlLabel value="never" control={<CustomRadio />} label="Never" />
            <div style={{ display: "flex", width: "100%" }}>
               <StyledFormControlLabel value="on" control={<CustomRadio />} label="On" />

               <FormControl variant="outlined" sx={{ marginLeft: "auto", width: "65%" }}>
                  <CustomDatePicker
                     value={scheduleDetail.on_day}
                     onChange={(e) => setscheduleDetail({ ...scheduleDetail, on_day: e.target.value })}
                  />
               </FormControl>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
               <StyledFormControlLabel value="after" control={<CustomRadio />} label="After" />
               <FormControl variant="outlined" sx={{ marginLeft: "auto", width: "65%" }}>
                  <Select
                     value={scheduleDetail.end_on_after}
                     onChange={(e) => setscheduleDetail({ ...scheduleDetail, end_on_after: e.target.value })}
                     IconComponent={UnfoldMore}
                  >
                     {[...Array(50)].map((_, i) => (
                        <MenuItem key={i + 1} value={i + 1 + " occurrence"}>
                           {i + 1} occurrence
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </div>
         </RadioGroup>
         <hr style={{ margin: "8px 0" }}></hr>
         <button style={{ padding: "10px 20px" }} onClick={addHandler}>
            Add
         </button>
      </div>
   )
}

export default AddSchedule
