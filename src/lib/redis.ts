import Redis from "ioredis";

const redisClient = new Redis(
  process.env.REDIS_URL ?? "redis://localhost:6379",
  { maxRetriesPerRequest: null },
);
console.log("Connected to Redis");

export default redisClient;
