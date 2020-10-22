import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-top: 20px;
`;

export const SearchBarWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 50px;
`;

export const Input = styled.input`
    width: 300px;
    border: solid 2px #999a9e;
    padding-left: 10px;
    @media screen and (min-width: 800px) {
        width: 1000px;  
        height: 30px;
    }
`;

export const BtnSearch = styled.div`
    width: 30px;
    height: 32px;
    cursor: pointer;
    border: solid 2px #999a9e;
    img{
        padding-left: 3px;
        padding-top: 2px;
    }
    margin-left: 1px;
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 30px
`;