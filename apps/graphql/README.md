```
cd graphql-server
cp env.example .env
npm install
npm run migrate
npm run seed
npm run generate
redis-server
npm run dev
```

For Auth Token Sample
```
{
  "Authorization": "Bearer 123456"
}
```
