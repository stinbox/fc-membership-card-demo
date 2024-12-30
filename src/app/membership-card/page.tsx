import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { QRCodeView } from "./membership-qrcode";
import { CurrentTime } from "./current-time";
import { generateMembershipToken } from "@/lib/membership-token";

const Page: React.FC = async () => {
  const session = await getSession();

  if (!session.id) {
    redirect("/");
  }

  const token = await generateMembershipToken(session);

  return (
    <div className="grid place-items-center h-dvh p-8">
      <div className="flex flex-col items-center space-y-4">
        <CurrentTime />
        <QRCodeView defaultToken={token} />
      </div>
    </div>
  );
};

export default Page;
