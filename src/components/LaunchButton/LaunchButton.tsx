import s from "./LaunchButton.module.css";

const LaunchButton = ({
  children,
  authorized = false,
  openModal,
  executeScript,
}: {
  children: React.ReactNode;
  authorized?: boolean;
  openModal?: () => void;
  executeScript?: () => void;
}) => {
  return (
    <div className="h-max w-max rounded-xl bg-black">
      <button
        onClick={!executeScript ? openModal : executeScript}
        className={s.button}
      >
        <span className="font-montserratBold">{children}</span>
      </button>
    </div>
  );
};

export default LaunchButton;
