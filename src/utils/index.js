/* eslint-disable import/prefer-default-export */

export const getDefaultSetStates = (defaultState) => (
  Object.keys(defaultState).map((key) => `set${key[0].toUpperCase()}${key.slice(1)}`));
