import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState, useEffect } from "react";
import { Prefecture, PopulationByYear } from "../utils/type";
import { fetchPopuration } from "../utils/resas";

export type PopulationChartProps = {
  populationByYear: PopulationByYear[];
  prefs: Prefecture[];
};

const tmpOptions: Highcharts.Options = {
  title: {
    text: "総人口数",
  },
  xAxis: {
    title: {
      text: "年度",
    },
  },
  yAxis: {
    title: {
      text: "人口数",
    },
  },
  credits: {
    enabled: false,
  },
};

export default function PopulationChart(props: PopulationChartProps) {
  let [options, setOptions] = useState<Highcharts.Options>(tmpOptions);
  useEffect(() => {
    if (props.populationByYear.length < 1) {
      options.series = []
      setOptions(Object.assign({},options));
      return;
    }
    // @ts-ignore
    options.xAxis.categories = props.populationByYear[0].data.map(
      (d) => d.year
    );
    // @ts-ignore
    options.series = props.populationByYear.map((pby) => {
      return {
        name: pby.pref.name,
        data: pby.data.map((d) => d.value),
      };
    });
    setOptions(Object.assign({},options));
  }, [props.populationByYear]);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
