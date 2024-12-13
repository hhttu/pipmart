import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

export const StyledLinkSpan = styled.span`
    color: ${({ color = '#000' }) => color};
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
    height: 320px;
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
    display: inline-block;
    padding: ${({ padding = '10px 20px' }) => padding};
    width: ${({ width = '100%' }) => width};
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    background-color: #fff;
    text-align: center;
    &:hover {
        border: 2px solid #C14859;
        font-weight: bold;
        color: #C14859;
    }
`

export const StyledButton2 = styled.button`
    background-color: #C14859;
    color: #fff;
    border: none;
    padding: 10px 20px;
    width: ${({ width = '100%' }) => width};
    margin-top: ${({ marginTop = null }) => marginTop};
    &:hover {
        background-color: #A33B49;
    }
    &:disabled {
        background-color: #ccc;
        cursor: default;
    };
`

export const Page = styled.div`
    padding-top: 100px;
`;

export const AccountContent = styled.div`
    width: 700px;
    padding: 25px;
`;

export const StyledChip = styled.div`
    display: inline-block;
    width: 75px;
    padding: 5px 10px;
    border-radius: 16px;
    color: ${(props) => props.color || "#000"};
    background-color: ${(props) => props.backgroundcolor || "#AAAAAA"};
    font-weight: 500;
    text-align: center;
`;

export const PopUpDialog = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

export const BackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

export const StyledSelect = styled.select`
    border: none;
    outline: none;
    flex: 1;
    font-size: 14px;
    color: #333;
    font-family: "Inter", serif;
    &:after {
        padding: 5px;
    }
`;
