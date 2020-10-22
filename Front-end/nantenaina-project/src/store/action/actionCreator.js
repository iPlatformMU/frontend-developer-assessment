import * as actionTypes from './actionTypes';

export const initSearchLastFm = (term) => {
    return{
        type: actionTypes.LAST_FM_INIT_SEARCH,
        searchTerm: term
    };
};

export const fetchStartLastFm = () => {
    return {
        type: actionTypes.LAST_FM_FETCH_START
    };
};

export const fetchSuccessLastFm = (data) => {
    return{
        type: actionTypes.LAST_FM_FETCH_SUCCESS,
        data: data
    }
};

export const fetchErrorLastFm = () =>{
    return{
        type: actionTypes.LAST_FM_FETCH_ERROR
    }
    
};

export const initSearchMusicBrainz = (term) => {
    return{
        type: actionTypes.M_BRAINZ_INIT_SEARCH,
        searchTerm: term
    };
};

export const fetchStartMusicBrainz = () => {
    return {
        type: actionTypes.M_BRAINZ_FETCH_START
    };
};

export const fetchSuccessMusicBrainz = (data) => {
    return{
        type: actionTypes.M_BRAINZ_FETCH_SUCCESS,
        data: data
    }
};

export const fetchErrorMusicBrainz = () =>{
    return{
        type: actionTypes.M_BRAINZ_FETCH_ERROR
    }
    
};


// Release
export const initSearchRelease = (artisteName) => {
    return{
        type: actionTypes.INIT_SEARCH_RELEASE,
        artisteName: artisteName
    }
}
export const fetchReleaseStart = () => {
    return{
        type: actionTypes.FETCH_RELEASE_START,
    }
}

export const fetchReleaseSuccess = (data) => {
    return {
        type: actionTypes.FETCH_RELEASE_SUCCESS,
        data: data
    }
}

export const fetchReleaseError = () => {
    return {
        type: actionTypes.FETCH_RELEASE_ERROR
    }
}

// add favorite artiste 

export const addFavArtisteInit = (item) => {
    return {
        type: actionTypes.ADD_FAV_ARTISTE,
        artiste: item
    }
}

//remove favorite artiste
export const removeFavArtiste = (artiste) => {
    return {
        type: actionTypes.REMOVE_FAV_ARTISTE,
        artiste: artiste
    }
}

//add favorite release 

export const addfavRelease = (release) => {
    return {
        type: actionTypes.ADD_FAV_RELEASE,
        release: release
    }
}

//remove favorite release

export const removeFavRelease = (release) => {
    return {
        type: actionTypes.REMOVE_FAV_RELEASE,
        release: release
    }
}

//set favourites from localstorage
export const setFavArtists = () => {
    return {
        type: actionTypes.SET_FAV_ARTISTS
    }
}

export const setFavReleases = () => {
    return {
        type: actionTypes.SET_FAV_RELEASES
    }
}

//update store with DATA  receive from local storage
export const setFavArtistsSuccess = (artists) => {
    return {
        type: actionTypes.SET_FAV_ARTISTS_SUCCESS,
        artists: artists
    }
}

export const setFavReleasesSuccess = (releases) => {
    return {
        type: actionTypes.SET_FAV_RELEASES_SUCCESS,
        releases: releases
    }
}


