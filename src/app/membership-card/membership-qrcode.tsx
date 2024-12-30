"use client";

import * as QRCode from "qrcode";
import { Suspense, use, useCallback, useEffect, useState } from "react";
import { fetchMembershipToken } from "./fetch-membership-token";

export const QRCodeView: React.FC<{
  defaultToken: string;
}> = ({ defaultToken }) => {
  const defaultDataURLPromise = QRCode.toDataURL(defaultToken, {
    errorCorrectionLevel: "H",
    scale: 8,
  });

  return (
    <Suspense>
      <QRCodeViewInner defaultDataURLPromise={defaultDataURLPromise} />
    </Suspense>
  );
};

const QRCodeViewInner: React.FC<{ defaultDataURLPromise: Promise<string> }> = ({
  defaultDataURLPromise,
}) => {
  const [dataURL, setDataURL] = useState(use(defaultDataURLPromise));

  const resetDataURL = useCallback(async () => {
    const token = await fetchMembershipToken();
    const dataURL = await QRCode.toDataURL(token, {
      errorCorrectionLevel: "M",
      scale: 8,
    });
    setDataURL(dataURL);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      resetDataURL();
    }, 1000 * 55);
    return () => clearInterval(timerId);
  }, [resetDataURL]);

  return <img src={dataURL} alt="QRコード" />;
};
