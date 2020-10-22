import styled from 'styled-components';

export const NavigationWrapper = styled.div`
    display : flex;
    flex-direction : row;
    background-color: #000000;
    a:-webkit-any-link {
        color: #ffffff;
        cursor: pointer;
        text-decoration: none;
    }
    a.active {
        background-color: #7a7b8a;
    }
    width: 375px;
    @media screen and (min-width: 800px) {
        width: 1200px;  
        
    }
`;

export const NavigationItem = styled.div`
    width: 112px;
    height: 60px;
    display : flex;
    flex-direction : row;
    text-align: center;
    padding: 20px;
    :hover{
        background-color: #7a7b8a;
    }
    @media screen and (min-width: 800px) {
        width: 140px; 
    }
    
`;

export const Icon = styled.div`
    padding-right: 7px;
`;

