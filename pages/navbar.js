import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'next/image'

export default function MyNavbar() {
    const links = ['/calendar', '/catalog']
    const names = ['Events Calendar', 'Card Catalog']
    const navLinks = links.map((link, i)=> {
        return (
            <li key={i} className="nav-item">
              <Link className="nav-link" href={link}>{names[i]}</Link>
            </li>
        )
    })
    return (
        <Navbar bg="light customNav" expand="lg" className="">
  <Container>
    <Navbar.Brand className="fs-2" href="/">WPI MTG Club</Navbar.Brand>
    <Navbar.Text><Image src="/images/favicon.ico" width="60px" height="60px" alt="logo" className="ml-3"></Image></Navbar.Text>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link className="fs-4 ml-5" href="/">Home</Nav.Link>
        <Nav.Link className="fs-4 ml-5" href="/about">About</Nav.Link>
        <Nav.Link className="fs-4 ml-5" href="/catalog">Catalog</Nav.Link>
        <Nav.Link className="fs-4 ml-5" href="/calendar">Calendar</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        
    )
}