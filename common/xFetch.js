import 'fetch-detector';

import { base64decodeFunc } from './base64';
import uuid from "./uuid";

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function check500(res) {
  if (res.status === 500) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(jsonResult) {
  let { status, message, content, metadata } = jsonResult;
  if (status !== 'success') {
    return Promise.reject(jsonResult);
  }
  content = content || {}
  content.meta = metadata;
  return content;
}

let getLocalToken = () => {
  const localToken = localStorage.CONF_ACCESS_TOKEN ? localStorage.CONF_ACCESS_TOKEN : '';
  const bearer = 'Bearer ';
  return bearer + localToken;
};

function xFetch(url, options) {
  // const localToken = getLocalToken();
  const opts = { ...options, credentials: 'include' };
  // const token = cookie.get('access-token') || '';

  // let locale = base64decodeFunc(localStorage.LOCALE);
  //
  // if (!locale) {
  //   locale = 'en';
  // }

  opts.headers = {
    ...opts.headers,
    // 'access-token': localToken,
    'access-trace-id': uuid(),
    // authorization: cookie.get('authorization') || '',
    // locale
  };

  return fetch(url, opts)
  // .then(check401)
  // .then(check404)
  // .then(check500)
    .then(jsonParse)
    .then((res) => {
      // if (res.jsonResult && res.jsonResult.statusCode === '7001') { //检测登录超时的情况,如超时清除缓存和跳转页面
      //   delete localStorage.CONF_ACCESS_TOKEN;
      //   delete localStorage.CONF_ACCOUT;
      //   delete localStorage.CONF_ID;
      //   delete localStorage.CONT_NAME;
      //   delete localStorage.TIME_TIMING;
      //   window.location.hash = '/login';
      // }
      return res.jsonResult;
    });
  // .then(errorMessageParse);
}

export default xFetch;
