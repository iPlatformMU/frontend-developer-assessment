import React, { useState, useRef } from 'react'
import Artists from '../components/Artists'
import { Form, InputGroup, FormControl } from 'react-bootstrap'
import axios from 'axios'
import ShortList from '../components/ShortList'

export default function LastFmSearch({ apiKey }) {
  const [artists, setArtists] = useState([])
  const [show, setShow] = useState(false)   // modal state
  const inputKeywordValue = useRef(null)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const fetchUrl = (keyword) => 
    `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${keyword.split(' ').join('%20')}&api_key=${apiKey}&format=json`

  const submitSearchHandler = (e) => {
    e.preventDefault()
    const keyword = inputKeywordValue.current.value
    if(keyword !== "") {
      const url = fetchUrl(keyword)
  
      axios.get(url)
        .then(response => {
          let artistsFound = response.data.results.artistmatches.artist
  
          if (artistsFound.length > 0) {
            artistsFound = artistsFound.map(artist => ({
              // mbid: artist.mbid,  // Some artists don't have mbid so we only have the artist name as Id
              url: artist.url,
              name: artist.name,
              image: artist.image.length === 0 || artist.image[artist.image.length - 1]["#text"] === ""
                      ? "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"  // Default img
                      : artist.image[artist.image.length - 1]["#text"]
            }))
          }
  
          setArtists(artistsFound)
        })
    }    
  }

  return (
    <div className="search w-auto mx-md-5 mt-5">
      <h1 className="font-weight-normal">Search Last.fm</h1>

      <Form className="search-form" onSubmit={submitSearchHandler}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Artist name..."
            aria-label="Recipient's username"
            aria-describedby="search-button"
            className="search-input"
            name="lastfm-search-input"
            ref={inputKeywordValue}
          />
          <InputGroup.Append onClick={submitSearchHandler}>
            <InputGroup.Text 
              className="bg-white" 
              id="search-button"
            >
              <i className="fas fa-search"></i>
          </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Form>

      <h2 className="search-results font-weight-normal mb-0 mt-5">
        Search results:
      </h2>

      <hr className="mt-0 mb-2 search-result-separator " />

      <button 
        className="btn btn-outline-secondary mb-3 float-right btn-sm" 
        onClick={handleShow}
      >
        Show short-list  
      </button>

      <Artists artists={artists}/>

      <ShortList show={show} handleClose={handleClose} />
    </div>
  )
}
