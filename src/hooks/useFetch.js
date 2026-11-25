import { useState, useEffect, useCallback } from "react";

/**
 * Custom Hook: useFetch
 * Executes async data fetching with loading, error, and refetch handler.
 *
 * @param {Function} fetchFunction - Async function returning data
 * @param {Array} dependencies - Dependency array to trigger refetch
 * @returns {Object} { data, loading, error, refetch }
 */
export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return { data, loading, error, refetch: executeFetch };
}
