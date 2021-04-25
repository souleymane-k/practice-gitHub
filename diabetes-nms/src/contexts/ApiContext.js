import React from 'react';

export default React.createContext({
  postLogin: () => {},
  postUser: () => {},
  deleteUser: () => {},
  getResults: () => {},
  addResults: () => {},
  deleteReults: () => {}
})