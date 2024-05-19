export async function POST() {
  // since this is a testing and development tool, we ignore the auth code
  const data = {
    access_token: "testtoken",
    token_type: "bearer",
    expires_in: 3600,
  };

  return Response.json(data);
}
