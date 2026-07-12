// lib/token.js
// js-cookie 사용/
import Cookies from "js-cookie";

const TOKEN_KEY = "aim_auth_token";

export const getToken = () => Cookies.get(TOKEN_KEY);

export const setToken = (token) =>
    Cookies.set(TOKEN_KEY, token, {
        expires: 7, // 7일 뒤 초기화
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

export const removeToken = () => Cookies.remove(TOKEN_KEY);
