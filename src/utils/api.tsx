import axios from "axios";
import { getEnviroment } from "./helper";

export const sendChatMessage = async (message: string) => {
  try {
    const response = await axios.post(`${getEnviroment.API_BASE_URL}/chat`, {
      message: message,
    });
    return response.data.reply;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

