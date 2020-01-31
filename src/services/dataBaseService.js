// import { dataBase, postsDataBase } from "./dataBase";

// if (localStorage.getItem("users") === null) {
//   localStorage.setItem("users", JSON.stringify(dataBase));
// }

// if (localStorage.getItem("posts") === null) {
//   localStorage.setItem("posts", JSON.stringify(postsDataBase));
// }

if (localStorage.getItem("users") === null) {
  const usersDataBase = [];
  localStorage.setItem("users", JSON.stringify(usersDataBase))
}

if (localStorage.getItem("posts") === null) {
  const postsDataBase = [];
  localStorage.setItem("posts", JSON.stringify(postsDataBase));
}

if (localStorage.getItem("comments") === null) {
  const postsDataBase = [];
  localStorage.setItem("comments", JSON.stringify(postsDataBase));
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