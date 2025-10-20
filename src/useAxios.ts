import { useState, useEffect } from "react";
import axiosClient from "./axiosClient";

interface Options {
  manual?: boolean;
  immediate?: boolean;
  dependencies?: any[];
}

export function useAxios<T = any>(url: string, options?: Options) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(options?.immediate ?? true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options?.immediate) fetchData();
  }, options?.dependencies || []);

  return { data, loading, error, refetch: fetchData };
}
