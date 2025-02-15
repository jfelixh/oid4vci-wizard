import * as vc from "@digitalcredentials/vc";
import { Ed25519VerificationKey2020 } from "@digitalcredentials/ed25519-verification-key-2020";
import { Ed25519Signature2020 } from "@digitalcredentials/ed25519-signature-2020";
import documentLoader from "../lib/documentLoader";
import { Redis } from "ioredis";
import { redirect } from "next/navigation";

var redis: Redis;
try {
  redis = new Redis();
} catch (error) {
  console.error("Failed to connect to Redis:", error);
}

const keyPair = await Ed25519VerificationKey2020.generate();
const suite = new Ed25519Signature2020({ key: keyPair });

export default function Home() {
  async function createCredential(formData: FormData) {
    "use server";

    const payload = JSON.parse(formData.get("payload") as string);

    suite.verificationMethod =
      "did:key:" +
      keyPair.publicKeyMultibase +
      "#" +
      keyPair.publicKeyMultibase;

    payload.issuer = "did:key:" + keyPair.publicKeyMultibase;

    const signedCredential = await vc.issue({
      credential: payload,
      suite,
      documentLoader,
    });

    console.log(signedCredential);

    const uuid = crypto.randomUUID();
    const MAX_AGE = 300; // 300 seconds = 5min
    const EXPIRY_MS = "EX"; // seconds
    redis.set(
      "vc-" + uuid,
      JSON.stringify(signedCredential),
      EXPIRY_MS,
      MAX_AGE,
    );
    redirect("/vci/" + uuid);
  }

  const test_payload = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1",
      {
        EmailCredential: {
          "@context": {
            "@protected": true,
            "@version": 1.1,
            email: "schema:email",
            comment: "schema:Text",
            id: "@id",
            schema: "https://schema.org/",
            type: "@type",
          },
          "@id": "urn:emailcredential",
        },
      },
    ],
    id: "urn:uuid:3978344f-344d-46a2-8556-1e67196186c6",
    type: ["VerifiableCredential", "AlumniCredential", "EmailCredential"],
    credentialSubject: {
      id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
      alumniOf: "Example University",
      email: "test@test.com",
      comment: "I am just a test credential.",
      type: "EmailCredential",
    },
  };

  const btnClasses =
    "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font-mono">
      <div>
        <h1 className="text-6xl">OID4VCI Wizard</h1>
        <p className="text-black">
          A developer tool that allows you to quickly issue some VCs to yourself
          for testing via OID4VCI.
        </p>

        <form
          action={createCredential}
          className="grid grid-cols-1 gap-4 p-9 max-w-xxl mx-auto text-black"
        >
          <label htmlFor="story">
            Verifiable Credential Payload (valid JSON-LD):
          </label>
          <textarea
            id="payload"
            name="payload"
            defaultValue={JSON.stringify(test_payload, null, 2)}
            rows={36}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
          ></textarea>
          <div className="grid grid-cols-1 gap-4 justify-items-center">
            <button type="submit" className={btnClasses}>
              Issue ldp_vc
            </button>
            <button disabled className="text-gray-500">
              Issue jwt_vc_json-ld
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
