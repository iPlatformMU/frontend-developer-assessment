import React from 'react'
import { Table } from 'react-bootstrap'

export default function ReleasesList({ artist, releases, updateReleases }) {
  const addToFavorites = release => {    
    const updatedReleases = releases.map(current => {
      if ((current.id === release.id && current.favorite !== true) 
        || (current.id === release.id && current.favorite === null) ) {
        return {...current, favorite: true} 
      }
      else if (current.id === release.id && current.favorite === true) {
        alert('This release is already in your favorite list.')
        return current
      }
      else return current
    })     
    updateReleases(updatedReleases)

    //update localStorage
    const storage = window.localStorage
    const strKey = 'MB_RELEASES_LIST'
    let strContent = storage[strKey]

    strContent = strContent ? JSON.parse(strContent) : [] // If storage is not null ? catch content else initialize it with []
    
    let isUpdated = false
    strContent = strContent.map(strArtist => { // update storage value
      if (strArtist.name === artist.name) {
        isUpdated = true    
        return {...strArtist, favoriteReleases: [...strArtist.favoriteReleases, release]}
      }
      else return strArtist
    })

    if (isUpdated === false) {
      strContent = [...strContent,{...artist, favoriteReleases:[release]}]
    }
    storage[strKey] = JSON.stringify(strContent)
  }

  // Markup for releases
  const releasesMarkup = releases.length > 0 
    ? (
      <Table responsive="lg">
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
            releases.map(release => (
              <tr key={release.id}>
                <td>
                  <i className="fas fa-star favorite-icon" 
                    style={{color: release.favorite ? "royalblue": "lightgrey"}}
                    onClick={() => addToFavorites(release)}
                  ></i>
                </td>
                <td>{release.year}</td>
                <td>{release.title}</td>
                <td>{release.label}</td>
                <td>{release.tracks}</td>
              </tr>
            ))
          }

        </tbody>
      </Table>
    )
    : <p className='text-center mx-auto my-2'>LOADING...</p>
  
  return <>{releasesMarkup}</>
}
