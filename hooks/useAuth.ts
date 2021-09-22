import useSWR from "swr";

function get(route) {
  return fetch(route)
    .then((response) => response.ok && response.json())
    .then((user) => user || null);
}

export default function useAuth() {
  const { data: user, error, mutate } = useSWR("/api/user", get)
  const loading = user === undefined

  return {
    user,
    loading,
    error,
  }
}