const axiosInstance = axios.create({
  baseURL: "https://api.real-estate-manager.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
