---
title: "Building a Browser Terminal for Docker"
description: "Learn how to build an interactive terminal experience using Docker, Node.js, and Socket.IO to create a virtual playground within a container."
pubDate: 2024-06-15
author: "Akshay Gore"
tags: ["docker", "node.js", "terminal", "socket.io"]
image:
  url: "https://pub-787f86ca67424ee9bb7d256ad6da8565.r2.dev/docker.webp"
  alt: "A screenshot of the browser terminal interface for Docker"
---

I've been diving into Docker and exploring ways to create interactive terminal experiences. I experimented by combining Docker and Node.js to build a virtual playground within a container. This playground provides a terminal interface where you can access files and experiment with the container's environment. It's essentially a sandbox for practicing commands and interacting directly with the container's system.

So here is Step By Step Guide To Build this :

1. First [Download](https://www.docker.com/products/docker-desktop/) Docker Desktop
2. Now let's set the Project By Running Some Commands and install dependencies

   ```bash
   npm init - y
   npm install express node-pty socket.io
   ```

3. Now Let's Create an Express Server with Socket Io

   ```javascript
   const express = require('express');
   const { createServer } = require('node:http');
   const { Server } = require('socket.io');


   const app = express();
   const server = createServer(app);
   const io = new Server(server);

   app.get('/', (req, res) => {
   	res.sendFile(join(__dirname, 'index.html'));
   });

   io.on('connection', (socket) => {
   	console.log('User Connected');
       socket.on('disconnect', () => {
   		console.log('User disconnected');
   	});
   }

   server.listen(3000, () => {
   	console.log('Server running at http://localhost:3000');
   });
   ```

   This is Simple Express Server Which is serving the index.html fileand creating socket io connection.

4. Now lets add node-pty Config

   ```javascript
   const express = require("express");
   const { createServer } = require("node:http");
   const { join } = require("node:path");
   const { Server } = require("socket.io");
   const { spawn } = require("node-pty");

   const app = express();
   const server = createServer(app);
   const io = new Server(server);

   app.get("/", (req, res) => {
     res.sendFile(join(__dirname, "index.html"));
   });

   io.on("connection", (socket) => {
     console.log("User Connected");

     // Terminal Code
     const ptyProcess = spawn("bash", [], {
       name: "xterm-color",
       cwd: "./user",
     });

     socket.on("command", (data) => {
       ptyProcess.write(data);
     });

     socket.on("disconnect", () => {
       console.log("User disconnected");
     });

     ptyProcess.onData((data) => {
       socket.emit("data", data);
     });
   });

   server.listen(3000, () => {
     console.log("Server running at http://localhost:3000");
   });
   ```

   Lets Briefly Explain this code

   - `const ptyProcess = spawn('bash', [], {...});` starts a new pseudo-terminal (pty) process running the `bash` shell.
   - `name: 'xterm-color'` sets the terminal type to 'xterm-color', which supports color output.
   - `cwd: './user'` sets the current working directory for the terminal to './user'.
   - `socket.on('command', (data) => {...});` listens for 'command' events from the client. When such an event is received, it runs the provided command in the pseudo-terminal.

`ptyProcess.write(data);` writes the command data to the pseudo-terminal, simulating user input.

Now Let's Create HTML and Connection with socket

```xml
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>My First Terminal</title>
		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/xterm@4.19.0/css/xterm.css"
		/>
		<script src="https://cdn.jsdelivr.net/npm/xterm@4.19.0/lib/xterm.js"></script>
		<script src="/socket.io/socket.io.js"></script>
		<style>
			body,
			html {
				height: 100%;
				margin: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background-size: cover;
				background-repeat: no-repeat;
				font-family: monospace;
				background-color: black;
			}

			.header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				padding: 10px;
				color: #ddd;
			}

			.logo {
				width: 50px;
				height: 50px;
			}

			#terminal {
				width: 80%;
				height: 60vh;
				padding: 20px;
				border-radius: 5px;
				background-color: #000;
				color: #fff;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			}
		</style>
	</head>
	<body>
		<header class="header">
			<h1>Interactive Terminal</h1>
			<img
				src="https://cdn-ilaeled.nitrocdn.com/xjlTIzzcFlDZkNcCPnCAGIxXrnjmbkuM/assets/images/optimized/wp-content/uploads/2023/08/74a2bbcc859d0fd6dabdcfb7c8f86450.logo-dont-stretch.svg"
				alt="Logo"
				class="logo"
			/>
		</header>
		<div id="terminal" class="terminal-container"></div>
		<script>
			document.addEventListener('DOMContentLoaded', () => {
				const socket = io(); // Connect to the Socket.IO server
				const terminalContainer = document.getElementById('terminal');
				const term = new Terminal({
					cursorBlink: true,
				});

				term.open(terminalContainer);

				socket.on('data', (data) => {
					term.write(data);
				});

				term.onKey((e) => {
					socket.emit('command', e.key);
				});

				window.addEventListener('beforeunload', () => {
					socket.disconnect();
					term.dispose();
				});
			});
		</script>
	</body>
</html>
```

- [**Socket.IO**](http://Socket.IO): Establishes a connection to the [Socket.IO](http://Socket.IO) server.
- **Terminal**: Creates and configures a new Xterm.js terminal instance with a blinking cursor.
- **Open Terminal**: Attaches the terminal to the `terminal` div.
- **Data Event**: Listens for 'data' events from the server and writes the received data to the terminal.
- **Key Event**: Listens for key events in the terminal and sends the key data to the server as a 'command' event.
- **Before Unload Event**: Disconnects the [Socket.IO](http://Socket.IO) connection and disposes of the terminal instance when the page is closed or refreshed.

Now the Code is Setup Done. Lets Create Dockerfile

```dockerfile
FROM ubuntu:focal

# Install curl and other necessary packages
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js LTS version
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install other necessary packages for building Node.js modules
RUN apt-get update && \
    apt-get install -y g++ make python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expose the port your application is listening on
EXPOSE 8080

# Set the working directory
WORKDIR /home/app

# Copy the necessary files
COPY . /home/app
COPY package.json .
COPY user /home/app/user

# Install dependencies
RUN npm install

# Specify the command to run the application
CMD [ "node", "index.js" ]
```

This Dockerfile builds an image based on Ubuntu Focal, installs `curl`, Node.js LTS, and necessary build tools (`g++`, `make`, `python3-pip`). It sets the working directory to `/home/app`, copies the application files and `package.json` to the container, installs Node.js dependencies, exposes port 8080, and specifies `node index.js` as the entry point for running the application.

To Build this Dockerfile you have to run docker desktop app which will run docker demon. then go to the folder and run the following command

```bash
docker build -t terminal .
```

Let's Run The Docker File with port forwarding

```bash
docker run -p 3000:3000 terminal
```

And Your Terminal is Ready just go to localhost:3000

This interactive terminal can be seamlessly integrated into your cloud IDE or used within an isolated environment. For the complete code and further details, visit [https://github.com/Akshaygore1/docker-term](https://github.com/Akshaygore1/docker-term).

Thank you for tuning in!
