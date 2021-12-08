import MyNavbar from './navbar'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Calendar() {

	return (
		<div>
			<Head>
				<title>WPI MTG Club | Calendar</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="Calendar, where upcoming events are posted." />
				<link rel="shortcut icon" href="/images/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      		</Head>
			<main className="body">
				<MyNavbar/>
				<div className="container">
					<div className="jumbotron">
						<h1>Calendar</h1>
					</div>
					<br/>
					<h2>The official calendar is a WIP, but below is our reoccuring events:</h2>
					<br/>
					<h3>Casuals: Wednesdays and Saturdays at 7PM in the CC long tables by Dunkin</h3>
					<p>All formats are welcomed! EDH is the most popular format, but modern players exist too. Occasionally we have drafts, watch the discord server for news on those.</p>
				</div>
			</main>
		</div>
		
	)
}
