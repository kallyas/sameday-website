import { ExtractJwt, Strategy } from "passport-jwt"
import config from './config.js'
import { tokenTypes } from './tokens.js';
import { User } from "../models/index.js"


const jwtOptions = {
    secretOrKey: "sfksdjfkjbk",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  
  const jwtVerify = async (payload, done) => {
    try {
      if (payload.type !== tokenTypes.ACCESS) {
        throw new Error('Invalid token type');
      }
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  };
  
  const jwtStrategy = new Strategy(jwtOptions, jwtVerify);


export { jwtStrategy };