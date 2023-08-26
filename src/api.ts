const BASE_URL = `https://api.coinpaprika.com/v1`


export function fetchCoins(){
    return fetch(`${BASE_URL}/coins`)
    .then((res)=> res.json());
}

export function fetchCoinInfo(coinId: string | undefined){
    return fetch(`${BASE_URL}/coins/${coinId}`)
    .then((res)=> res.json());
}

export function fetchCoinTickers(coinId: string | undefined){
    return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then((res)=> res.json());
}

export function fetchCoinHistory(coinId: string | undefined){
    //coinpaprika가 유료되어서 니꼬가 자체 API만든걸로 함.
    //const endDate = Math.floor(Date.now() / 1000);
    //const startDate = endDate - 60*60*24*7*2;
    //return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin`)
    .then((res)=> res.json());
}