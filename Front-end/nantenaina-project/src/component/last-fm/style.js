import styled from 'styled-components';

export const ArtistsResultWrapper = styled.div`
    h1 {
        margin: 40px 0 0 0;
    }

    padding: 30px;
`;
export const BtnWrapper = styled.div`
    width: 100%;
    align-item: flex-end;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

export const ShortListBtn = styled.span`
    border: solid 1px grey;
    color: grey;
    padding: 10px;
    cursor: pointer;
    :hover{
        background-color: blue;
        color: white;
    }
`;

export const ResultsWrapper = styled.div`

`;

export const ResultItem = styled.div`
    display: flex;
    border-top: solid 1px grey;
    align-items: center;
    padding: 4px 5px;
    cursor: pointer;
    
`;
export const ArtisteDetail = styled.a`

`;
export const Title = styled.div`
    font-weight: 600;
    padding-left: 70px;
    padding-bottom: 20px;
`;

export const Picture = styled.div`
    
`;

export const ArtistName = styled.div`
    padding-left: 50px;
    width: 100%;
    a {
        text-decoration: none;
        color: #3c8cef;
    }
    
`;

export const Icon = styled.div`
    cursor: pointer;
    width: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    &clicked{
        cursor: not-allowed;
    }
`;
