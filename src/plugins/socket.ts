import Cookies from "js-cookie";
import CacheKey from "@/constants/cacheKey";

export const createWebSocket = (route: string) => {
  const socket = new WebSocket(`${import.meta.env.VITE_SOKET_URL}${route}?token=${Cookies.get(
    CacheKey.TOKEN
  )}`)
  return socket;
}