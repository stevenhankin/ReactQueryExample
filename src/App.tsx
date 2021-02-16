import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getPricesQO, Time, Bpi } from "./api";
import "./styles.css";

/**
 * Extracting GBP price information
 */
const GbpView = () => {
  const [runQuery, setRunQuery] = useState(false);
  const [bpi, SetBPI] = useState<Bpi>();
  /**
   * Enabled flag will be used to control when the query happens
   * Note: Since the query is shared, it will delay all 3 components
   * that are waiting on the data!
   */
  const btcQuery = useQuery(getPricesQO({ enabled: runQuery }));
  /**
   * Artifically delaying the React Query by 3 seconds
   * to illustrate how to enable/disable the query
   */
  useEffect(() => {
    setTimeout(() => setRunQuery(true), 3000);
  }, []);
  /**
   * Extract price data
   */
  useEffect(() => {
    if (btcQuery.isSuccess) {
      SetBPI(btcQuery.data.bpi);
    }
  }, [btcQuery]);
  return (
    <div className="Gbp">
      <hr />
      <div>Code: {bpi?.GBP.code || "🤔"}</div>
      <div>Description: {bpi?.GBP.description || "🤔"}</div>
      <div>Rate: {bpi?.GBP.rate || "🤔"}</div>
    </div>
  );
};

/**
 * Time info for Spot Price
 */
const TimeView = () => {
  const btcQuery = useQuery(getPricesQO());
  const [time, setTime] = useState<Time>();
  /**
   * Extract time data
   */
  useEffect(() => {
    if (btcQuery.isSuccess) {
      setTime(btcQuery.data.time);
    }
  }, [btcQuery]);
  return (
    <div className="Time">
      <hr />
      <div>{time ? time.updated : "No time data"}</div>
    </div>
  );
};

/**
 * App calls the same React Query in 3 places
 * (here and in the 2 subcomponents)
 * but only 1 REST call is made
 */
const App = () => {
  const btcQuery = useQuery(getPricesQO());

  return (
    <div className="App">
      <h2>Bitcoin Price Index</h2>
      <div>API Status: {btcQuery.status}</div>
      <GbpView />
      <TimeView />
      {btcQuery.isError && (
        <div>Failed to get data: {JSON.stringify(btcQuery.error)}</div>
      )}
    </div>
  );
};

export default App;
