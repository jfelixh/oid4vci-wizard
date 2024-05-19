import { Redis } from "ioredis";

var redis: Redis;
try {
  redis = new Redis();
} catch (error) {
  console.error("Failed to connect to Redis:", error);
}

export async function POST(
  _request: Request,
  { params }: { params: { vcid: string } }
) {
  const vc = await redis.get("vc-" + params.vcid);

  const data = {
    credential: vc,
  };

  return Response.json(data);
}
