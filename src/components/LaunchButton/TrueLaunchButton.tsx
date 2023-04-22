import { useSession } from "next-auth/react";
import s from "./LaunchButton.module.css";

const TrueLaunchButton = ({
  children,
  executeScript,
}: {
  children: React.ReactNode;
  executeScript: () => void;
}) => {
  const { data, status } = useSession();
  return (
    <div className="h-max w-max rounded-xl bg-black">
      <button
        onClick={executeScript}
        disabled={status != "authenticated" || !data.user.raffleBotUser}
        className={s.button}
      >
        <span className="font-montserratBold">{children}</span>
      </button>
    </div>
  );
};

export default TrueLaunchButton;
