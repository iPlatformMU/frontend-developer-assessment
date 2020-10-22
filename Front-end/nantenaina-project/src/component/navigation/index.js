import React from 'react';
import { NavLink } from 'react-router-dom';

import {NavigationWrapper , NavigationItem , Icon} from './style';
import lastFm from '../../assets/lastFm.svg';
import star from '../../assets/star.svg';

const navigation = props => {
    
    return (
        <NavigationWrapper>
            <NavLink to="/musicbrainz" exact>
                <NavigationItem>
                    MusicBrainz
                </NavigationItem>
            </NavLink>
            <NavLink to="/lastfm">
                <NavigationItem>
                    <Icon>
                        <img src={lastFm} alt="lastFm-icon"/>
                    </Icon>
                    Last.fm
                </NavigationItem>
            </NavLink>
            <NavLink to="/favourites">
                <NavigationItem>
                    <Icon>
                        <img src={star} alt="star"/>
                    </Icon>
                    Favourites
                </NavigationItem >
            </NavLink> 
        </NavigationWrapper>
    )
}



export default navigation;