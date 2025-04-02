import { useState, useEffect } from "react";

type UseFetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

const useFetch = <T>(fetchData: () => Promise<T>): UseFetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchData();

        setData(response);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataFromApi();
  }, [fetchData]);

  return { data, isLoading, error };
};

export default useFetch;
