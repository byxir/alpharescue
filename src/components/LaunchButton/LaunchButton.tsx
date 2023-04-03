import s from "./LaunchButton.module.css";

const LaunchButton = ({
  children,
  authorized = false,
}: {
  children: React.ReactNode;
  authorized?: boolean;
}) => {
  console.log("authorized -> ", authorized);
  return (
    <div className="h-max w-max rounded-xl bg-black">
      <button
        onClick={() => console.log("button pressed!")}
        disabled={!authorized}
        className={s.button}
      >
        <span className="font-montserratBold">{children}</span>
      </button>
    </div>
  );
};

export default LaunchButton;
