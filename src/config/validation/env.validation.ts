import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  //////////////////////////////////////////
  // DB
  DATABASE_URL: Joi.string().required(),

  //////////////////////////////////////////
  // SERVER
  PORT: Joi.number().default(8000),
  NODE_ENV: Joi.string().default('development'),

  //////////////////////////////////////////
  // JWT
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().required(),

  //////////////////////////////////////////
  // TWILIO
  TWILIO_ACCOUNT_SID: Joi.string().required(),
  TWILIO_AUTH_TOKEN: Joi.string().required(),
  TWILIO_PHONE_NUMBER: Joi.string().required(),

  //////////////////////////////////////////
  // JWT

  //////////////////////////////////////////
  // OAUTH
  //// GOOGLE
  OAUTH_GOOGLE_CLIENT_ID: Joi.string().required(),
  OAUTH_GOOGLE_CLIENT_SECRET: Joi.string().required(),
  OAUTH_GOOGLE_REDIRECT_URL: Joi.string().required(),
  //// FACEBOOK
  OAUTH_FACEBOOK_CLIENT_ID: Joi.string().required(),
  OAUTH_FACEBOOK_CLIENT_SECRET: Joi.string().required(),
  OAUTH_FACEBOOK_REDIRECT_URL: Joi.string().required(),
  //// KAKAO
  OAUTH_KAKAO_CLIENT_ID: Joi.string().required(),
  OAUTH_KAKAO_CLIENT_SECRET: Joi.string().required(),
  OAUTH_KAKAO_REDIRECT_URL: Joi.string().required(),
  /// NAVER
  OAUTH_NAVER_CLIENT_ID: Joi.string().required(),
  OAUTH_NAVER_CLIENT_SECRET: Joi.string().required(),
  OAUTH_NAVER_REDIRECT_URL: Joi.string().required(),
  /// APPLE
  OAUTH_APPLE_CLIENT_ID: Joi.string().required(),
  OAUTH_APPLE_CLIENT_SECRET: Joi.string().required(),
  OAUTH_APPLE_REDIRECT_URL: Joi.string().required(),
});
