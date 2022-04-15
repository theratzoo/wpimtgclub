import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import styles from '../styles/Home.module.css'
import MyNavbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer'

export default function Home() {
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
              <div className="col-sm-4">
              <Card className="customCard">
                <Card.Title>&emsp;Wednesday Casuals</Card.Title>
                <Card.Img variant="top" src="images/casuals.png" alt="casuals"/>
                <Card.Body>
                  <Card.Text>
                    Wednesdays, 7pm at Campus Center.<br/>
                    Bring your cards and play Magic with your fellow peers.<br/>
                    Special tournaments (drafts, constructed, etc.) announced on Discord<br/>
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
              <div className="col-sm-4">
              <Card className="customCard">
                <Card.Title>&emsp;Saturday Casuals</Card.Title>
                <Card.Img variant="top" src="images/casuals.png" alt="casuals"/>
                <Card.Body>
                  <Card.Text>
                    Saturdays, 7pm at Campus Center.<br/>
                    Bring your cards and play Magic with your fellow peers.<br/>
                    Special tournaments (drafts, constructed, etc.) announced on Discord<br/>
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
              <div className="col-sm-4">
              <Card className="customCard">
                <Card.Title>&emsp;Gaming Weekend: April 29-30</Card.Title>
                <Card.Img variant="top" src="images/newcapenna.jpeg" alt="gaming weekend"/>
                <Card.Body>
                  <Card.Text>
                    Unity Hall, fourth floor.<br/>
                    Friday at 7pm: New Capenna Draft<br/>
                    Saturday at 1pm: Modern Tournament<br/>
                    <br/>
                    <br/>
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
