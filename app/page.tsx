import vc from "@digitalcredentials/vc";
import { Ed25519VerificationKey2020 } from "@digitalcredentials/ed25519-verification-key-2020";
import { Ed25519Signature2020 } from "@digitalcredentials/ed25519-signature-2020";
import { useState } from "react";

const keyPair = await Ed25519VerificationKey2020.generate();

const suite = new Ed25519Signature2020({ key: keyPair });

export default function Home() {
  async function createCredential(formData: FormData) {
    "use server";

    const rawFormData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };

    // mutate data
    // revalidate cache
  }

  const test_payload = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1",
    ],
    id: "https://example.com/credentials/1872",
    type: ["VerifiableCredential", "AlumniCredential"],
    issuer: "https://example.edu/issuers/565049",
    issuanceDate: "2010-01-01T19:23:24Z",
    credentialSubject: {
      id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
      alumniOf: "Example University",
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-mono">
      <div>
        <h1 className="text-6xl">OID4VCI Wizard</h1>
        <p className="text-black">
          A developer tool that allows you to quickly issue some VC to yourself
          for testing.
        </p>

        <form
          action={createCredential}
          className="grid grid-cols-1 gap-4 p-9 max-w-xxl mx-auto text-black"
        >
          <label htmlFor="story">Verifiable Credential Payload:</label>
          <textarea
            id="payload"
            name="payload"
            defaultValue={JSON.stringify(test_payload, null, 2)}
            className="h-[420px] border"
          ></textarea>
          <button type="submit">Issue ldp_vc</button>
          <button disabled>Issue jwt_vc_json-ld</button>
        </form>
      </div>
    </main>
  );
}
