import React, { useState } from 'react'
import { Accordion, Card, Table } from 'react-bootstrap'

export default function Favorites() {
  const [ favs, setFavs] = useState([])
  const storage = window.localStorage
  const strKey = 'MB_RELEASES_LIST'

  const strData = storage[strKey]
  const strDataContent = strData ? JSON.parse(strData) : []

  const rmvToFavoriteArtist = artistToRemove => {
    const newStrDatacontent = strDataContent.filter(artist => artist.id !== artistToRemove.id)
    storage.setItem(strKey, JSON.stringify(newStrDatacontent))
    setFavs([])
  }

  const removeToFavReleases = releaseToRmv => {
    let newStrDataContent = strDataContent.map(artist => {
      if (artist.name === releaseToRmv.artist) {
        const artistFavList = artist.favoriteReleases
        const newArtistFavList = artistFavList.filter(release => 
          release.id === releaseToRmv.id
            ? null
            : artist
        )
        return {...artist, favoriteReleases: newArtistFavList}
      }
      return artist
    })
    newStrDataContent = newStrDataContent.filter(artist => artist.favoriteReleases.length > 0)
    storage.setItem(strKey, JSON.stringify(newStrDataContent))
    setFavs([])
  }
    
  const favsMarkup = 
    favs.length === 0 
      ? (
        <>
          {
            strDataContent.length > 0 
              ? (
                <>
                  <p className="favorite-artist-name-header mt-3">Artist Name</p>
                  <hr className="mt-1 mb-0"/>
                </>
              )
              : <p className="first-load-text">Empty list...</p>
          }
          <Accordion>
            {
              strDataContent.map((artist, index) => (
                <Card key={index+1}>              
                  <Accordion.Toggle className="favlist-item p-2" as={Card.Header} eventKey={index+1}>
                    <i className="fas fa-minus-circle minus-icon cursor-pointer" onClick={() => rmvToFavoriteArtist(artist)}></i>
                    <span className="cursor-default">{artist.name}</span>
                    <span className="text-primary cursor-pointer">Show releases</span>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey={index+1}>
                    <Card.Body className="py-0">
                    <Table responsive="sm">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Years</th>
                          <th>Title</th>
                          <th>Release label</th>
                          <th>Number of tracks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          artist.favoriteReleases.map(release => (
                            <tr>
                              <td><i className="fas fa-minus-circle text-danger ml-sm-2" onClick={() => removeToFavReleases(release)}></i></td>
                              <td>{release.year}</td>
                              <td>{release.title}</td>
                              <td>{release.label}</td>
                              <td>{release.tracks}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))
            }
          </Accordion>
        </>
      )
      : <p className="empty-list">LOADING...</p>

  return (
    <>
      <h1 className="font-weight-normal mt-5">Favorites</h1>
      {favsMarkup}
    </>
  )
}
