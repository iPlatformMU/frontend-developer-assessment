import React , { useEffect , useState , useMemo, useCallback } from 'react';
import { connect } from 'react-redux';

import SearchBar from '../UI/search-bar/index';
import * as actions from '../../store/action/actionCreator';
import Modal from '../UI/modal/index';
import { 
    ArtistsResultWrapper,
    ShortListBtn,
    BtnWrapper,
    ResultsWrapper,
    ResultItem,
    Title,
    Picture,
    ArtistName,
    Icon
} from './style';
import iconAdd from '../../assets/add.svg';
import check from '../../assets/check.svg';



const LastFm = props => {
    const [ Artists , setArtists] = useState('');
    const [ showModal , setShowModal] = useState(false);
    const [ shortList , setShortList] = useState([]);
    const [ currentIndex , setCurrentIndex] = useState(-1);
    const {
        results,
        addFavArtisteInit,
        artistsFav
    } = props;
    

    const addShortlist = (item , index) => {
       setShortList(shortList => [...shortList,item]);
       setCurrentIndex(index);
    };
    const isOnshortList = useCallback((item) => {
        let response = false;
        shortList.map((itemshort) => {
           if(itemshort.mbid === item.mbid){
                response = true;
            }
            return null;
        })
        return response;
    },[shortList]);

    const isOnFavorite = useCallback ((item) => {
        let response = false;
        artistsFav.map(favItem => {
            if(favItem.mbid === item.mbid){
                response = true;
            }
            return null;
        })
        return response;
    },[artistsFav]);

    useEffect(() => {
        let Artists = '';
        
        if(results && results.length > 0){
           Artists = (
            <>  
                <h3>Search Result</h3>
                <hr/>
                <BtnWrapper>
                    <ShortListBtn onClick={() => setShowModal(true)}>
                        Show short-list
                    </ShortListBtn>
                </BtnWrapper> 
                <ResultsWrapper>
                <Title> Artiste Name</Title>
                {results.map((item,index )=> {
                   
                    return (
                        <ResultItem key={`${index} ${item.mbid}`}>
                            <Picture>
                                <img src={item.image} alt="artist-pic"/>
                            </Picture>
                            <ArtistName>
                               <a href={item.url}> {item.name} </a> 
                            </ArtistName>
                            {isOnshortList(item) ? 
                            <Icon className="clicked">
                                <img src={check} alt="add-icon-check" />
                            </Icon>
                            : <Icon onClick={() => addShortlist(item , index)}>
                                <img src={iconAdd} alt="add-icon" />
                            </Icon>
                            }
                        </ResultItem>
                    );
                })
                }
            </ResultsWrapper>
            </>
            )
        }
        setArtists(Artists);
    },[results,addFavArtisteInit,currentIndex,isOnshortList]);

    const shortModal = useMemo(() => {
        let myshort = '';
        if(shortList.length > 0){
            myshort = shortList.map((item , index) => 
                <ResultItem key={`${index} ${item.mbid}`}>
                    <Picture>
                        <img src={item.image} alt="artist-pic"/>
                    </Picture>
                    <ArtistName>
                    <a href={item.url}> {item.name} </a> 
                    </ArtistName>
                    {isOnFavorite(item) ? 
                        <Icon onClick={() => addFavArtisteInit(item)}>
                            <img src={check} alt="add-icon" />
                        </Icon>
                    :
                        <Icon onClick={() => addFavArtisteInit(item)}>
                            <img src={iconAdd} alt="add-icon" />
                        </Icon>
                    }
                    
                    
                </ResultItem>
            );
        }
        else{
            myshort = <p>Empty list...</p>
        }
        return myshort;
    },[shortList,addFavArtisteInit,isOnFavorite]);

    
    return (
        <>
            <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <h4>My Short list.</h4>
                {shortModal}
            </Modal> 
            <SearchBar  
                placeholder="Type here your favourite artiste..."
                title="Search Artist on Last.fm"
                isLastFm
            />
            <ArtistsResultWrapper>
                {Artists}
            </ArtistsResultWrapper>
            
        </>
    )
};

const mapStateToProps = state => {
    return {
        results : state.resultsLastFm,
        artistsFav : state.artistsFav
    };
}

const mapDispatchToProps = dispatch => {
    return{
        addFavArtisteInit: (artistname) => dispatch(actions.addFavArtisteInit(artistname))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LastFm);