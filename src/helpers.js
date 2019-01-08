import { AsyncStorage } from "react-native";
const cryptico = require("cryptico");
import firebase from "react-native-firebase";
_storeData = (key, value) => {
  if (typeof value == "object") {
    console.log("type is object");
    jsonOfItem = AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(jsonOfItem);
    return jsonOfItem;
  } else if (typeof value == "string") {
    console.log("type is string");
    jsonOfItem = AsyncStorage.setItem(key, value);
    console.log(jsonOfItem);
    return jsonOfItem;
  }

  // try {
  //   console.log("inside try block of _storeData");
  //   AsyncStorage.setItem(key, JSON.stringify(value))
  //     .then(msg => {
  //       console.log("data stored successfully");
  //       console.log("msg:" + msg);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   // console.log("data stored successfully");
  // } catch (error) {
  //   console.log("inside catch block of _storeData");
  //   console.log(error + "  occured will storing data");
  // }
};
const verifyInputKey = input_pvt_key => {
  // verifies the format of the input private key
  return new Promise((resolve, reject) => {
    if (input_pvt_key.length == 64) {
      input_pvt_key = "0x" + input_pvt_key;
      resolve(input_pvt_key);
    } else {
      reject(
        "Input private key is not 64 characters long. Please make sure that you have entered the correct key"
      );
    }
  });
};

_retrieveData = async key => {
  try {
    value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error + "  occured will retrieveing data");
  }
};
function decryptObject(encrypted, privateKey) {
  console.log("encrypted:", encrypted);
  console.log("privateKey:", privateKey);
  privateKey = cryptico.RSAKey.parse(privateKey);
  let result = cryptico.decrypt(encrypted, privateKey);
  console.log("result:", result);

  return JSON.parse(result.plaintext);
}
function encryptShardToSendIt(shard, publicKey) {
  console.log("inside encryptShardToSendIt");
  shard = JSON.stringify(shard);
  console.log(shard);
  let encrypted = cryptico.encrypt(shard, publicKey);

  console.log(encrypted);
  return encrypted.cipher;
}
getNotificationToken = () => {
  return new Promise(function(resolve, reject) {
    console.log("inside getNotificationToken promise");
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          resolve(fcmToken);
        } else {
          reject("some error occured while getting token");
        }
      });
  });
};

export {
  _storeData,
  _retrieveData,
  decryptObject,
  encryptShardToSendIt,
  verifyInputKey,
  getNotificationToken
};
