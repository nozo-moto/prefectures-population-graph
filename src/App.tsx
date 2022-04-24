import "./App.css";
import React, { useState, useEffect } from "react";
import { Prefecture, PopulationByYear } from "./utils/type";
import PrefectureTable from "./components/prefectures";
import { fetchPrefectures, fetchPopuration } from "./utils/resas";
import PopulationChart from "./components/population_chart";

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [populationByYear, setPopulationByYear] = useState<PopulationByYear[]>(
    []
  );

  const handleClick = (code: number, check: boolean) => {
    if (check) {
      fetchPopuration(code).then((populations) => {
        setPopulationByYear([
          ...populationByYear,
          {
            pref: prefectures[code - 1],
            data: populations,
          },
        ]);
      });
      return;
    }
    const index = populationByYear.findIndex((e) => e.pref.id === code);
    populationByYear.splice(index, 1);
    setPopulationByYear([...populationByYear]);
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchPrefectures();
      if (result === undefined) {
        return;
      }
      setPrefectures(
        result.map((rel: { prefName: string; prefCode: number }) => {
          return {
            id: rel.prefCode,
            name: rel.prefName,
            selected: false,
          };
        })
      );
    };
    fetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>title</p>
      </header>
      <PrefectureTable prefs={prefectures} handleClick={handleClick} />
      <PopulationChart
        populationByYear={populationByYear}
        prefs={prefectures}
      />
    </div>
  );
}

export default App;
