import React , {useCallback, useEffect , useState} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/action/actionCreator';
import { ReleaseWrapper } from './style';

const Release = (props) => {
    const {
        ReleaseResult,
        addfavRelease,
        releaseFav
    } = props

    const [releases , setReleases]=useState('');

    const isOnFavRelease = useCallback((item) => {
       let response = false;
        releaseFav.map(favItem => {
            if(favItem.id === item.id){
                response = true;
            }
            return null;
        })
        return response;
    },[releaseFav])
    
    useEffect(()=> {
        let Releases = '';
        if(ReleaseResult.length > 0){
            Releases = (
               <ReleaseWrapper>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Year</th>
                                <th>Title</th>
                                <th>Release label</th>
                                <th>Number of tracks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ReleaseResult.map((item, index) => (
                                <tr key={index} onClick={() => addfavRelease(item)}>
                                    <td>
                                    {isOnFavRelease(item) ? 
                                         <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 24 24"
                                            fill="#db9618"
                                         >
                                        <path 
                                            d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/>
                                         </svg>
                                    :
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 24 24"
                                            fill="#2261c0"
                                            >
                                            <path 
                                            d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/>
                                        </svg>
                                    }
                                   

                                    </td>
                                    <td>{item.year}</td>
                                    <td>{item.title}</td>
                                    <td>{item.label}</td>
                                    <td>{item.tracks}</td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </ReleaseWrapper>
                
            );
        }
        else{
            Releases = <p>loading...</p>
        }
        setReleases(Releases);

    },[ReleaseResult,addfavRelease,releaseFav, isOnFavRelease])

    return (
        <div>
            {releases}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        ReleaseResult : state.ReleaseSearchResult,
        releaseFav: state.releaseFav
    };
}

const mapDispatchToProps = dispatch => {
    return{
        addfavRelease: (release) => dispatch(actions.addfavRelease(release))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Release);