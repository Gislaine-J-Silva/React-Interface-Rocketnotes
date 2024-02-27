import styled from "styled-components";
import backgroundImg from '../../assets/Background.jpg';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-self: stretch;
`;

export const Background = styled.div`
    flex: 1;
    background: url(${backgroundImg}) no-repeat center center;
    background-size: cover;
    
`;

export const Form = styled.form`
    padding: 0 136px;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

text-align: center;

> h1 {
    color: ${({ theme }) => theme.COLORS.ORANGE};
    font-size: 48px;
}

> p {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 14px;
}

> h2 {
    font-size: 24px;
    margin: 48px 0;
}

> a {
    margin-top: 124px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
}
`;