import React, { useState , useEffect }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/action/actionCreator';

import { Input , BtnSearch , SearchBarWrapper , Title , Wrapper} from './style';
import search from '../../../assets/search.svg';

const SearchBar = props => {

    const {
        isLastFm,
        onInitLastFmSearch,
        onInitMusicBrainzSearch
    } = props

    const [term , setTerm] = useState('');
    
    const fetchSearch = () => {
        if(term){
            if(props.isLastFm){
                props.onInitLastFmSearch(term);
            }
            else{
                props.onInitMusicBrainzSearch(term);
            }
        }
    }

    useEffect(() => {
        const timeoutTd = setTimeout(() => {
            if(term){
                if(isLastFm){
                    onInitLastFmSearch(term);
                }
                else{
                    onInitMusicBrainzSearch(term);
                }
            }
        },200);
        
        return () => {
            clearTimeout(timeoutTd);
        };
    },[
        term,
        isLastFm,
        onInitLastFmSearch,
        onInitMusicBrainzSearch
    ]);


    return (
        <Wrapper>
            <Title>{props.title}</Title>
            <SearchBarWrapper>
                <Input type="text" placeholder={props.placeholder} value={term} onChange={(e) =>setTerm(e.target.value)}/>
                <BtnSearch onClick={() => fetchSearch()}>
                    <img src={search} alt="search"/>
                </BtnSearch>    
            </SearchBarWrapper>
        </Wrapper>
    )
};

const mapDispatchToProps = dispatch => {
    return{
        onInitLastFmSearch: (term) => dispatch(actions.initSearchLastFm(term)),
        onInitMusicBrainzSearch: (term) => dispatch(actions.initSearchMusicBrainz(term))
    }
}





export default connect(null,mapDispatchToProps)(SearchBar);
