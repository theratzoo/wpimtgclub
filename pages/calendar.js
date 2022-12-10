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
import tippy from 'tippy.js';

import spreadsheet from '../spreadsheets/events_calendar.xlsx'

// https://github.com/jrsousadev/fullcalendar-scheduler-web
// use this as examples to shape our calendar...

// https://fullcalendar.io/docs/event-object

export default function Calendar() {
	const numColumns = 5;
	const listOfEvents = []

	const sheets = Object.values(spreadsheet.Sheets);
	for(let i=0; i<sheets.length; i++) {
		const obj = Object.values(sheets[i])
		const len = obj.length - 2
		console.log(obj)
		for(let j=5; j<len; j+=5) {
			
			const title = obj[j+1].v; // name
			const start = obj[j+2].v; // start
			const end = obj[j+3].v; // end
			const description = obj[j+4].v; // desc
			const img = obj[j+5].v; // img
			let backgroundColor = "#0b66a4"; // darker blue
			if(title != "Casuals") {
				backgroundColor = "#7f1a0e"; // darker red
			}
			listOfEvents.push({title, start, end, description, backgroundColor});

		}
		console.log(listOfEvents);

	}

	const eventsCalendar = {events: listOfEvents};
	return (
		<div>
			<Head>
					<title>WPI MTG Club | Event Calendar</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<meta name="description" content="Catalog, where you can view and purchase club cards." />
					<link rel="shortcut icon" href="/images/favicon.ico" />
					<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
			</Head>
			<main>
				<MyNavbar/>
				<FullCalendar
					plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
					initialView="timeGridWeek"
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay",
					}}
					locale="en-us"
					eventMouseEnter={
						(arg) =>{
							tippy(arg.el, {
								content: arg.event.extendedProps.description,
							});}
					}
					initialEvents={eventsCalendar}
					longPressDelay={1000}
					eventLongPressDelay={1000}
					selectLongPressDelay={1000}
					selectable={true}
					dayMaxEvents={true}
					allDaySlot={false}
					editable={false}
					height="700px"
					timeZone='local'
					slotMinTime="12:00:00"
					buttonText={{
						today: "Today",
						month: "Month",
						week: "Week",
						day: "Day",
						list: "List",
					}}
					/>
				</main>
			</div>
		);		
}
