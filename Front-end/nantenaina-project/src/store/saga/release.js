import { put } from "redux-saga/effects";
import { MusicBrainzApi } from 'musicbrainz-api';

import * as actions from '../action/actionCreator';

const mbApi = new MusicBrainzApi({
    appName: 'rvnanty',
    appVersion: '0.1.0',
    appContactInfo: 'ravelomanantsoa@yopmail.com'
});

export function* fetchArtistMB(action){
    yield put(actions.fetchStartMusicBrainz());
    const ArtistName = yield action.searchTerm;
    try{
        const response = yield mbApi.searchArtist(ArtistName);
        yield put(actions.fetchSuccessMusicBrainz(response.artists));
    }
    catch(error){
        yield put(actions.fetchErrorMusicBrainz());
    }
};

export function* fetchReleaseSaga(action){
    yield put(actions.fetchReleaseStart());
    const artisteName = yield action.artisteName;
    try{
        const response = yield mbApi.searchRelease(artisteName);
        const releaseList = yield response.releases.map(item => {
            return{
                id: item.id,
                year: item.date 
                    ? item.date.split('-')[0] === undefined
                    ? undefined
                    : item.date.split('-')[0]
                    : undefined,
                title: item.title ? item.title : undefined, 
                label: item['label-info'] && item['label-info'][0] && item['label-info'][0].label && item['label-info'][0].label.name
                    ? item['label-info'][0].label.name 
                    : undefined,                  
                tracks: item['track-count'] ? item['track-count'] : undefined,
                artist: item['artist-credit']?.[0].name
            }
            
        }).filter(item => item.artist === artisteName);
        yield put(actions.fetchReleaseSuccess(releaseList));
    }catch(error){
        yield put(actions.fetchReleaseError());
    }
}

export function* saveFavRelease (action){
    let releases = yield [];
    if (localStorage.getItem("releaseFav") === null){
        yield releases.push(action.release);
        yield localStorage.setItem("releaseFav",JSON.stringify(releases));
    }else{
        releases = yield JSON.parse(localStorage.getItem("releaseFav"));
        yield releases.push(action.release);
        yield localStorage.setItem("releaseFav",JSON.stringify(releases));
    }
    yield put(actions.setFavReleases());

}

export function* setFavReleases(action){
    let releases = yield [];
    if (localStorage.getItem("releaseFav") !== null){
        releases = yield JSON.parse(localStorage.getItem("releaseFav"));
    }
    yield put(actions.setFavReleasesSuccess(releases));
}

export function* removeFavReleaseSaga(action){
    let releases = yield [];
    if (localStorage.getItem("releaseFav") !== null){
        releases = yield JSON.parse(localStorage.getItem("releaseFav"));
        releases = yield releases.filter((item) => item.id !== action.release.id);
        yield localStorage.setItem("releaseFav",JSON.stringify(releases));
    }
    yield put(actions.setFavReleases());
}
