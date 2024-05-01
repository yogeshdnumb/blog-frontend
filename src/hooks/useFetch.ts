import useAxiosPrivate from "./useAxiosPrivate";
import { useEffect, useState } from "react";

export default function useFetch(url) {
  const axios = useAxiosPrivate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function get() {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.log("err", err);
        setError("An error occured");
      } finally {
        setLoading(false);
      }
    }
    get();
    return () => {};
  }, [axios, url]);

  return { data, loading, error };
}
