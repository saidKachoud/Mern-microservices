import axios from "axios";

const command_micro_srvices = import.meta.env.VITE_COMMAND_SERVER;

export const postCommmand = async (token, data) => {
  const response = await axios.post(
    `${command_micro_srvices}/addCommand`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
