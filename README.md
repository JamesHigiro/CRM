This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Getting Started

## First, env variables

create a .env file in the root directory of the project and add this variable
```bash
NEXT_PUBLIC_MOCKAROO_API=1d336f50
```
## Second, install the dependencies:

```bash
npm install
```

## Third, run the development server:

```bash
npm run dev
```

## NB:

-Mockaroo API on free plan provided 10 records per request only, despite while setting up the schemas i set 200 rows per request, consulted their documentation and nowhere it mentioned however mockaroo AI approved me right that it is because of plan 
-This resulted to pagination of 5 records instead of 10 per page and instead graphing 30 records, graphed 10 records 
