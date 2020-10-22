import styled from 'styled-components';

export const FavouritesWrapper = styled.div`
    width: 375px;
    padding-top: 20px;
    @media screen and (min-width: 800px) {
        width: 1200px;  
        
    }
    h3{
        text-align: center;
    }
`;

export const ArtistsWrapper = styled.div`
    table{
        width: 100%;
    }

    th{
        min-width: 100px;
        padding-right: 10px;
    }
    tr{
        border-bottom: 1px solid #c5c5c8;
        cursor: pointer;
    }
`;

export const ReleaseWrapper = styled.div`
    padding-top: 50px;
    table{
        width: 100%;
    }

    th{
        min-width: 100px;
        padding-right: 10px;
    }
    tr{
        border-bottom: 1px solid #c5c5c8;
        cursor: pointer;
    }
    
`;
export const TitleWrapper = styled.div`
    font-weight: 700;
`;
export const EmptyList = styled.p`
   font-style: italic;
   color: grey;
`;