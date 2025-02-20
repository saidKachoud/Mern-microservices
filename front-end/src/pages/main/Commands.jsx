import { TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useEffect, useState } from "react";
import { SideBar } from "../../components/UI/SideBar";
import { Notification } from "../../components/UI/Notification";
import {
  deleteCommmandById,
  getCommmands,
} from "../../services/commandSevices";
import { CircularProgress } from "@mui/material";

export const Commands = () => {
  const [listCommands, setListCommands] = useState([]);
  const [openList, setOpenList] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const handleClilckName = (e) => {
    const { id } = e.target;
    openList._id == id ? setOpenList({}) : setOpenList({ _id: id });
  };

  useEffect(() => {
    const veiwCommands = async () => {
      setNotification(null);
      try {
        const response = await getCommmands(localStorage.getItem("token"));
        setLoading(false);
        setListCommands(response.data.commands);
      } catch (error) {
        setLoading(false);
        error.response
          ? setNotification({ type: "error", message: error.response.message })
          : setNotification({ type: "error", message: "try later again" });
      }
    };

    veiwCommands();
  }, []);

  const deleteCommand = async (command_id) => {
    setLoading(true);
    setNotification(null);
    try {
      const response = await deleteCommmandById(
        localStorage.getItem("token"),
        command_id
      );
      setLoading(false);
      setNotification({ type: "success", message: response.data.message });
      const _newListCommand = listCommands.filter(
        (command) => command._id !== command_id
      );
      setListCommands(_newListCommand);
    } catch (error) {
      setLoading(false);
      error.response
        ? setNotification({
            type: "error",
            message: error.response.data.message,
          })
        : setNotification({ type: "error", message: "try later again" });
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="mt-7 ml-[18%] w-[80%] flex flex-wrap gap-2">
        {listCommands && listCommands.length
          ? listCommands.map((command) => {
              return (
                <div
                  key={command._id}
                  className="bg-gray-800 rounded-lg px-3 py-3 w-[30%]"
                  onClick={() => setOpenList({})}
                >
                  <div className="flex justify-between items-start">
                    <div className="mt-2">
                      <span
                        id={command._id}
                        className="block cursor-pointer hover:text-blue-200"
                        onClick={(e) => {
                          e.stopPropagation();

                          handleClilckName(e);
                        }}
                      >
                        List products command
                      </span>
                      <ul
                        className={`${
                          openList._id !== command._id
                            ? "hidden "
                            : "flex flex-col items-center "
                        } `}
                      >
                        {command.products.map((product) => (
                          <li key={product.id}>{product.name}</li>
                        ))}
                      </ul>
                      <h1 className="text-2xl font-semibold mt-1">
                        {command.price_Total}DH
                      </h1>
                      <span className="font-semibold block mt-1">
                        Posted {moment(command.createdAt).fromNow()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCommand(command._id);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 duration-200 cursor-pointer"
                      >
                        {loading ? (
                          <CircularProgress size={"22px"} color="white" />
                        ) : (
                          <TrashIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : "No command founded"}
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
      </div>
    </div>
  );
};
