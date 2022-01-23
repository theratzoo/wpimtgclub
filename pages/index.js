import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import styles from '../styles/Home.module.css'
import MyNavbar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <div className="jumbotron" style={{paddingTop: "40px"}}>
            <div className="row">
              <div className="col-sm-6">
              <h1>WPI MTG Club</h1>
              </div>
              <div className="col-sm-6">
              <Image src="/images/favicon.ico" width="100%" height="100%" alt="wpi mtg club logo"/> 
              </div>
              </div>
            
            </div>
            <br/>
            <p name="about_us">WPI MTG club is a student club where students play Magic: the Gathering with each other. The club meets twice a week for casual play in a variety of formats, along with hosting tournaments like paid drafts.</p>
            <p>On this website, you can view the Events Calendar to see upcoming events, and also the Card Catalog, which lists cards that the club owns for sale.</p>
            <hr/>
            <h2>Discord Link</h2>
            <p>Join below for announcements on events, chats to discuss everything magic with your classmates, and more!</p>
            <Link href="https://discord.gg/8ccfGKc">Discord Invite Link</Link>
            <br/>
            <hr/>
            <h2>Club Officers</h2>
            <div className="row">
              <div className="col-sm-4">
              <Card>
                <Card.Title>{"President"}</Card.Title>
                <Card.Img variant="top" src="images/luke.jpg" alt="picture of luke"/>
                <Card.Body>
                  <Card.Text>
                    {"Luke Deratzou"}
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
              <div className="col-sm-4">
              <Card>
                <Card.Title>{"Vice President"}</Card.Title>
                <Card.Img variant="top" src="images/matt.jpg" alt="picture of matt"/>
                <Card.Body>
                  <Card.Text>
                    {"Matt"}
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
              <div className="col-sm-4">
              <Card>
                <Card.Title>{"Treasurer"}</Card.Title>
                <Card.Img variant="top" src="images/patrick.jpg" alt="picture of patrick"/>
                <Card.Body>
                  <Card.Text>
                    {"Patrick"}
                  </Card.Text>
                </Card.Body>
              </Card>
              </div>
            </div>


            

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
