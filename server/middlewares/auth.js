const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
  constructor(){

  }
  get m(){
    return async (ctx, next)=>{
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      let decode

      if(!userToken || !userToken.name) {
        throw new global.errs.Forbbiden(errMsg)
      }
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if(error.name === 'TokenExpiredError'){
          errmsg = 'token已过期'
        }
        throw new global.errs.Forbbiden(errMsg)
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()
    }
  }
}

module.exports = {
  Auth
}