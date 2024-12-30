"use client";

import {
  MembershipTokenResult,
  verifyMembershipToken,
} from "@/lib/membership-token";
import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

export const QrReaderPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [verifiedResult, setVerifiedResult] =
    useState<MembershipTokenResult | null>(null);

  useEffect(() => {
    if (token) {
      verifyMembershipToken(token).then((result) => setVerifiedResult(result));
    }
  }, [token]);

  return (
    <div>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (result) {
            const text = result.getText();
            setToken(text);
          }
        }}
        videoId="qr-reader"
      />
      {verifiedResult && (
        <div>
          {verifiedResult.success ? (
            <>
              <p>会員番号: {verifiedResult.data.id}</p>
              <p>氏名: {verifiedResult.data.name}</p>
              <p>有効期限: {verifiedResult.data.membershipExpiry}</p>
            </>
          ) : (
            <p className="text-danger-500">無効なQRコードです!!!!!!!!!!</p>
          )}
        </div>
      )}
    </div>
  );
};
