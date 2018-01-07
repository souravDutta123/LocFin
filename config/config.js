let serviceCredentials = {
  mongodb : {
    username : '',
    password : ''
  }
}

let mongoConfig = {
  connectionURL : 'mongodb://localhost:27017/sourav_storage',
  connectionURL1 : 'mongodb://username:password@ds131137.mlab.com:31137/sourav_storage'
}

let jwtConfig = {
  secret : 'locfin'
}

let googleLocation = {
  key : '',
}
module.exports = {
  mongoConfig : mongoConfig,
  jwtConfig : jwtConfig
}
