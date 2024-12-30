"use client";

import * as QRCode from "qrcode";
import { Suspense, use, useCallback, useEffect, useState } from "react";
import { fetchMembershipToken } from "./fetch-membership-token";

function toQRCodeSvgString(token: string): Promise<string> {
  return QRCode.toString(token, {
    errorCorrectionLevel: "H",
    type: "svg",
  });
}

export const QRCodeView: React.FC<{
  defaultToken: string;
}> = ({ defaultToken }) => {
  const defaultSvgString = toQRCodeSvgString(defaultToken);

  return (
    <Suspense>
      <QRCodeViewInner defaultSvgString={defaultSvgString} />
    </Suspense>
  );
};

const QRCodeViewInner: React.FC<{ defaultSvgString: Promise<string> }> = ({
  defaultSvgString,
}) => {
  const [svgString, setSvgString] = useState(use(defaultSvgString));

  const resetSvgString = useCallback(async () => {
    const token = await fetchMembershipToken();
    const svgString = await toQRCodeSvgString(token);
    setSvgString(svgString);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      resetSvgString();
    }, 1000 * 55);
    return () => clearInterval(timerId);
  }, [resetSvgString]);

  return (
    <img
      className="w-96"
      src={`data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`}
      alt="QRコード"
    />
  );
};
