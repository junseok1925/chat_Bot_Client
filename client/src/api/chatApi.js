import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const sendMessageToChatbot = async (message) => {
  const response = await axios.post(`${BASE_URL}/chat`, { message });
  return response.data.reply;
};
