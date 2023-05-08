import s from "./LaunchButton.module.css";

const LaunchButton = ({
  children,
  authorized = false,
  openModal,
  executeScript,
  textSize,
}: {
  children: React.ReactNode;
  authorized?: boolean;
  openModal?: () => void;
  executeScript?: () => void;
  textSize?: string;
}) => {
  return (
    <div className="h-max w-max rounded-xl bg-black">
      <button
        onClick={!executeScript ? openModal : executeScript}
        className={s.button}
      >
        <span
          className={`font-montserratBold text-${textSize ? textSize : ""}`}
        >
          {children}
        </span>
      </button>
    </div>
  );
};

export default LaunchButton;
