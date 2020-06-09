const initialState = {
  loading: false,
  inProcess: []
};

const getStates = ({ inProcess }, { type }) => {
  if (type.includes('redux') || type.includes('LOCAL')) {
    return { loading: inProcess.length > 0, inProcess };
  }
  const found = inProcess.find((item) => (item === type));
  if (found) {
    inProcess = inProcess.filter((item) => item !== type);
    return { loading: inProcess.length > 0, inProcess };
  }
  inProcess.push(type);
  return { loading: true, inProcess };
};

export default (state = initialState, request) => (
  { ...state, ...getStates(state, request) }
);
