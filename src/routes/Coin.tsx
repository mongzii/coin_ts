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
const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    padding: 10px, 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
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
       setLoading(false);
    })();
  }, [])

    return  (
    <Container>
    <Header>
    <Title>{state ? state : loading}</Title>
    </Header>
    {loading ? (<Loader>Loading...</Loader>
    ) : (
        <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{info?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${info?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Open Source:</span>
                    <span>{info?.open_source ? "Yes" : "No"}</span>
                </OverviewItem>
            </Overview>
            <Description>{info?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Supply:</span>
                    <span>{priceInfo?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Suply:</span>
                    <span>{priceInfo?.max_supply}</span>
                </OverviewItem>
            </Overview>
        </>
    )} 
    </Container>
    );
}
export default Coin;