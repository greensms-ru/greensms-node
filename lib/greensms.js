'use strict';

import _ from 'lodash';
import RestClient from './http/rest-client';
import { baseUrl } from './util/url';
import { getVersion } from './util/version';
import ModuleLoader from './api/module-loader';

class GreenSMS {
  /**
   * Initialize GreenSMS Client
   * @param {object} opts - Options
   * @param {string|null} opts.username - Username. Required when AuthToken is not passed
   * @param {string|null} opts.password - Password. Request when AuthToken is not passed
   * @param {string|null} opts.token - AuthToken. Required when Username/Password not passed
   * @param {boolean} opts.useTokenForRequests - Create Auth Token after login and use for subsequent requests
   * @param {String} opts.version - API Version to be used
   * @param {boolean} opts.camelCaseResponse - Convert all response keys to camelCase
   */
  constructor(opts) {
    opts = opts || {};
    const {
      username,
      password,
      token,
      useTokenForRequests,
      camelCaseResponse,
      version,
    } = opts;
    this.token = null;

    if (token) {
      this.token = token;
    }

    if (!this.token && (!username || !password)) {
      throw new Error('Either User/Pass or Auth Token is required!');
    } else if (username) {
      this.username = username;
      this.password = password;
    }

    const sharedOptions = {
      useTokenForRequests: useTokenForRequests,
      version: getVersion(version),
      baseUrl: baseUrl(),
      restClient: this._getHttpClient({
        useCamelCase: camelCaseResponse,
      }),
    };

    this.addModules(sharedOptions);
  }

  addModules(sharedOptions) {
    const modules = ModuleLoader.registerModules(sharedOptions); ;
    _.extend(this, modules);
  }

  _getHttpClient(httpParams) {
    httpParams = httpParams || {};
    const params = {};

    if (!this.token && this.username) {
      params.user = this.username;
      params.pass = this.password;
    }

    const httpClientOptions = { ...httpParams,
      ...{
        token: this.token,
        params,
      },
    };
    const restClient = new RestClient(httpClientOptions);
    return restClient;
  }

  static lookup(opts, callback) {
    opts = opts || {};
    const sharedOptions = {
      version: getVersion(opts.version),
      baseUrl: baseUrl(),
      restClient: new RestClient({
        useCamelCase: typeof opts.camelCaseResponse === 'boolean' ? opts.camelCaseResponse : false,
      }),
    };
    const general = new General(sharedOptions).getInstance();
    const promise = new Promise((resolve, reject) => {
      general.lookup(opts.params).then(resolve).catch(reject);
    });

    if (callback !== null && typeof callback === 'function') {
      promise.then(function (data) {
        return callback(null, data);
      }).catch(function (err) {
        return callback(err);
      });
    } else {
      return promise;
    }
  }

  static status(opts, callback) {
    opts = opts || {};
    const sharedOptions = {
      version: getVersion(opts.version),
      baseUrl: baseUrl(),
      restClient: new RestClient({
        useCamelCase: typeof opts.camelCaseResponse === 'boolean' ? opts.camelCaseResponse : false,
      }),
    };
    const general = new General(sharedOptions).getInstance();
    const promise = new Promise((resolve, reject) => {
      general.status().then(resolve).catch(reject);
    });

    if (callback !== null && typeof callback === 'function') {
      promise.then(function (data) {
        return callback(null, data);
      }).catch(function (err) {
        return callback(err);
      });
    } else {
      return promise;
    }
  }

}

export default GreenSMS;