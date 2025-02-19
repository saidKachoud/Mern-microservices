import { TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useEffect, useState } from "react";
import { SideBar } from "../../components/UI/SideBar";
import { getCommmands } from "../../services/commandSevices";

export const Commands = () => {
  const [listCommands, setListCommands] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [notification, setNotification] = useState({});
  const deleteBtn = true;

  const handleClilckName = () => {
    openList ? setOpenList(false) : setOpenList(true);
  };

  useEffect(() => {
    const veiwCommands = async () => {
      setNotification(null);
      try {
        const response = await getCommmands(localStorage.getItem("token"));
        console.log(response);
      } catch (error) {
        console.log("error");
        error.response
          ? setNotification({ type: "error", message: error.response.message })
          : setNotification({ type: "error", message: "try later again" });
      }
    };

    veiwCommands();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="mt-7 ml-[18%] w-[80%]">
        <div
          className="bg-gray-800 rounded-lg px-3 py-3 w-[20%]"
          onClick={() => setOpenList(false)}
        >
          <div className="flex justify-between items-start">
            <div className="mt-2">
              <span
                className="block cursor-pointer hover:text-blue-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClilckName();
                }}
              >
                name produit
              </span>
              <ul
                className={`${
                  !openList ? "hidden " : "flex flex-col items-center "
                } `}
              >
                <li>jjjjjjjj</li>
                <li>jjjjjjjj</li>
                <li>jjjjjjjj</li>
                <li>jjjjjjjj</li>
              </ul>
              <h1 className="text-2xl font-semibold mt-1">Total 1000 DH</h1>
              <span className="font-semibold block mt-1">
                {/* Posted {moment("hhhhhhhhhhhhhh").fromNow()} */}
                Posted
              </span>
            </div>
            <div className="flex justify-between items-center">
              {deleteBtn && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct();
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 duration-200 cursor-pointer"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
