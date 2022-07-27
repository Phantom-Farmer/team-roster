import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createPlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/player.json?`, playerObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/player/${response.data.name}.json`, payload).then(() => {
        getPlayers(playerObj.uid).then((playerArray) => resolve(playerArray));
      });
    }).catch((error) => reject(error));
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/player/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const deleteSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/player/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updatePlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/player/${playerObj.firebaseKey}.json`, playerObj)
    .then(() => getPlayers(playerObj.uid)).then(resolve)
    .catch(reject);
});

const viewPlayerDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(firebaseKey)
    .then((playerObj) => {
      getSinglePlayer(playerObj.firebaseKey)
        .then((singlePlayerObj) => {
          resolve({ playerObj, ...singlePlayerObj });
        });
    }).catch((error) => reject(error));
});

export {
  getPlayers,
  createPlayer,
  getSinglePlayer,
  deleteSinglePlayer,
  updatePlayer,
  viewPlayerDetails,
};
