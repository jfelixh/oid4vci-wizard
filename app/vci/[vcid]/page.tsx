"use client";
import { useQRCode } from "next-qrcode";

export default function Issuance({ params }: { params: { vcid: string } }) {
  const { Canvas } = useQRCode();

  const getWalletUrl = () => {
    const credentialOffer = {
      credential_issuer: process.env.NEXT_PUBLIC_URL + "/vci/" + params.vcid,
      credential_configuration_ids: ["TestCredential"],
      grants: {
        "urn:ietf:params:oauth:grant-type:pre-authorized_code": {
          "pre-authorized_code": "oaKazRN8I0IbtZ0C7JuMn5",
        },
      },
    };

    return (
      "openid-credential-offer://?credential_offer=" +
      encodeURIComponent(JSON.stringify(credentialOffer))
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-mono">
      <div>
        <h1 className="text-6xl">OID4VCI Wizard</h1>
        <p className="text-black">Scan the code to download your credential.</p>
        <div className="w-full flex align-center justify-center pt-10">
          <Canvas
            text={getWalletUrl()}
            options={{
              errorCorrectionLevel: "M",
              margin: 3,
              scale: 4,
              width: 300,
              color: {
                dark: "#000000FF",
                light: "#FFFFFFFF",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
