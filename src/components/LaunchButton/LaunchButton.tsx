import s from "./LaunchButton.module.css";

const LaunchButton = () => {
  return (
    <div className="h-max w-max rounded-xl bg-black">
      <button className={s.button}>
        <span className="font-montserratBold">
          <p className="h-12">Запустить</p>
          <p className="h-12">абуз</p>
        </span>
      </button>
    </div>
  );
};

export default LaunchButton;
