import { useState, useEffect } from "react";
import useSWR from "swr";

type methodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type token = string | undefined;

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
  const authToken = localStorage.getItem("authToken");

  const url: string = `${import.meta.env.VITE_BACKOFFICE_API}${endpoint}`;

  let headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...optionalHeaders,
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }

  function fetcher() {
    return fetch(url, { headers, method, body: JSON.stringify(payload) }).then(
      (res) => res.json()
    );
  }

  const { data, error, mutate } = useSWR<Data, Error>(url, fetcher);

  const isLoading: boolean = !data && !error;

  return [data, error, isLoading, mutate];
}
