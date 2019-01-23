import {
  _storeData,
  _retrieveData,
  decryptObject,
  encryptShardToSendIt
} from "./helpers";
import { checkUsernameAvailabiliy } from "./web3Functions";
// const socket = io();
export const socketClientIP = "http://1237271a.ngrok.io";
const cryptico = require("cryptico");
export function registerWithUsername(username, fcmToken, address) {
  // send token as well
  return new Promise((resolve, reject) => {
    checkUsernameAvailabiliy(username)
      .then(function() {
        let passPhrase = new Date().getTime().toString();
        let pvtKey = cryptico.generateRSAKey(passPhrase, 512);
        // try {
        // Android.sendPrivateKey(JSON.stringify(pvtKey.toJSON()));
        // Android.storeUsername(username);
        // } catch (e) {
        // localStorage.setItem("key", JSON.stringify(pvtKey.toJSON()));
        _storeData("key", JSON.stringify(pvtKey.toJSON())).then(() => {
          _storeData("username", username).then(() => {
            let publicKey = cryptico.publicKeyString(pvtKey);
            socket.emit("setNewDevice", {
              clientId: username,
              publicKey: publicKey,
              token: fcmToken,
              address: address
            });
            listenForShards(pvtKey);
            waitForRequest(pvtKey, username);
            // document.getElementById("output").innerHTML +=
            //   "\nDevice Stored on socket";
            console.log("Device Stored on Socket");
            resolve("Device stored on sockets");
          });
        });
        // localStorage.setItem("username", username);

        // } finally {

        // }
        // return bool;
      })
      .catch(function() {
        console.log("Username Already Taken from socket.js at line 48");
      });
  });
}

export function loginWithUsername(username) {
  let pvtKey_string;
  // try {
  // console.log("try version of retrieving data");
  // pvtKey_string = Android.getPrivateKey();
  // } catch (e) {
  // pvtKey_string = localStorage.getItem("key");
  console.log("retireving data");
  return new Promise(function(resolve, reject) {
    _retrieveData("key").then(private_key => {
      console.log("private key: ", private_key);

      let PVTKEY = cryptico.RSAKey.parse(private_key);
      console.log("everything is fine till here");
      let publicKey = cryptico.publicKeyString(PVTKEY);
      socket.emit("login user", { clientId: username, publicKey: publicKey });
      listenForShards(PVTKEY);
      waitForRequest(PVTKEY, username);

      resolve();
    });
  });

  // console.log("retireving data");
  // } finally {

  // document.getElementById("output").innerHTML += "\nDevice Stored on socket";
  // }
}

function listenForShards(privateKey) {
  // document.getElementById("output").innerHTML += "\nDevice Listening";
  console.log("Device Listening");
  socket.on("send shard to android", function(data) {
    let decrypted_object = decryptObject(data, privateKey);
    //android code to store this object
    // document.getElementById("output").innerHTML +=
    //   "\nObj = " + JSON.stringify(decrypted_object);
    console.log("recieved shard");
    // console.log("decrypted_object");
    // console.log(decrypted_object);
    // console.log("decrypted_object");
    try {
      Android.sendNewShard(JSON.stringify(decrypted_object));
    } catch (e) {
      // localStorage.setItem(decrypted_object.identity, decrypted_object.shard);
      _storeData(decrypted_object.identity, decrypted_object.shard);
    } finally {
    }
  });
}

function waitForRequest(privateKey, username) {
  socket.on("request shard from android", function(data) {
    let decrypted_object = decryptObject(data, privateKey);
    console.log("decrypted_object");

    let shardToBeSent;
    try {
      console.log("inside try of request shard from android");
      shardToBeSent = Android.requestForShard(decrypted_object.key);
    } catch (e) {
      // shardToBeSent = localStorage.getItem(decrypted_object.key);
      console.log("inside catch of request shard from android");
      shardToBeSent = _retrieveData(decrypted_object.key);
    } finally {
      let user_to_be_sent = decrypted_object.username;
      let object_to_be_sent = {
        userSending: username,
        shard: shardToBeSent
      };
      let encrypted_object = encryptShardToSendIt(
        object_to_be_sent,
        decrypted_object.publicKey
      );
      console.log("encrypted_object");
      console.log("encrypted_object");
      // console.log(encrypted_object);
      socket.emit("send shard to user", {
        user_to_be_sent: user_to_be_sent,
        encrypted_object: encrypted_object
      });
    }
  });
}
