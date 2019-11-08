import dataBase from "./dataBase";

if (localStorage.getItem("users") === null) {
  localStorage.setItem("users", JSON.stringify(dataBase));
}

const setDataBaseToLocalStorage = (key, data) => {
  localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(data));
};

const getDataBaseToLocalStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));    
    return data;
  };

export {setDataBaseToLocalStorage, getDataBaseToLocalStorage};