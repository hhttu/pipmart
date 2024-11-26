import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

export const StyledLinkSpan = styled.span`
    color: ${props => (props.color ? props.color : '#000')};
    cursor: pointer;
    &:hover {
        color: #C14859;
    }
`;

export const StyledSearchIcon = styled(IoSearch)`
    &:hover {
        color: #C14859;
    }
`;

export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding-bottom: 15px;
    width: 250px;
    text-align: center;
    background-color: #FFF;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.1);
        transform: scale(1.02);
    }
`;

export const StyledLink = styled.a`
    margin-left: 10px;
    display: flex;
    padding: 5px 20px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    &:hover {
        border: 1px solid #000;
    }
`

export const StyledButton = styled.button`
    display: flex;
    padding: 10px 20px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background-color: #fff;
    &:hover {
        border: 1px solid #C14859;
        color: #C14859;
    }
`

export const Page = styled.div`
    padding-top: 100px;
`;

export const AccountContent = styled.div`
    width: 600px;
    padding: 25px;
`;
