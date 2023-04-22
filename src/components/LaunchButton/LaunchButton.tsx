import s from "./LaunchButton.module.css";

const LaunchButton = ({
  children,
  authorized = false,
  openModal,
}: {
  children: React.ReactNode;
  authorized?: boolean;
  openModal?: () => void;
}) => {
  return (
    <div className="h-max w-max rounded-xl bg-black">
      <button onClick={openModal} className={s.button}>
        <span className="font-montserratBold">{children}</span>
      </button>
    </div>
  );
};

export default LaunchButton;
