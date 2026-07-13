//lib/axios.js/

import axios from "axios";
import { getToken, removeToken } from "./token";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

// 저장 된 토큰을 Authorization 헤더에 자동으로 붙임
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 인터셉터: 401(토큰 만료/무효) 공통 처리
api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default api;