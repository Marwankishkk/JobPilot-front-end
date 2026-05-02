export async function apiFetch(url, options = {}) {
    const originalBody = options.body;
  
    const request = () =>
      fetch(url, {
        ...options,
        body: originalBody,
        credentials: "include",
      });
  
    let res = await request();
  
    if (res.status === 401) {
      const refreshRes = await fetch(apiUrl("/users/refresh"), {
        method: "POST",
        credentials: "include",
      });
  
      if (!refreshRes.ok) return res;
  
      res = await request();
    }
  
    return res;
  }