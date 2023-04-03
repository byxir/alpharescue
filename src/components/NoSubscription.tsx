import Link from "next/link";

export default function NoSubscription({
  service,
  link,
}: {
  service: string;
  link: string;
}) {
  return (
    <div className="grid h-screen w-full items-center justify-items-center">
      <div className="font-montserratBold text-almostwhite">
        У вас нет подписки на {service}, вы можете приобрести ее{" "}
        <Link className="text-accent underline" href={link}>
          здесь.
        </Link>
      </div>
    </div>
  );
}
