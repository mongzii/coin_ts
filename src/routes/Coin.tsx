import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { styled } from "styled-components";


interface RouterState {
    state: string;
}
interface IInfoData {
    id:"string";
    name:"string";
    symbol:"string";
    rank:"number";
    is_new:"boolean";
    is_active:"boolean";
    type:"string";
    logo:"string";
    // tags:"object";
    // team:"object";
    description:"string";
    message:"string";
    open_source:"boolean";
    started_at:"string";
    development_status:"string";
    hardware_wallet:"boolean";
    proof_type:"string";
    org_structure:"string";
    hash_algorithm:"string";
    // links:"object";
    // links_extended:"object";
    // whitepaper:"object";
    first_data_at:"string";
    last_data_at:"string";
}

interface IPriceData {
    id:"string"
    name:"string"
    symbol:"string"
    rank: "number"
    circulating_supply:"number"
    total_supply:"number"
    max_supply:"number"
    beta_value:"number"
    first_data_at:"string"
    last_updated:"string"
    quotes:{
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath:number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    }
}

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
    /* const location = useLocation(); */
    /* console.log(location); */
     const {state} =  useLocation() as RouterState; 
    const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();

  useEffect(()=> {
    (async ()=> {
        const response = await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        const infoData = await response.json();
       const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
       ).json();
       console.log(infoData);
       console.log(priceData);
       setInfo(infoData);
       setPriceInfo(priceData);
    })();
  }, [])

    return  (
    <Container>
    <Header>
    <Title>{state}</Title>
    </Header>
    {loading ? (<Loader>Loading...</Loader>) : null} 
    </Container>
    );
}
export default Coin;