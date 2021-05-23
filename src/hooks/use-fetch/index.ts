import { useState, useEffect } from "react";
import useSWR from "swr";

type methodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type token = string | null;

interface OptionsInterface {
  method?: methodType;
  payload?: object;
  namespace?: string;
  optionalHeaders?: object;
}

export function useFetch<Data = any, Error = any>(
  endpoint: string,
  {
    method = "GET",
    payload = {},
    namespace = undefined,
    optionalHeaders = {},
  }: OptionsInterface = {}
) {
  const authToken: token = localStorage.getItem("authToken");

  const url: string = import.meta.env.VITE_BACKOFFICE_API + endpoint;

  let headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...optionalHeaders,
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }

  function fetcher() {
    return fetch(url, { headers, method, body: JSON.stringify(payload) })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          const error = res;
          throw error;
        }
        return res;
      });
  }

  const { data, error, mutate } = useSWR<Data, Error>(url, fetcher);

  const isLoading: boolean = !data && !error;

  return [data, error, isLoading, mutate];
}
