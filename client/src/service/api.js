import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constant/config';
import { getAccessToken } from '../../../server/utils/common-utils.js';
const API_URL = 'http://localhost:8000';
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        "Accept": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status >= 200 && response?.status < 300) {  // ✅ Accepts 201 as success
        return { isSucess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.data?.message || "Unexpected error",
            code: response?.code
        };
    }
};
const processError = (error) => {
    if (error.response) {
        console.log('ERROR IN RESPONSE:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        console.log('ERROR IN REQUEST:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else {
        console.log('ERROR IN NETWORK:', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    }
};

const API = {};
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({ 
            method: value.method,
            url: value.url.replace(':id', body), // Dynamically replace `:id`
            data: value.method === 'GET' || value.method ==='DELETE' ? undefined : body,
            responseType: value.responseType,
            headers: body instanceof FormData ? { "Content-Type": "multipart/form-data" } : { Authorization: getAccessToken() },
            onUploadProgress: function (progressEvent) {
                if (typeof showUploadProgress === "function") {  // ✅ Check if it's a function
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}
export { API };