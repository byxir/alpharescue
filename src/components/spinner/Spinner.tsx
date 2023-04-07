import s from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={s.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
