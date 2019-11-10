const inital = {
}

const main = (state = inital, action) => {
  switch (action.type) {
    case 'INITIAL_STATE': {
      return action.state;
    }
    case "GET_DATA_DONE": {
      return {...state, result: action.result}
    }
    case "GET_ADDRESS_DONE": {
      return {...state, maliciousData: action.result}
    }
    case "GET_SCORES_DONE": {
      return {...state, scores: action.result}
    }
    case "GET_FLOW_DONE": {
      return {...state, flow: action.result}
    }
    case "GET_MALICIOUS_DONE": {
      return {...state, malicious: action.result}
    }
    case "GET_ZETA_DONE": {
      return {...state, zetaData: action.result}
    }

    default: return state;
  }
};

export default main;
