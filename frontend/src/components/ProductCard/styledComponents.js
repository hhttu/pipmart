import styled from "styled-components";

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