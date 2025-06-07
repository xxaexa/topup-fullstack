import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getUserFromLocalStorage } from "../../utils/localStorage";

const baseUrl = import.meta.env.VITE_BACKEND_API;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const user = getUserFromLocalStorage();
    if (user?.accessToken) {
      headers.set("Authorization", `Bearer ${user.accessToken}`);
      console.log(">> TOKEN YANG DIKIRIM:", user.accessToken);
    }
    return headers; 
  },
});

export default baseQuery;
