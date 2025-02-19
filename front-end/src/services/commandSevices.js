import axios from "axios";

const command_micro_services = import.meta.env.VITE_COMMAND_SERVER;

export const postCommmand = async (token, data) => {
  const response = await axios.post(
    `${command_micro_services}/addCommand`,
    { data },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getCommmands = async (token) => {
  const response = await axios.get(`${command_micro_services}/getCommands`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deleteCommmand = async (token, command_id) => {
  const response = await axios.get(
    `${command_micro_services}/deleteCommand/${command_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
