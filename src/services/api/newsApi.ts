import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INews } from "src/pages/news/NewsPage";
import AP from "src/config/ApplicationProperties";
import { Authorization } from "src/utils/Auth";

// TODO Check auth
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${AP.HOST}/fmh/`,
    prepareHeaders: (headers) => {
      const response: string | null = localStorage.getItem("authorization");
      const auth: Authorization = response !== null ? JSON.parse(response) : "";

      headers.set("authorization", auth.accessToken);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getNews: builder.query<INews[], string>({
      query: () => "news",
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
