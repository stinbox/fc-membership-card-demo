import NextLink from "next/link";
import { Link } from "@nextui-org/link";

export default function Home() {
  return (
    <div className="p-8 grid place-items-center h-dvh">
      <div className="flex flex-col items-center space-y-4">
        <Link isBlock showAnchorIcon as={NextLink} href="/membership-card">
          会員証を表示
        </Link>
        <Link isBlock showAnchorIcon as={NextLink} href="/userinfo">
          会員情報入力
        </Link>
        <Link isBlock showAnchorIcon as={NextLink} href="/qr-reader">
          QRコードリーダー
        </Link>
      </div>
    </div>
  );
}
