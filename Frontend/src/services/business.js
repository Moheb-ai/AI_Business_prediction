import API from "./api";

/*
  Upload CSV and analyze business insights
*/
export const uploadAndAnalyze = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/upload", formData);
  return response.data;
};

/*
  Sales prediction (forecast)
*/
export const getForecast = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/predict", formData);
  return response.data;
};
