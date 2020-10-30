import axios from "axios";

const userInstance = axios.create({ baseURL: "/api/user" });

userInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-type": "application/json",
    };

    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

userInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const { status, data } = err.response;

    switch (status) {
      case 401:
        localStorage.clear();
        alert(status);
        window.location.replace("/login");
        break;
      default:
        alert(status);
    }

    return Promise.reject(data);
  }
);

export default userInstance;
