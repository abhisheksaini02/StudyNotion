import axios from "axios";

export const axiosInstance = axios.create({
  // Optional: add baseURL or other default settings here
  // baseURL: "https://api.example.com", // Uncomment and replace with your base URL if needed
});

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
  try {
    console.log(`Making ${method} request to URL: ${url}`);
    console.log("Request Body Data:", bodyData);
    console.log("Request Headers:", headers);
    console.log("Request Params:", params);

    const response = await axiosInstance({
      method,
      url,
      data: bodyData ? bodyData : null,
      headers: headers ? headers : { 'Content-Type': 'application/json' }, // Default headers
      params: params ? params : null,
    });

    console.log("API Connector Response Data:", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Connector Axios Error Message:", error.message);
      console.error("API Connector Axios Error Code:", error.code);
      console.error("API Connector Axios Error Request:", error.request);
      console.error("API Connector Axios Error Response:", error.response);
      console.error("API Connector Axios Error Response Data:", error.response?.data);
    } else {
      console.error("API Connector Error:", error);
    }
    throw error;
  }
};
