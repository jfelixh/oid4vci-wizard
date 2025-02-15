import { Redis } from "ioredis";

var redis: Redis;
try {
  redis = new Redis();
} catch (error) {
  console.error("Failed to connect to Redis:", error);
}

export async function GET(
  _request: Request,
  { params }: { params: { vcid: string } },
) {
  const vc = await redis.get("vc-" + params.vcid);

  if (!vc || vc === undefined) {
    return Response.json({ error: "No prepared VC found" }, { status: 404 });
  }

  const data = {
    issuer: process.env.NEXT_PUBLIC_URL + "/vci/" + params.vcid,
    token_endpoint:
      process.env.NEXT_PUBLIC_URL + "/vci/" + params.vcid + "/token",
    response_types_supported: ["vp_token", "id_token"],
    grant_types_supported: [
      "urn:ietf:params:oauth:grant-type:pre-authorized_code",
    ],
  };

  return Response.json(data);
}
