import { type APIUrlsResponse } from "../types/api";

const backendUri = import.meta.env.PUBLIC_VITE_BACKEND_URI;
export const getUrlsFromApi = async () => {
    const response = await fetch(`${backendUri}/urls?page=1&pageSize=40`);
    const { data: urls } = (await response.json()) as APIUrlsResponse;
    return urls
}
