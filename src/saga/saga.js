import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import Web3 from 'web3';
import { getAddress, getData, getScores, getFlow, getZetaData } from '../api/apiClient';

function* getAddressInit(action) {
  try {
    const data = yield call(getAddress);
    console.log(data)
    if (data.success) {
      yield put({ type: 'GET_ADDRESS_DONE', result: data.result })
    }
  } catch (e) {
    // yield put({ type: 'GET_DATA_FAILED', message: e.message });
  }
}

function* getDataInit(action) {
  try {
    const data = yield call(getData);
    yield put({ type: 'GET_DATA_DONE', result: data })
  } catch (e) {
    // yield put({ type: 'GET_DATA_FAILED', message: e.message });
  }
}

function* getZetaInit(action) {
  try {
    const data = yield call(getZetaData);
    yield put({ type: 'GET_ZETA_DONE', result: data.data })
  } catch (e) {
    // yield put({ type: 'GET_DATA_FAILED', message: e.message });
  }
}

function* getFlowInit(action) {
  try {
    const data = yield call(getFlow);
    yield put({ type: 'GET_FLOW_DONE', result: data })
  } catch (e) {
    // yield put({ type: 'GET_DATA_FAILED', message: e.message });
  }
}

function* getMaliciousInit(action) {
  try {
    console.log(action.address);
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546', null, {});
    console.log(web3);


    var ZetaContract = web3.eth.Contract([{
       "constant": false,
       "inputs": [
         {
           "name": "_address",
           "type": "address"
         },
         {
           "name": "_score",
           "type": "string"
         }
       ],
       "name": "Upload",
       "outputs": [],
       "payable": false,
       "stateMutability": "nonpayable",
       "type": "function"
      },
      {
       "inputs": [],
       "payable": false,
       "stateMutability": "nonpayable",
       "type": "constructor"
      },
      {
       "constant": true,
       "inputs": [],
       "name": "owner",
       "outputs": [
         {
           "name": "",
           "type": "address"
         }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
      },
      {
       "constant": true,
       "inputs": [
         {
           "name": "_address",
           "type": "address"
         }
       ],
       "name": "retrieve",
       "outputs": [
         {
           "name": "x",
           "type": "bytes"
         }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
      },
      {
       "constant": true,
       "inputs": [
         {
           "name": "",
           "type": "address"
         },
         {
           "name": "",
           "type": "uint256"
         }
       ],
       "name": "score",
       "outputs": [
         {
           "name": "",
           "type": "string"
         }
       ],
       "payable": false,
       "stateMutability": "view",
       "type": "function"
      }
      ]);
      ZetaContract.address = "0x39ee1385ae32550e2163f21c53a5714b86879ffe";
      const data  = yield ZetaContract.methods.retrieve(action.address).call().then(res => {
          var str = '';
          for (var i = 0; i < res.length; i += 2) {
              var v = parseInt(res.substr(i, 2), 16);
              if (v) str += String.fromCharCode(v);
          }
         let params = [];
         let result = "";
         for (var i=0; i<= str.length; i++) {
           if(str.charCodeAt(i) > 31){
           result = result + str[i];
           }
           else{
           params.push(result);
           result = "";
           }
         }
         params.pop();
         return params
      });
      let mani_data = data.map(val => { return {value:val, address: action.address}})
      yield put({ type: 'GET_MALICIOUS_DONE', result: mani_data })
  } catch (e) {
    // yield put({ type: 'GET_DATA_FAILED', message: e.message });
  }
}
function* getScoresInit(action) {
  try {
    const data = yield call(getScores);
    yield put({ type: 'GET_SCORES_DONE', result: data })
  } catch (e) {
    // yield put({ type: 'GET_DATA_FAILED', message: e.message });
  }
}

function* saga() {
  yield takeLatest('GET_DATA_INIT', getDataInit);
  yield takeEvery('GET_ZETA_INIT', getZetaInit);
  yield takeEvery('GET_SCORES_INIT', getScoresInit);
  yield takeEvery('GET_FLOW_INIT', getFlowInit);
  yield takeLatest('GET_MALICIOUS_INIT', getMaliciousInit);
}

export default saga;
