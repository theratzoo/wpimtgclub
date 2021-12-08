import Link from 'next/link'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
        <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">WPI MTG Club</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/calendar">Calendar</Nav.Link>
        <Nav.Link href="/catalog">Catalog</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        
    )
}