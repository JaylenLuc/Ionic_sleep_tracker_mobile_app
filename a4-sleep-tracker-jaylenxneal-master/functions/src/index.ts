/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
// import {onDocumentCreated} from "firebase-functions/v2/firestore";

// The Firebase Admin SDK to access Firestore.
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.addSleepEntry = onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into Firestore using the Firebase Admin SDK.
//     const writeResult = await getFirestore()
//         .collection("messages")
//         .add({original: original});
//     // Send back a message that we've successfully written the message
//     res.json({result: `Message with ID: ${writeResult.id} added.`});
//   });

  const firestore =getFirestore();

  exports.sendJSONSleepData = onRequest(async (request, response) => {
    // Get the JSON data from the request body
    const jsonData = request.body;
  
    // Save the JSON data to Firestore
    /* 
    {

        "2024-03-13" : [sleepDataInterface, sleepDataInterface sleepDataInterface sleepDataInterface],
        "2024-04-7" L [sleepDataInterface,sleepDataInterface,sleepDataInterface],
        
      }
    
    */
    //jsonSleepData/:documentId/original
    await firestore.collection("jsonSleepData").doc("sleep-data").set(jsonData,{merge: true});
  
    // Send a success response
    response.send("JSON data saved successfully!");
  });


  