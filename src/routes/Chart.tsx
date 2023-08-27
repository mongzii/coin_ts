 import { useParams } from "react-router-dom";
 import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";




 
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
const Container = styled.div`
  
  width: 60%;
  height: 60%;
`;

function Chart(){
      const {coinId} = useParams();
     const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    const isDark = useRecoilValue(isDarkAtom);

     return <Container>{isLoading ? "Loading chart..." : 
    <ApexCharts 
        type="line" 
        series={[
            {
                name: "hello", 
                data: [1, 2, 3, 4, 5, 6],
            },
            {
                name: "price", 
                data: data?.map((price) =>Number(price.close)) as number[],
            },
        ]}
        options={{
            theme:{
                mode: isDark ? "dark" : "light",
            },
            chart: {
            height: 300,
            width: 500,
            toolbar : {
                show: false,
            },
            background: "transparent",
            },
            grid: {
                show: false,
            },
            stroke: {
                curve: "smooth",
                width: 5,
            },
            yaxis: {
                show: false,
            },
            xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels:{ show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close)
            },
            fill: { type: "gradient", gradient:{gradientToColors:["#0be881"], stops: [0, 100]} },
            colors: ["red"],
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`
                },
            },
}} />}</Container>
}

export default Chart;