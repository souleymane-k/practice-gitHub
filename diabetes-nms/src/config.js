let apiPath;
let tokenKey;
if (process.env.NODE_ENV === 'production') {
  apiPath = 'https://shrouded-scrubland-37554.herokuapp.com/api'
  tokenKey = '0d0e1dbb-8d52-49f0-9dbf-570ec4f5109a'
} else {
  apiPath = 'http://localhost:8000/api'
  tokenKey = '0d0e1dbb-8d52-49f0-9dbf-570ec4f5109a'
}
// eslint-disable-next-line 
export default {
  API_ENDPOINT: apiPath,
  TOKEN_KEY: tokenKey,
}


// export default {
//   API_ENDPOINT : 'https://frozen-earth-36761.herokuapp.com/api',
//   API_KEY: process.env.NODE_ENV
// }




// let apiPath;
// let tokenKey;
// if (process.env.NODE_ENV === 'production') {
//   apiPath = 'https://shrouded-scrubland-37554.herokuapp.com/api'
//   tokenKey = '0d0e1dbb-8d52-49f0-9dbf-570ec4f5109a'
// } else {
//   apiPath = 'http://localhost:8001/api'
//   tokenKey = '0d0e1dbb-8d52-49f0-9dbf-570ec4f5109a'
// }
// // eslint-disable-next-line 
// export default {
//   API_ENDPOINT: apiPath,
//   TOKEN_KEY: tokenKey,
// }



