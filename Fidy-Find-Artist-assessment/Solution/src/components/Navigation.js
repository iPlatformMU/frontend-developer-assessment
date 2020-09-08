import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

export default function Navigation() {
  return (
    <Navbar bg="dark" expand="sm" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          
          <Nav.Link href="/musicbrainz">MusicBrainz</Nav.Link>

          <Nav.Link href="/lastfm" className="ml-3">
            <i className="fab fa-lastfm mr-1 text-danger"></i>
            Last.fm
          </Nav.Link>

          <Nav.Link href="/favorites" className="ml-3">
            <i className="fas fa-star mr-1 text-warning"></i>
            Favorites
          </Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}