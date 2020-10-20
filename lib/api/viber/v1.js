import { MODULE_VIBER, METHOD_VIBER_SEND, METHOD_VIBER_STATUS, API_METHOD_GET, API_METHOD_POST } from './../../util/constants';
import { buildUrl } from '../../util/url';

class ViberV1 {
  constructor(opts) {
    this.moduleName = MODULE_VIBER;
    this.options = opts || {};
  }

  sendMessage(params, callback) {
    const functionName = METHOD_VIBER_SEND;
    params = params || {};
    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    const promise = new Promise((resolve, reject) => {
      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_POST,
        params,
      }).then(data => {
        return resolve(data);
      }).catch(err => {
        return reject(err);
      });
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

  fetchStatus(params, callback) {
    const functionName = METHOD_VIBER_STATUS;
    params = params || {};
    const apiUrl = buildUrl(this.options.baseUrl, this.moduleName, functionName);
    const promise = new Promise((resolve, reject) => {
      this.options.restClient.request({
        uri: apiUrl,
        method: API_METHOD_GET,
        params,
      }).then(data => {
        return resolve(data);
      }).catch(err => {
        return reject(err);
      });
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

export default ViberV1;