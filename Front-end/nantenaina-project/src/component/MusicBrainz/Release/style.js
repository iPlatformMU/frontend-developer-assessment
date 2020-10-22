import styled from 'styled-components';

export const ReleaseWrapper = styled.div`
    table{
        width: 100%!important;
    }

    th{
        min-width: 100px;
        padding-right: 10px;
    }
    tr{
        border-bottom: 1px solid #c5c5c8;
        cursor: pointer;
        :hover{
            svg{
                fill: #db9618;
            }
            
        } 
    }
    
    svg{
        width: 30px;
        height: 22px;

    }
    

`;