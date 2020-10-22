import { takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../action/actionTypes';
import { fetchSearchSaga , saveFavArtist, setFavArtist, removeFavArtistSaga } from './artistes';
import { fetchReleaseSaga , fetchArtistMB,saveFavRelease, setFavReleases , removeFavReleaseSaga } from './release';

export function* watchArtistes(){
    
    yield takeEvery(actionTypes.LAST_FM_INIT_SEARCH,fetchSearchSaga);
    yield takeEvery(actionTypes.M_BRAINZ_INIT_SEARCH,fetchArtistMB);
    yield takeEvery(actionTypes.INIT_SEARCH_RELEASE,fetchReleaseSaga);
    yield takeEvery(actionTypes.ADD_FAV_ARTISTE,saveFavArtist);
    yield takeEvery(actionTypes.SET_FAV_ARTISTS,setFavArtist);
    
    yield takeEvery(actionTypes.ADD_FAV_RELEASE,saveFavRelease);
    yield takeEvery(actionTypes.SET_FAV_RELEASES,setFavReleases);

    yield takeEvery(actionTypes.REMOVE_FAV_ARTISTE,removeFavArtistSaga);
    yield takeEvery(actionTypes.REMOVE_FAV_RELEASE,removeFavReleaseSaga);

    
}