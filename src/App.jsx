import toast, { Toaster } from "react-hot-toast"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import AddSchedule from "./AddSchedule"
import ScheduleList from "./ScheduleList"
import MoreTimeIcon from "@mui/icons-material/MoreTime"
import ListIcon from "@mui/icons-material/List"
import "./App.css"
import { useState } from "react"
function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
   }
}

export default function App() {
   const [value, setValue] = useState(0)
   const [scheduleList, setscheduleList] = useState([])
   const handleChange = (event, newValue) => {
      setValue(newValue)
   }
   const handleAddSchedule = (schedule)=>{
      setscheduleList([...scheduleList,{...schedule,id:Date.now()}])
      toast.success('schedule added')
   }

   return (
      <>
         <Toaster />
         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<MoreTimeIcon />} {...a11yProps(0)} />
            <Tab icon={<ListIcon />} {...a11yProps(1)} />
         </Tabs>
         {value === 0 && <AddSchedule  handleAddSchedule={handleAddSchedule}/>}
         {value === 1 && <ScheduleList scheduleList={scheduleList}/>}
      </>
   )
}
