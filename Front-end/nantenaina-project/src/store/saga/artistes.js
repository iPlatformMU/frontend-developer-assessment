import { put} from 'redux-saga/effects';
import axios from 'axios';
import uuid from 'react-uuid';

import * as actions from '../action/actionCreator';


export function* fetchSearchSaga(action){
    yield put(actions.fetchStartLastFm());
    const apiKey = '1c2cd9cb978181b102a28e3ee890bdd1';
    const keyword = action.searchTerm;
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${keyword.split(' ').join('%20')}&api_key=${apiKey}&format=json`
    try{
        const response = yield axios.get(url);
        const artistList = yield [];
        response.data.results.artistmatches.artist.map(item => {
            let artist = {
                image: item.image[1]['#text'] ? 
                    item.image[1]['#text'] : "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                name: item.name,
                mbid: item.mbid ? item.mbid : uuid(),
                url: item.url
            };
            artistList.push(artist);
            return artistList;
        });
        yield put(actions.fetchSuccessLastFm(artistList));
    }
    catch(error){
        yield put(actions.fetchErrorLastFm())
    }
}

export function* saveFavArtist (action){
    let artists = yield [];
    if (localStorage.getItem("artistsFav") === null){
        yield artists.push(action.artiste);
        yield localStorage.setItem("artistsFav",JSON.stringify(artists));
    }else{
        artists = yield JSON.parse(localStorage.getItem("artistsFav"));
        yield artists.push(action.artiste);
        yield localStorage.setItem("artistsFav",JSON.stringify(artists));
    }
    yield put(actions.setFavArtists());
}

export function* setFavArtist(action){
    let artists = yield [];
    if (localStorage.getItem("artistsFav") !== null){
        artists = yield JSON.parse(localStorage.getItem("artistsFav"));
    }
    yield put(actions.setFavArtistsSuccess(artists));
}

export function* removeFavArtistSaga(action){
    let artists = yield [];
    if (localStorage.getItem("artistsFav") !== null){
        artists = yield JSON.parse(localStorage.getItem("artistsFav"));
        artists = yield artists.filter((item) => item.mbid !== action.artiste.mbid);
        yield localStorage.setItem("artistsFav",JSON.stringify(artists));
    }
    yield put(actions.setFavArtists());
}


