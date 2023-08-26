 import { useParams } from "react-router-dom";
 import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
 
interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Chart(){
      const {coinId} = useParams();

     const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return <h1>Chart</h1>
}

export default Chart;