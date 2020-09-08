import React from 'react'

export default function Artists({ artists }) {
  const storage = window.localStorage

  const isEqualObjects = (art1, art2) => 
    art1.name === art2.name && art1.url === art2.url

  const isPartOfList = (art, artList) => {
    let isIn = false
    for (let i = 0; i < artList.length; i++) {
      if (isEqualObjects(artList[i], art)) {
        isIn = true
        break;
      }
    }
    return isIn
  }

  const addShortList = (artist) => {
    const shortlist = 'LOCAL_STORAGE_SHORTLIST'

    if (storage.getItem(shortlist) === null) {
      storage.setItem(shortlist, JSON.stringify([]))
    }
    let stgShortlist = JSON.parse(storage[shortlist])
    if (isPartOfList(artist, stgShortlist)) 
      alert("This one is already in your shortList")
    else {
      stgShortlist = [...stgShortlist, {...artist, favorite: false, shortlist: true}]
      storage[shortlist] = JSON.stringify(stgShortlist)
    }
  }

  const artistsMarkup = 
    artists.length > 0 
      ? (
        <>
          <h5 className="d-block artist-name-header">Artist Name</h5>

          <ul className="list-group list-group-flush w-100">       
            <hr className="m-0"/>
              {artists.map((artist, ind) => (
                <li className="list-group-item artist" key={`${ind} - ${artist.name}`}>
                  <span className="img-cover">
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      width="50px" 
                    />
                  </span>
              
                  <span 
                    className="d-inline-block artist-name" 
                    tabIndex="0" 
                    data-toggle="tooltip" 
                    title={artist.name}
                  >
                    <a href={artist.url} className="text-decoration-none" target="_blank"  rel="noopener noreferrer">
                      {artist.name}
                    </a>
                  </span>
                    
                  <span><i className="fas fa-plus-circle shortlist-add" onClick={() => addShortList(artist)}></i></span>
                </li>
              ))}
            <hr className="end-list" />
          </ul>
        </>
        )
      
      : <p className="first-load-text">Here you can searching for your artist...</p>

  return (
    <>
      {artistsMarkup}
    </>
  )
}
