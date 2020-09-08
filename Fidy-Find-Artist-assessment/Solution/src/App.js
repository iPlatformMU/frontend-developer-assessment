import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navigation from './components/Navigation'
import Layout from './components/Layout'
import MusicBrainzSearch from './pages/MusicBrainzSearch'
import LastFmSearch from './pages/LastFmSearch'
import Favorites from './pages/Favorites'

function App() {
  const apiKey = "c6d0b38ec914c2577ea360e348e83a86"
  return (
    <Container fluid className="App p-0">
      <Navigation />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/musicbrainz" component={MusicBrainzSearch} />
            <Route exact path="/lastfm">
              <LastFmSearch apiKey={apiKey}/>
            </Route>
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/" component={Favorites} />
          </Switch>
        </Router>
      </Layout>
    </Container>
  );
}

export default App;
