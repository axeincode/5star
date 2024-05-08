import Cookies from "js-cookie";
import CacheKey from "@/constants/cacheKey";
import { getUrl } from "@/utils";

export const createWebSocket = (route: string) => {
  const socket = new WebSocket(`${getUrl('ws')}/user/connect/ws${route}?token=${Cookies.get(
    CacheKey.TOKEN
  )}`)
  return socket;
}