import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import styles from '../styles/Home.module.css'
import MyNavbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer'
import spreadsheet from '../spreadsheets/events_calendar.xlsx'

export default function Home() {
  // TODO: get today's date. only include things at the latest on the same date. anything earlier is IGNORED.
  const sheets = Object.values(spreadsheet.Sheets);
  const listOfEvents = []
	for(let i=0; i<sheets.length; i++) {
		const obj = Object.values(sheets[i])
		const len = obj.length - 2
		//console.log(obj)
    const currDate = new Date();
		for(let j=5; j<len; j+=5) {
			
			const name = obj[j+1].v; // name
			const start = obj[j+2].v; // start
			const end = obj[j+3].v; // end
			const desc = obj[j+4].v; // desc
			const img = obj[j+5].v; // img
      const date = new Date(start)
      const eventDate = new Date(start);
      if(currDate <= eventDate && listOfEvents.length < 2) {
        listOfEvents.push({name, date, desc, img});
      } else if(listOfEvents.length >= 2) {
        break;
      }
		}
  }

  return (
    <div>
      <Head>
        <title>WPI MTG Club | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta name="description" content="Homepage for WPI MTG Club's official website." />
        <link rel="shortcut icon" href="/images/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </Head>

      <main>
        <MyNavbar/>
        <div className="container">
          <div className="text-center"><img src="/images/mtgbanner.jpeg" alt="mtg banner" className="img-responsive banner"/></div>
          <br></br>            
            <p name="about_us" className="text-center h3">WPI MTG club is a student club where students play Magic: the Gathering with each other. The club meets twice a week for casual play in a variety of formats, along with hosting occassional tournaments like paid drafts. Meetings are open to anyone: 7pm at the Campus Center first floor on Wednesdays and Saturdays.</p>
            <br/>
            <hr/>            
            <h2>Upcoming Events</h2>
            <div className="row">
              <div className="col-sm-6">
              <Card className="customCard">
                <Card.Title>&emsp;{listOfEvents[0].name + " - " +  listOfEvents[0].date.toDateString()} </Card.Title>
                <Card.Img variant="top" src={"images/" + listOfEvents[0].img} alt={listOfEvents[0].name}/>
                <Card.Body>
                  <Card.Text>
                  {listOfEvents[0].desc}
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
              <div className="col-sm-6">
              <Card className="customCard">
                <Card.Title>&emsp;{listOfEvents[1].name + " - " +  listOfEvents[1].date.toDateString()}</Card.Title>
                <Card.Img variant="top" src={"images/" + listOfEvents[1].img} alt={listOfEvents[1].name}/>
                <Card.Body>
                  <Card.Text>
                    {listOfEvents[1].desc}
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
            </div>

            <hr/>
            <h2>Connect with the Club</h2>
            <p>Join below to keep up with the latest club news, be alerted for events, and discuss all things Magic with your classmates.</p>
            <Link href="https://discord.gg/8ccfGKc">Discord Invite Link</Link>

        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}
