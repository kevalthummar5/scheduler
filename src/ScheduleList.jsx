import ScheduleItem from "./UI/ScheduleItem"

function ScheduleList({ scheduleList }) {
   if (scheduleList.length === 0) {
      return <div>No schedules found</div>
   } else {
      return (
         <div>
            {scheduleList.map((item) => {
               return <ScheduleItem key={item.id} item={item} />
            })}
         </div>
      )
   }
}

export default ScheduleList
