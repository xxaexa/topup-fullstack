import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
  } from "@reduxjs/toolkit/query";
  import {
    getUserFromLocalStorage,
    saveUserToLocalStorage,
  } from "../../utils/localStorage";
  import { logout } from "../slice/user";
  
  interface TokenErrorResponse {
    error: string;
  }
  
  const baseUrl = import.meta.env.VITE_BACKEND_API;
  
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const user = getUserFromLocalStorage();
      if (user?.token) {
        headers.set("authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  });
  
  const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (
      result.error?.status === 403 &&
      (result.error.data as TokenErrorResponse)?.error === "Token expired"
    ) {
      const refreshResult = await baseQuery(
        { url: "/auth/refresh-token", method: "POST" },
        api,
        extraOptions
      );
  
      if (refreshResult.data) {
        const newToken = (refreshResult.data as { accessToken: string }).accessToken;
        const user = getUserFromLocalStorage();
        if (user) {
          const updatedUser = { ...user, token: newToken };
          saveUserToLocalStorage(updatedUser);
        }
  
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  
    return result;
  };
  
  export default customFetchBase;
  