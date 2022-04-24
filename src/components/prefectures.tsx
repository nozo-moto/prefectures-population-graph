import { Prefecture } from "../utils/type";
import { SetStateAction, Dispatch } from "react";
import "./prefectures.css";

export type PrefTableProps = {
  prefs: Prefecture[];
  handleClick: (code: number, check: boolean) => void;
};

export default function PrefectureTable(props: PrefTableProps) {
  return (
    <div className="table">
      {props.prefs.map((pref) => {
        return (
          <PrefectureItem
            pref={pref}
            handleClick={props.handleClick}
            key={pref.id}
          ></PrefectureItem>
        );
      })}
    </div>
  );
}

export type PrefProps = {
  pref: Prefecture;
  handleClick: (code: number, check: boolean) => void;
};

function PrefectureItem(props: PrefProps) {
  return (
    <div key={props.pref.id}>
      <input
        type="checkbox"
        value={props.pref.name}
        onClick={(event) => {
          // @ts-ignore
          props.handleClick(props.pref.id, event.target.checked);
        }}
      />
      {props.pref.name}
    </div>
  );
}
