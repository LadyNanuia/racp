import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { configDefinition } from "../api/services/config.definition";
import { createRpcEndpoints } from "../lib/rpc/createRpcEndpoints";
import { authDefinition } from "../api/services/auth.definition";
import { enhanceApiWithSuspense } from "../lib/rtkqSuspense";
import { AppState } from "./store";

export const client = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.app_apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as AppState).auth;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [...configDefinition.tagTypes, ...authDefinition.tagTypes],
  endpoints: (builder) => ({
    ...createRpcEndpoints(builder, configDefinition.entries),
    ...createRpcEndpoints(builder, authDefinition.entries),
  }),
});

enhanceApiWithSuspense(client);

export const {
  useListConfigsQuery,
  useGetConfigQuery,
  useUpdateConfigMutation,
  useLoginMutation,
} = client;
