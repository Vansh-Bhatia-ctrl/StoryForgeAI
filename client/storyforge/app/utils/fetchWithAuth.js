import useAuthentication from "../store/useAuthentication";

const fetchWithAuth = async (URL, options = {}) => {
  const { accessToken, refreshAccessToken } = useAuthentication.getState();

  const config = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  try {
    let response = await fetch(URL, config);

    if (response.status === 401) {
      const errorData = await response.json();

      if (errorData.code === "TOKEN_EXPIRED") {
        console.log("🔄 Access token expired, refreshing...");

        try {
          const newAccessToken = await refreshAccessToken();

          if (!newAccessToken) {
            throw new Error("Failed to refresh token");
          }

          console.log("✅ Token refreshed successfully");

          config.headers.Authorization = `Bearer ${newAccessToken}`;
          response = await fetch(URL, config);

          const retryData = await response.json();
          return retryData;
        } catch (refreshError) {
          console.error("❌ Token refresh failed:", refreshError);

          useAuthentication.setState({
            accessToken: null,
            loggedIn: false,
            signedUp: false,
          });

          if (typeof window !== "undefined") {
            window.location.href = "/authentication";
          }
          throw new Error("Session expired. Please login again.");
        }
      } else {
        throw new Error(errorData.message || "Unauthorized");
      }
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    throw error;
  }
};

export default fetchWithAuth;
