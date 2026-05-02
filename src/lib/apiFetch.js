export async function apiFetch(url, options = {}) {
    let res = await fetch(url, {
      ...options,
      credentials: "include",
    });
  
    // access token expired
    if (res.status === 401) {
      const refreshRes = await fetch(
        "http://localhost:8000/users/refresh",
        {
          method: "POST",
          credentials: "include",
        }
      );
  
      // refresh failed → logout user
      if (!refreshRes.ok) {
        return res;
      }
  
      // retry original request
      res = await fetch(url, {
        ...options,
        credentials: "include",
      });
    }
  
    return res;
  }