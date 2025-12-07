---
title: "Creating a Node.js CLI and Publishing It"
description: "Step-by-step guide to building a Command Line Interface (CLI) application in Node.js using chalk and figlet, and publishing it to npm."
pubDate: 2024-06-15
author: "Akshay Gore"
tags: ["node.js", "cli", "npm", "chalk", "figlet"]
image:
  url: "https://cdn.hashnode.com/res/hashnode/image/upload/v1709369073702/4640e0e5-4c4c-42e8-86a4-0e40dc272eff.png"
  alt: "A screenshot of Creating a Node.js CLI and Publishing It"
---

Would you like to create a CLI (Command Line Interface) application with your friends? Follow these steps to get started:

![cli](https://cdn.hashnode.com/res/hashnode/image/upload/v1709320719349/ec32c450-765f-4c1c-9094-ec788d4bc584.png)

1. Create a new directory for your CLI app :

   ```typescript
   mkdir cli-app
   cd cli-app
   npm init
   ```

2. Install the necessary packages for beautiful text and colors:

   ```typescript
   npm install chalk chalk-animation figlet
   ```

3. Create a new file named `index.js`  
   `touch index.js`
4. Add the following line at the top of the `index.js` file:  
   The line `#!/usr/bin/env node` at the beginning of a JavaScript file is called a shebang line. It instructs the system to use the Node.js interpreter to run the script.

   ```typescript
   #!/usr/bin/env node
   ```

5. Create an Immediately Invoked Function Expression (IIFE) to begin the script. Let's start by using Figlet:

   ```typescript
   (async () => {
     await figlet.text(
       "Hey There",
       {
         font: "Standard",
         horizontalLayout: "default",
         verticalLayout: "default",
         width: 70,
         whitespaceBreak: true,
       },
       function (err, data) {
         if (err) {
           console.log("Something went wrong...");
           console.dir(err);
           return;
         }
         console.log(data);
       }
     );
   })();
   // Figlet offers extensive documentation for further customization.
   ```

6. Now, let's utilize chalk with simple `console.log()` statements and template literals to customize the console logs :

   ```typescript
   let Github = "https://github.com/Akshaygore1";
   let Linkedin = "https://www.linkedin.com/in/akshaygore2301/";
   let Portfolio = "https://akshaygore.tech";
   let bio = `My name is ${chalk.bold.cyan(
     "Akshay Gore"
   )}. I am a Full Stack Developer proficient in ${chalk.yellow(
     "JavaScript"
   )} and ${chalk.blue("TypeScript")}.`;

   console.log(`\n${bio}`);
   console.log("\nYou Can Connect with me here:");
   console.log(chalk.cyan("GitHub:"), Github);
   console.log(chalk.cyan("LinkedIn:"), Linkedin);
   console.log(chalk.cyan("Portfolio:"), Portfolio);

   // Here, I've added my socials links and used chalk to provide font colors.
   // You can also set background colors using chalk.
   ```

7. Now, let's add some animation using chalk-animation for the closing words:

   ```typescript
   let rainbow = chalkAnimation.rainbow(
     `
               Thank you for checking out my CLI application!`
   );
   // This part creates an animation effect for the closing words using chalk-animation.

   await new Promise((resolve) => setTimeout(resolve, 5000));
   // Adjust the time delay as needed.
   rainbow.stop();
   ```

8. Run `node index.js` to see the changes in the UI.
9. Finally, to publish your package to npm, make changes in `package.json`:

   ```typescript
   "bin": {
       "app-name": "index.js"
   }

   // Create an npm account and run

   npm login

   // then after login just run npm publish

   npm publish
   ```

10. Once your package is published, you can run the command using the name specified in `package.json`. For instance, in my case, it's `akshaygore`, so I would run:

    ```typescript
    npx akshaygore
    ```

    And there you go! You have your CLI bio ready to share with your friends. If you encounter any issues during the creation process, feel free to run the above command and connect with me on social media. I'm happy to assist you!

    Your feedback on my blog is much appreciated. Let me know how I can improve it further!
