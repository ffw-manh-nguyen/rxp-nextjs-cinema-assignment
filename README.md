This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Local setup

Rename file `.env.local.example` to `.env`, copy your access token from **The Movie Database (TMDB)** dashboard to `NEXT_PUBLIC_ACCESS_TOKEN` variable.

If you don't have TMDB account, create one at https://www.themoviedb.org/signup

Install and run the development server:

```
npm install
```

then:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Test:
```
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You will be redirected to the login page, please use your account credentials to sign in. In this demo, I set it default to my credentials

## Live preview

- [https://kopm-cinema-nextjs.vercel.app](https://kopm-cinema-nextjs.vercel.app)
