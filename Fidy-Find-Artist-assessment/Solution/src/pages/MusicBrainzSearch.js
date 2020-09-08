import React, { useState, useRef } from 'react'
import { Form, FormControl, InputGroup, Accordion, Card, Button } from 'react-bootstrap'
import { MusicBrainzApi } from 'musicbrainz-api'
import ReleasesList from '../components/ReleasesList'

export default function MusicBrainzSearch() {
  const inputKeywordValue = useRef(null)
  const [artists, setArtists] = useState([])
  const [releases, setReleases] = useState([])

  const updateReleases = updatedReleases => setReleases(updatedReleases)
  
  const mbApi = new MusicBrainzApi({
    appName: 'find-artists',
    appVersion: '0.1.0',
    appContactInfo: 'f.lineup@gmail.com'
  });

  const searchRelease = (artist) => {
    mbApi.searchRelease(artist.name)
      .then(releases => {       
        const rls = releases.releases.map(release => ({
          id: release.id,
          year: release.date 
                ? release.date.split('-')[0] === undefined 
                ? undefined
                : release.date.split('-')[0]
                : undefined,
          title: release.title ? release.title : undefined,
          label: release['label-info'] && release['label-info'][0] && release['label-info'][0].label && release['label-info'][0].label.name
                  ? release['label-info'][0].label.name 
                  : undefined,                  
          tracks: release['track-count'] ? release['track-count'] : undefined,
          artist: artist.name
        }))
        // Among the releases, search if some of them are already marked as favorite
        const storage = window.localStorage
        const strKey = 'MB_RELEASES_LIST'
        const strData = storage[strKey]

        if (strData !== undefined) {
          const strDataContent = JSON.parse(strData) // Extract data in localStorage
          const syncRls = rls.map(current => {
            let isFavorite = false
            for (let i = 0; i < strDataContent.length; i ++) {
              if (current.artist === strDataContent[i].name) {
                const strReleases = strDataContent[i].favoriteReleases
                for (let j = 0; j < strReleases.length; j++) {
                  if (strReleases[j].id === current.id) {
                    isFavorite = true
                    break
                  }
                }
              }
            }
            return isFavorite ? {...current, favorite: true} : current
          })
          setReleases(syncRls)          
        }
        else setReleases(rls)
      })
      .catch(err => {
        console.log("Error when searching for releases:")
        console.log(err)
      })
  }

  // Artitsts list
  const mbArtistMarkup = artists.length > 0 
  ? (
      <>
        <h5 className="mb-artist-name-header">Artist Name</h5>

        <Accordion defaultActiveKey="1">
          {artists.map((artist, index) => (
            <Card key={index + 1}>
              <Card.Header className="p-0">              
                <span className="card-title">{artist.name}</span>
              
                <Accordion.Toggle 
                  as={Button}
                  variant="link"
                  eventKey={index + 1} 
                  className="show-release-list text-decoration-none"
                  onClick={() => searchRelease(artist)}
                >
                  Show releases
                </Accordion.Toggle>              
              </Card.Header>

              <Accordion.Collapse eventKey={index + 1}>
                <Card.Body className="py-0">
                  <ReleasesList artist={artist} updateReleases={updateReleases} releases={releases} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>  
      </>
  )
  : <p className="first-load-text">Here you can searching for your artist...</p>

  const submitSearchHandler = e => {
    e.preventDefault()
    const keyword = inputKeywordValue.current.value
    mbApi.searchArtist(keyword)
      .then(response => {
        setArtists(response.artists.map(artist => ({
          id: artist.id,
          name: artist.name
        })))
      })
      .catch(error => {
        console.log('Error when Searching for artist with MusicBrainz Api')
        console.log(error)
      })
  }

  return (
    <div className="search w-auto mx-md-5 mt-5">
      <h1 className="font-weight-normal">Search MusicBrainz</h1>

      <Form className="search-form" onSubmit={submitSearchHandler}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Artist name..."
            aria-label="Recipient's username"
            aria-describedby="search-button"
            className="search-input"
            name="mb-search-input"
            ref={inputKeywordValue}
          />
          <InputGroup.Append>
            <InputGroup.Text 
              className="bg-white" 
              id="search-button"
              onClick={submitSearchHandler}
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
    
      {mbArtistMarkup}
    </div>
  )
}
