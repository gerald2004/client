import axios from "@/Config/Axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.patch(
      `/auth/advanced/sessions`,
      {},
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.data);
      return {
        ...prev,
        sessionid: response.data.data.sessionId,
        accessToken: response.data.data.accessToken,
        // roles: response.data.data.roles,
        client: response.data.data.client,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
