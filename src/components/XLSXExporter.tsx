import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useSession } from "next-auth/react";
import { type IAccount } from "~/pages/rafflebot/settings";

interface IXLSXExporter {
  discordId?: string;
  sessionToken?: string;
  accounts: IAccount[] | undefined;
}

const XLSXExporter: React.FC<IXLSXExporter> = ({
  discordId,
  sessionToken,
  accounts,
}) => {
  const { data, status } = useSession();

  const downloadExcel = () => {
    if (accounts) {
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const ws = XLSX.utils.json_to_sheet(accounts);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      saveAs(data, "accounts.xlsx");
    }
  };

  const executeDownload = () => {
    if (sessionToken && discordId && data?.user.id) {
      downloadExcel();
    }
    console.log(sessionToken, discordId, data?.user.id, accounts);
  };

  return (
    <button
      className={`col-span-2 grid h-32 items-center justify-items-center rounded-xl bg-element p-4 text-2xl text-almostwhite transition-colors ${
        data?.user.raffleBotUser && status === "authenticated"
          ? "cursor-pointer hover:bg-opacity-60"
          : "cursor-not-allowed"
      }`}
      onClick={executeDownload}
      disabled={
        !accounts ||
        !data?.user.raffleBotUser ||
        status !== "authenticated" ||
        !sessionToken ||
        !discordId
      }
    >
      Выгрузить аккаунты
    </button>
  );
};

export default XLSXExporter;
