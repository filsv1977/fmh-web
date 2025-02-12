import * as api from "../api";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import type { NewsDto, NewsPaginationDto } from "./model";
import { NEWS_QUERY } from "../common/constants";

export const newsQuery = (queryClient: QueryClient, data?: NewsPaginationDto) =>
  createQuery<NewsDto[], typeof data>(
    queryClient,
    "/api/fmh/news",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [NEWS_QUERY],
    },
    data
  );
