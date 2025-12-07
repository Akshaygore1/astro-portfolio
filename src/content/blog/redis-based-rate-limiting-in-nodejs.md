---
title: "Redis‑Based Rate Limiting in Node.js (Express + TypeScript)"
description: "Step‑by‑step guide to adding Redis‑powered rate‑limiting middleware to a Node.js Express API written in TypeScript."
pubDate: 2024-06-15
author: "Akshay Gore"
tags: ["node.js", "typescript", "express", "redis", "rate-limiting", "api"]
image:
  url: "https://pub-787f86ca67424ee9bb7d256ad6da8565.r2.dev/rate-limit.webp"
  alt: "A screenshot Redis‑Based Rate Limiting in Node.js"
---

It's critical to implement rate limitation to reduce server stress caused by frequent API calls. We'll explore using rate limiting for a mock API using Redis in this blog article.

we have to set up an express server and add a simple API

```typescript
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

// Route handler
app.get("/", async (req: Request, res: Response) => {
  try {
    function generateDummyData(count: number) {
      const dummyData = [];
      for (let i = 0; i < count; i++) {
        dummyData.push({
          id: i + 1,
          name: `Dummy ${i + 1}`,
        });
      }
      return dummyData;
    }

    const dummyData = generateDummyData(999990);
    res.send(dummyData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
```

and a simple react app to fetch API

```typescript
import React, { useEffect, useState } from "react";
import "./App.css";

function App(): JSX.Element {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("To Many Requests");
    }
  };

  return (
    <div>
      <button onClick={() => fetchData()} style={{ padding: "10px" }}>
        FETCH DATA
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
```

![Demo of unrestricted API access](https://cdn.hashnode.com/res/hashnode/image/upload/v1710693367834/3e7db518-c5a9-4638-8f3c-3d8f40144384.gif)

The issue with this configuration is that users have unrestricted access to the API, which could result in server overload and performance problems. Unrestricted access has the potential to severely affect the user experience overall by increasing server burden and lowering system performance. It is imperative to use rate restriction in order to solve this problem and preserve server stability. Rate limiting helps stop abuse and inappropriate use of server resources by placing limits on the number of requests a user may make in a given amount of time.

We're employing a local Redis instance to implement this functionality within our application, utilizing the "ioRedis package" for this purpose.

```typescript
import { Redis } from "ioredis";

// Redis client
const redisClient = new Redis({
  host: "127.0.0.1",
  port: 6379,
  // Add any other configuration options as needed
});
```

Now we are going to add middleware to the server

```typescript
// Rate limiting middleware
const rateLimitMiddleware = async (req: Request, res: Response, next: any) => {
  const clientIP = req.ip;
  const key = `ratelimit:${clientIP}`;
  const expiration = 1 * 60; // custom expire time
  const maxRequests = 5; // Maximum number of requests allowed in the window
  const windowStart = Math.floor(Date.now() / 1000) - expiration;

  try {
    // Retrieve current request count from Redis
    console.log(key);
    const count = await redisClient.zcount(key, windowStart, "+inf");

    // If request count exceeds the limit, respond with 429 Too Many Requests
    if (count >= maxRequests) {
      res.status(429).send("Too Many Requests");
      return;
    }

    // Increment request count and set expiration time
    await redisClient.zadd(key, Date.now(), Date.now()); // corrected zadd parameters
    await redisClient.expire(key, expiration);

    next();
  } catch (error) {
    console.error("Redis Error:", error);
    next();
  }
};

// Apply rate limiting middleware to all routes
app.use(rateLimitMiddleware);
```

Here's a simplified explanation of the Redis methods used in the code, along with an overview of the rate-limiting middleware:

1. **ZCOUNT**: This Redis method is used to count the number of elements within a sorted set that fall within a specified score range. In our case, it counts the number of requests stored in a sorted set (`zset`) with scores greater than or equal to the start of our rate limit window (`windowStart`) and less than positive infinity (`+inf`).
2. **ZADD**: The `ZADD` method is utilized to add one or more members to a sorted set or update the score for existing members. Here, we're employing it to increment the request count stored in the Redis sorted set. The current time is set as the score, and the same timestamp is used as the member value.
3. **EXPIRE**: This Redis method sets an expiration time (in seconds) for a specified key. In our implementation, we're using it to establish an expiration time for the key used in rate limiting (`key`). This ensures that the rate limit data stored in Redis expires after a specified period, preventing it from accumulating indefinitely.

**Rate Limiting Middleware Overview**:

- The rate-limiting middleware is an asynchronous function (`rateLimitMiddleware`) that intercepts incoming requests in an Express application.
- It extracts the client's IP address from the request and constructs a unique key for rate limiting.
- Custom parameters such as expiration time (`expiration`) and maximum allowed requests (`maxRequests`) are defined for rate limiting.
- The current request count is retrieved from Redis using `ZCOUNT`.
- If the request count exceeds the maximum allowed requests, a `429 Too Many Requests` status code is sent back to the client, indicating that they've exceeded the rate limit.
- If the request count is within the limit, it's incremented in the Redis sorted set using `ZADD`, and an expiration time is set for the key using `EXPIRE`.
- Error handling is included to catch any Redis-related errors that may occur during the rate-limiting process.
- The rate-limiting middleware is applied to all routes in the Express application using `app.use(rateLimitMiddleware)`.

This approach effectively ensures that users are limited in the number of requests they can make within a specified timeframe, helping to prevent server overload and maintain system stability.

Here is the Result :

![Rate limiting in action](https://cdn.hashnode.com/res/hashnode/image/upload/v1710696006722/2e830b19-31e9-4320-bf76-72fcb1f63938.gif)

In summary, implementing rate limiting with Redis in an Express application offers a customizable solution to manage API usage and prevent server overload. By adjusting parameters like rate limits and expiration times, developers can tailor the system to their needs, ensuring fair access to resources while maintaining server stability. Leveraging Redis's speed and reliability, this integration enables the creation of resilient applications capable of handling varying workloads, enhancing overall performance and user experience.
