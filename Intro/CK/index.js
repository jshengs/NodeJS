const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const WebSocket = require("ws");
const express = require("express");
const { createImage } = require("./utils");
const { getStorage } = require("firebase-admin/storage");

const cors = require("cors");

// websocket
// Import the ws library
// Create a WebSocket server
const app = express();
const wss = new WebSocket.Server({ noServer: true });

app.use(cors());
const port = 5000;
const httpServer = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

httpServer.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
    console.log("Done")
  });
});


let connectedClients = [];
// Set up a connection listener
wss.on("connection", (ws) => {
  // When a message is received from a client
  connectedClients.push(ws);
  ws.on("message", (message) => {
    console.log("Received: %s", message);
  });

  ws.on("close", () => {
    // delete all client
    connectedClients = connectedClients.filter((client) => client !== ws);
  });

  // Send a message to the client
  ws.send("Hello from server!");
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "nodejs1-7a602.appspot.com",
});



// // Function to save an image to Firebase Storage
// async function saveImageToStorage(base64Image, fileName) {
//   try {
//     // Reference to the default bucket
//     const bucket = admin.storage().bucket();

//     // Convert base64 string to buffer
//     const imageBuffer = Buffer.from(base64Image, "base64");

//     // Specify the file name in Firebase Storage
//     const file = bucket.file(fileName);

//     // Create a write stream to upload the image buffer
//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: "image/jpeg", // Adjust the content type based on your image type
//       },
//     });

//     // Handle stream events (finish, error)
//     stream.on("finish", () => {
//       console.log(`Image ${fileName} uploaded to Firebase Storage.`);
//     });

//     stream.on("error", (err) => {
//       console.error(`Error uploading image ${fileName}:`, err);
//     });

//     // Write the image buffer to the stream
//     stream.end(imageBuffer);

//     return `gs://${bucket.name}/${fileName}`;
//   } catch (error) {
//     console.error("Error saving image to Firebase Storage:", error);
//     throw error;
//   }
// }

// // Example usage:
// const base64Image = "YOUR_BASE64_ENCODED_IMAGE_STRING";
// const fileName = "masking.png";

// saveImageToStorage(base64Image, fileName);





// connect to websocket
let sequance = 0;

function addTask(task, email) {
  // Distribute tasks if there are connected clients
  sequance += 1;
  let ramain = sequance % connectedClients.length;
  if (connectedClients.length > 0) {
    connectedClients.forEach((client, index) => {
      if (ramain === index) {
        client.send([task, sequance, ramain, index, email].toString());
      }
    });
  }
}
// when task is not empty

app.get("/test", (req, res) => {
  const { email } = req.query;
  if (connectedClients.length === 0) {
    res.send({
      status: "error",
      message: "no client connected",
    });
  } else {
    res.send("ok");
  }

  let _url = "https://i.ibb.co/BnwTGtB/2023-11-24-154057.png";
  addTask(_url, email);
});

app.get("/", async (req, res) => {
  const { url, colorTone } = req.query;
  if (url === undefined) {
    res.send({
      status: "error",
      message: "url is required",
    });
  }

  // if (connectedClients.length === 0) {
  //   res.send({
  //     status: "error",
  //     message: "no client connected",
  //   });
  // }
  // addTask(url[0], email);

  const _urll = url;

  const imageBuffer = await createImage(_urll, colorTone);

  const bucket = getStorage().bucket();

  const file = bucket.file("ck/" + Date.now() + ".png");
  const options = {
    metadata: {
      contentType: "image/png", // Set the content type appropriately for a PNG image
    },
  };

  file.save(imageBuffer, options, function (err) {
    if (err) {
      res.send("not ok");
      return;
    }

    // get public url
    file
      .getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      })
      .then((url) => {
        res.send(
          JSON.stringify({
            status: "ok",
            url: url[0],
          })
        );
      });
  });
});

let count = 0;

app.get("/count", (req, res) => {
  count += 1;
  res.send(count.toString());
});