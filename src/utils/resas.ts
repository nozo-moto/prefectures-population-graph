import axios from "axios";
import { PopulationData } from "./type";

const PREFECTURES_API_URL =
  "https://opendata.resas-portal.go.jp/api/v1/prefectures";
const POURATION_API_URL =
  "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear";

export async function fetchPrefectures() {
  const result = await axios(PREFECTURES_API_URL, {
    headers: {
      "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY!,
    },
  });
  return result.data.result;
}

export async function fetchPopuration(
  prefCode: number
): Promise<PopulationData[]> {
  const result = await axios(POURATION_API_URL, {
    headers: {
      "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY!,
    },
    params: {
      cityCode: "-",
      prefCode: prefCode,
    },
  });
  return result.data.result.data[0].data;
}
