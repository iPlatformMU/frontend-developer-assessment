import React, { useState, useEffect } from 'react'
import { Modal, ListGroup } from 'react-bootstrap'

export default function ShortList ( {show, handleClose} ) {
  const [shortList, setShortList] = useState([])

  useEffect(() => {
    setShortList(JSON.parse(window.localStorage.getItem('LOCAL_STORAGE_SHORTLIST')))
  },[show])

  const addToFavorite = (artist) => {
    const newShortlist = shortList.map(art => {
      if (art.name + art.url === artist.name + artist.url) {
        return {...art, favorite: !art.favorite}
      }
      else return art
    })
    
    window.localStorage.setItem('LOCAL_STORAGE_SHORTLIST', JSON.stringify(newShortlist))
    setShortList(newShortlist)
  }

  const shortListMarkup = shortList !== null 
    ? (
      <>
        <p className="artist-name-header-modal">Artist Name</p> 
        <hr className="mt-1 mb-0"/>

        <ListGroup variant="flush shortList">

          {shortList.map((artist, index) => (
            <ListGroup.Item key={`${index} - ${artist.name}`} className="pl-1 shortlist-item" >
              <i className="fas fa-star favorite-icon" 
                style={{color: artist.favorite ? "royalblue" : "lightgrey"}}
                onClick={() => addToFavorite(artist)}
              ></i>
              <a href={artist.url} target="_blank" 
                rel="noopener noreferrer" 
                className="text-decoration-none text-dark" 
              >
                <span className="artist-name-shortlist">{artist.name}</span>
              </a>
            </ListGroup.Item>
          ))}

        </ListGroup>
      </>
    ) 
    : <p>Empty List !</p>

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <p className="modal-title ml-3 mt-3">
          My short list.
          <span class="modal-close" onClick={handleClose}>x</span>
        </p>
        <hr className="m-0 mt-3" />
        <Modal.Body className="pb-0">
          {shortListMarkup}
        </Modal.Body>
      </Modal>
    </>
  );
}
