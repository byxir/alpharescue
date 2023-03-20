import s from "./LaunchButton.module.css";

const LaunchButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-max w-max rounded-xl bg-black">
      <button className={s.button}>
        <span className="font-montserratBold">{children}</span>
      </button>
    </div>
  );
};

export default LaunchButton;
