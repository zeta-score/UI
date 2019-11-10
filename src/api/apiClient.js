import axios from 'axios';

var db = firebase.firestore();

export function getData() {
  const response = db.collection("zeta/").doc("1").get().then((doc) => doc.data()
);
  return response;
}

export function getScores() {
  const response = db.collection("zeta/").doc("scores").get().then((doc) => doc.data());
  return response;
}


export function getFlow() {
  const response = db.collection("zeta/").doc("flow").get().then((doc) => doc.data()
);
  return response;
}


export function getZetaData(address) {
  const response = axios.get(`https://zetascore.herokuapp.com/money/0x821aEa9a577a9b44299B9c15c88cf3087F3b5544`, {headers: {
        "X-APP-TOKEN": "tcic"
      }}
    ).then(res => res);
  return response;

}

export function getAddress() {
  const response = axios.get(`https://api.cryptoscamdb.org/v1/addresses`).then(res => formatData(res));
  return response;
}
