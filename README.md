# OID4VCI Wizard

> [!WARNING]
> This repository is intended as tool for developers and testers. It is not suitable for production scenarios.

> [!NOTE]
> This software currently supports [OpenID for Verifiable Credential Issuance - draft 13](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html) and issues JSON-LD VCs (ldp_vc).

This project provides a simple all-in-one setup that starts a web UI to issue Verifiable Credentials (VCs) with customizable content via the OID4VCI protocol. This is useful if you need specific VCs for testing or demonstrations that are not issued yet or would be hard to obtain from a production system. It might also be helpful in developing and validating new credential types and contexts.

## Prerequisites

You need:

- NodeJS
- npm
- docker
- ngrok (or equivalent tool)

If you want to issue to a wallet, you need one that supports the used protocols and standards (see top of README). One possible option is [Altme](https://altme.io/).

## Getting Started

Open a tunnel to ensure your wallet can connect to your local setup:

```bash
ngrok http 3000
```

Create `.env` and populate it with your ngrok URL:

```env
NEXT_PUBLIC_URL=<your ngrok URL>
```

If you just cloned the project, remember to install dependencies:

```bash
npm i
```

Make sure docker is running, then use the included `compose.yaml` to quickly start a Redis:

```bash
docker compose up
```

Finally, start the NextJS website:

```bash
npm run dev
```

(You could also build and start.)

## Comments

If you are also testing with Altme, make sure to swith to a profile running on OID4VCI Draft 13, as the default is still Draft 11. That should allow you to get new credentials using this tool. For unknown reasons, the credentials may only appear after switching back to the default profile.
