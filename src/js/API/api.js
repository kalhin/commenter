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
    }, 2000);
  });
}

const wtiteDataRequest = function (data) {
  return new Promise ((resolve, reject) => {
    console.log("Data writing...")
    setTimeout(() => {
      setDataBaseToLocalStorage("users", data); 
      resolve();
      console.log("Data writed");
    }, 2000, data);
  });
}

export {getDataRequest, wtiteDataRequest}
