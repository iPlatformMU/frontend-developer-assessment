import React , { useEffect , useState , useCallback } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/action/actionCreator';
import { Accordion , Card , Button} from 'react-bootstrap';
import Release from './Release/release';


import SearchBar from '../UI/search-bar/index';
import {
    ResultsWrapper,
    ArtistWrapper,
    Title,
    ShowRelease
} from './style';

const MusicBrainz = props => {
    const [ ArtistsList , setArtistsList] = useState('');
    const [currentIndex , setCurrentIndex] = useState(-1);
    
    const {
        ArtistResults,
        onFetchRelease
    } = props;

    const HandleShowRelease = useCallback((name,index) => {
        setCurrentIndex(index);
        onFetchRelease(name);
    },[onFetchRelease]);

    useEffect(()=>{
        let ArtistList = '';
        if(ArtistResults && ArtistResults.length > 0){
            ArtistList= (
                <ResultsWrapper>
                    <h3>Search Result</h3>
                    <hr/>
                    <Title>Artist Name</Title>
                    <Accordion defaultActiveKey="1">
                        {ArtistResults.map((item,index)=> (
                            <Card key={index + 1}>
                                <Card.Header>
                                    <ArtistWrapper >
                                        {item.name}
                                        <ShowRelease>
                                            <Accordion.Toggle 
                                                as={Button}
                                                variant="link"
                                                eventKey={index + 1} 
                                                className="show-release-list text-decoration-none"
                                                onClick={() => HandleShowRelease(item.name , index)}
                                            >
                                                {index === currentIndex ? 'Hide releases' : 'Show releases'}
                                            </Accordion.Toggle>
                                        </ShowRelease>
                                    </ArtistWrapper>
                                </Card.Header>
                                <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body className="py-0">
                                        <Release artiste={item.name}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </ResultsWrapper>
            )
        }
        setArtistsList(ArtistList);

    },[
        ArtistResults,
        currentIndex,
        HandleShowRelease
    ]);

    return(
        <div>
            <SearchBar 
                placeholder="Search release for your favourite artiste ..."
                title="Search artist with his release on MusicBrainz"
            />
            {ArtistsList}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ArtistResults : state.ArtistsListMB,
        ReleaseResult : state.ReleaseSearchResult
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchRelease: (artistname) => dispatch(actions.initSearchRelease(artistname)),
        addfavRelease: (release) => dispatch(actions.addfavRelease(release))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(MusicBrainz);