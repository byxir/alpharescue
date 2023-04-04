import Link from "next/link";
import SidebarLayout from "./SidebarLayout";

export default function NoSubscription({
  service,
  link,
}: {
  service: string;
  link: string;
}) {
  return (
    <SidebarLayout>
      <div className="grid h-screen w-full items-center justify-items-center">
        <div className="font-montserratBold text-almostwhite">
          У вас нет подписки на {service}, вы можете приобрести её{" "}
          <Link className="text-accent underline" href={link}>
            здесь.
          </Link>
        </div>
      </div>
    </SidebarLayout>
  );
}
