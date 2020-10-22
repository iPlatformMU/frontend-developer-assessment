import React , { useEffect , useMemo } from 'react';
import { connect } from 'react-redux';
import removeIcon from '../../assets/remove.svg';
import * as actions from '../../store/action/actionCreator';

import { 
    FavouritesWrapper,
    ArtistsWrapper, 
    ReleaseWrapper,
    TitleWrapper,
    EmptyList
} from './style';

const Favourites = props => {
    const {
        Artists,
        Releases,
        removeRelease,
        removeArtiste,
        setFavArtists,
        setFavReleases
    } = props

    useEffect(()=> {
        setFavArtists();
        setFavReleases();
    },[setFavArtists,setFavReleases]);

    const showArtists = useMemo(() => {
        let show = '';
        if(Artists.length <= 0){
            show=<EmptyList> Empty list ... </EmptyList>
        }else{
            show = <ArtistsWrapper>
                <table>
                    <tbody>
             {Artists.map((artist,index) => (
                <tr key={index} onClick={() => removeArtiste(artist)}>
                    <td>
                        <img src={removeIcon} alt="remove"/>
                    </td>
                    <td>
                        <a href={artist.url}>{artist.name}</a>
                    </td>
                   
                </tr>
            ))}
             </tbody>
            </table>
            </ArtistsWrapper>
        }
        return show; 

    },[Artists, removeArtiste]);

    const showReleases = useMemo (() => {
        let show = '';
        if(Releases.length <= 0){
            show=<EmptyList> Empty list ... </EmptyList>
        }else{
            show = (<ReleaseWrapper>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Artiste name</th>
                            <th>Year</th>
                            <th>Title</th>
                            <th>Release label</th>
                            <th>Number of tracks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Releases.map((release,index) => (
                            <tr key={index} onClick={() => removeRelease(release)}>
                                <td>
                                    <img src={removeIcon} alt="remove"/>
                                </td>
                                <td>
                                   {release.artist} 
                                </td>
                                <td>
                                    {release.year}
                                </td>
                                <td>
                                    {release.title}
                                </td>
                                <td>
                                    {release.label}
                                </td>
                                <td>
                                    {release.tracks}
                                </td>
            
                            </tr>
                        ))}
                    </tbody>

            </table>
            </ReleaseWrapper>);
            
            
        }
        return show; 
    } ,[removeRelease , Releases]);


    return (
        <>
            <FavouritesWrapper>
                <h3>Your favourites</h3>

            </FavouritesWrapper>
            <ArtistsWrapper>
                <TitleWrapper>Artists</TitleWrapper>
                <hr/>
                {showArtists}

            </ArtistsWrapper>
            <ReleaseWrapper>
                <TitleWrapper>Releases</TitleWrapper>
                <hr/>
                {showReleases}
            </ReleaseWrapper>
        </>
    )
}

const mapStateToProps = state => {
    return {
        Artists : state.artistsFav,
        Releases : state.releaseFav
    };
}

const mapDispatchToProps = dispatch => {
    return{
        removeRelease: (release) => dispatch(actions.removeFavRelease(release)),
        removeArtiste: (artiste) => dispatch(actions.removeFavArtiste(artiste)),
        setFavArtists: () => dispatch(actions.setFavArtists()),
        setFavReleases: () => dispatch(actions.setFavReleases())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Favourites);