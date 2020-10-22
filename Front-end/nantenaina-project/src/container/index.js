import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navigation from '../component/navigation';
import {Wrapper} from './style';
import Favouties from '../component/favourites/index';
import LastFm from '../component/last-fm/index';
import MusicBrainz from '../component/MusicBrainz/index.js';

const container = props => {

    let routes = (
        <Switch>
            <Route path="/musicbrainz" component={MusicBrainz} />
            <Route path="/lastfm" component={LastFm}/>
            <Route path="/favourites" component={Favouties}/>
            <Redirect to="/favourites"/>
        </Switch>

    )

    return(
        <Wrapper>
            <Navigation/>
            {routes}   
        </Wrapper>
    )
}

export default container;