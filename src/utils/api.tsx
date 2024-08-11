import axios, { AxiosError } from 'axios';
import { getEnviroment } from "./helper";

export const sendChatMessage = async (message: string , user_id: string) => {
  try {
    const response = await axios.post(`${getEnviroment.API_BASE_URL}/chat`, {
      message: message,
      user_id: user_id
    });
    return response.data.reply;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error sending message:", axiosError.message);
    return axiosError.response?.data;
  }
};

export const showHistory = async (user_id: string) => {
  try {
    const response = await axios.get(`${getEnviroment.API_BASE_URL}/messages/${user_id}`);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("Error response data:", axiosError.response.data);
      return axiosError.response.data;
    } else if (axiosError.request) {
      console.error("No response received:", axiosError.request);
    } else {
      console.error("Error in setting up the request:", axiosError.message);
    }
    throw axiosError;
  }
};

export const createUser = async (email: string) => {
  try {
    const response = await axios.post(`${getEnviroment.API_BASE_URL}/users`, {
      email:email,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

