export async function GET(
  _request: Request,
  { params }: { params: { vcid: string } }
) {
  const data = {
    credential_issuer: process.env.NEXT_PUBLIC_URL + "/vci/" + params.vcid,
    credential_endpoint:
      process.env.NEXT_PUBLIC_URL + "/vci/" + params.vcid + "/credential", // TODO: add vc id? or just make it one test vc at a time in the system
    credential_configurations_supported: {
      TestCredential: {
        format: "ldp_vc",
        credential_definition: {
          // just mentioning the standard type for simplicity
          // might need to be dynamically loaded from redis in the future
          // but seems to work for now
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiableCredential"],
        },
      },
    },
  };

  return Response.json(data);
}
