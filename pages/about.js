import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import MyNavbar from './navbar'
import Footer from './footer'
import 'bootstrap/dist/css/bootstrap.min.css';
// TODO:
// include more visuals on this webpage, such as pics of the officers. or we can just do a group photo cuz that would be cute
// discuss this w/ other officers
export default function Home() {
  return (
    <div>
      <Head>
        <title>WPI MTG Club | About</title>
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
          
        <br></br>   
        <h1>About The Club</h1>
        <p>WPI MTG club is a student club where students play Magic: the Gathering with each other. The club meets twice a week for casual play in a variety of formats, along with hosting occassional tournaments like paid drafts. Meetings are open to anyone: 7pm at the Campus Center first floor on Wednesdays and Saturdays.</p>
        <hr/>
        <h2>Meetings</h2>
        <p>The club meets on Wednesdays and Saturdays, starting at 7pm. The meetings occur in the Campus Center (CC), on the main floor at the long tables by Dunkin. Meetings, known as Casuals, are meant to be laid-back. Attend as many or as few as you wish, and there is no issue coming late or only staying for a few minutes. <br/>At Casuals, people play a lot of commander, but other formats such as modern, legacy, and casual are played too. Trading also occurs (and are often discussed prior in the Discord server). If you do not have a deck, people are more than happy to lend out their decks.</p>
        <h2>Officers</h2>
        <p>Below are the current officers and the positions they hold.</p>
        <ul>
            <li>President: Luke</li>
            <li>Vice President: Aiden</li>
            <li>Treasurer: Patrick</li>
            <li>Tournament Organizer: Aaron</li>
        </ul>
        <hr/>
        <h2>Club Socials</h2>
        <p>Below are the best ways to get in contact with the club and keep up with the latest events and news.</p>
        <h3>Discord</h3>
        <p>Discord is the main communication platform used by the club. Most announcements are there, along with general discussions among the club members (and alumni) about Magic related topics.</p>
        <Link href="https://discord.gg/8ccfGKc">Discord Invite Link</Link>
        <hr/>
        <h3>Instagram</h3>
        <p>The club also has an Instagram, which gives updates to events and posts other content related to the club.</p>
        <Link href="https://www.instagram.com/invites/contact/?i=4qgkk0do7m5m&utm_content=o9p00a9">@wpi_mtg_club</Link>
        <hr/>
        <h3>Email</h3>
        <p>{"Another means of contact is through the club\'s official email."}</p>
        <Link href="mailto:wpimtgclub@gmail.com">wpimtgclub@gmail.com</Link>


        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}

