import {
  getDataBaseToLocalStorage,
  setDataBaseToLocalStorage
} from "../../services/dataBaseService";

const getDataRequest = function () {
  console.log("Request data...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Preparing data...");
      const data = getDataBaseToLocalStorage("users");
      resolve(data);
    }, 300);
  });
}

const wtiteDataRequest = function (data) {
  return new Promise ((resolve, reject) => {
    console.log("Data writing...")
    setTimeout(() => {
      setDataBaseToLocalStorage("users", data); 
      resolve();
      console.log("Data writed");
    }, 300, data);
  });
}

const getRequest = function (key) {
  console.log("Request data...");

  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      console.log("Preparing data...");
      const data = JSON.parse(localStorage.getItem(key))

      resolve(data);
    }, 300, key)
  })
}

const postRequest = function (key, data) {
  return new Promise((resolve, reject) => {
    console.log("Data writing...")
    setTimeout(() => {
      localStorage.setItem(key, data);
      resolve();
      console.log("Data writed");
    }, 300, key, data)
  })
}

export {getDataRequest, wtiteDataRequest, getRequest, postRequest}
