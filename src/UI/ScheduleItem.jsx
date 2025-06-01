import { Chip } from "@mui/material"
import "./ScheduleItem.css"
import { Brightness1, CalendarMonthOutlined, AccessTime, HourglassEmpty, ArrowForward } from "@mui/icons-material"
import { generateScheduleDescription, getStartDetails, getEndDetails, getTimeDetails } from "../utils"
export default function ScheduleItem({ item }) {
   return (
      <div className="main-card">
         <div className="card-title">
            <h2>{item.on_status === "on" ? "Scheduled On" : "Repeat After Interval"} </h2>
            <Chip
               sx={{ padding: "2px 2px", backgroundColor: "#90ee90a3", color: "green", fontSize: "12px", fontWeight: "600" }}
               icon={<Brightness1 sx={{ width: "8px", color: "green" }} />}
               label="Active"
               color="success"
            />
         </div>
         {item.on_status === "repeat" && (
            <div className="card-desc">
               <HourglassEmpty sx={{ width: "40px", color: "gray" }} />{" "}
               <h2>
                  Repeat Every {item.repeat_count} &nbsp;
                  {item.repeat_type}
               </h2>
            </div>
         )}
         {(item.repeat_type === "month" || item.repeat_type === "week" || item.on_status === "on") && (
            <>
               <div className="card-desc">
                  <CalendarMonthOutlined sx={{ width: "40px", color: "gray" }} />{" "}
                  <h2>
                     <span>{getStartDetails(item)}</span>
                     <ArrowForward sx={{ width: "18px", color: "gray", margin: "0 8px" }} />
                     <span>{getEndDetails(item)}</span>
                  </h2>
               </div>
               <div className="card-desc">
                  <AccessTime sx={{ width: "40px", color: "gray" }} />
                  <h2>{getTimeDetails(item)}</h2>
               </div>
            </>
         )}

         <p className="card-para"> {generateScheduleDescription(item)} </p>
      </div>
   )
}
