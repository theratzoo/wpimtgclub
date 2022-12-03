import MyNavbar from './navbar'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import FullCalendar from "@fullcalendar/react";
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// https://github.com/jrsousadev/fullcalendar-scheduler-web
// use this as examples to shape our calendar...

export default function Calendar() {
	const eventsCalendar = require("../data/events.json");
	
	return (
		<FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      locale="en-us"
      //select={handleAddEventSelectAndOpenModal}
      //eventClick={handleEditEventSelectAndOpenModal}
      //eventChange={handleUpdateEventSelect}
      initialEvents={eventsCalendar}
      longPressDelay={1000}
      eventLongPressDelay={1000}
      selectLongPressDelay={1000}
      selectable={true}
      dayMaxEvents={true}
      allDaySlot={false}
      editable={true}
      height="700px"
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List",
      }}
    />
		);		
}
