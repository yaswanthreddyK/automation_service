
## Automation Service
An automation service where you can wireup different workflows to perform some actions on platforms like discord, notion, slack, google drive, send emails etc. <br />
It works by listening to webhooks and firing different events.<br />

Technologies used: <br />

NextJS <br />
Clerk - For authentication (signup with google/ signup with github) <br />
NeonDB - For postgres database with prisma wrapper <br />
uploadcare - For file upload <br />
Ngrok - to expose localhost (to work with webhooks) <br />


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
