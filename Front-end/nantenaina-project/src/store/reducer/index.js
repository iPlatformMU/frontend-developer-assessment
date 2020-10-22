import * as actionTypes from '../action/actionTypes';

const initialState = {
    artistsFav: [],
    releaseFav: [],
    resultsLastFm: [],
    ReleaseSearchResult: [],
    ArtistsListMB: []
};

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.LAST_FM_FETCH_SUCCESS: 
            return {
                ...state,
                resultsLastFm: action.data
            }
        case actionTypes.M_BRAINZ_FETCH_SUCCESS:
            return {
                ...state,
                ArtistsListMB: action.data
            }
        case actionTypes.FETCH_RELEASE_SUCCESS:
            return{
                ...state,
                ReleaseSearchResult: action.data
            }
        /*case actionTypes.ADD_FAV_ARTISTE:
            return{
                ...state,
                artistsFav: [...state.artistsFav,action.artiste]
            }
        case actionTypes.ADD_FAV_RELEASE:
            return{
                ...state,
                releaseFav: [...state.releaseFav,action.release]
            }
        case actionTypes.REMOVE_FAV_ARTISTE:
            return {
                ...state,
                artistsFav: state.artistsFav.filter((item) => item.mbid !== action.artiste.mbid)
            }
        case actionTypes.REMOVE_FAV_RELEASE:
            return{
                ...state,
                releaseFav: state.releaseFav.filter((item) => item.id !== action.release.id)
            }*/

        case actionTypes.SET_FAV_ARTISTS_SUCCESS:
            return{
                ...state,
                artistsFav: action.artists
            }
        case actionTypes.SET_FAV_RELEASES_SUCCESS:
            return{
                ...state,
                releaseFav: action.releases
            }
        default: 
            return state;
    }
};

export default reducer;