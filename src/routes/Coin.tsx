import { useState } from "react";
import { useParams } from "react-router";
import { styled } from "styled-components";


const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
font-size: 48px;
    color: ${props => props.theme.accentColor}
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;
// react-router-dom v6부터 제네릭을 지원하지 않아서 interface이름으로 넣으면 오류가 난다....
/* interface RouteParams {
    coinId: string;
} */

function Coin(){
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<{coinId: string}>();

    return  (
    <Container>
    <Header>
    <Title>코인 {coinId}</Title>
    </Header>
    {loading ? (<Loader>Loading...</Loader>) : null} 
    </Container>
    );
}
export default Coin;