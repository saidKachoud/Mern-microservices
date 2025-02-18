import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Button } from "../../components/UI/Button";
import { Notification } from "../../components/UI/Notification";
import { postDataLogin } from "../../services/userServices";

export const Login = () => {
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);
    try {
      const response = await postDataLogin(formData);
      
      setLoading(false);
      if(response.status === 200){
        localStorage.setItem(response.data.token);
        navigate("/products");
      }

    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      } else {
        setNotification({ type: "error", message: "try later agin" });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-[100vh]">
        <div className="bg-dark border border-gray-300 rounded-md shadow-2xl flex flex-col justify-evenly w-[85%] h-[75%] sm:w-[500px] sm:h-[400px] p-3 sm:p-6">
          <div>
            <h1 className="text-4xl">login</h1>
            <h4 className="mt-2">if you went to <Link className="text-blue-600 underline" to="/register">Sign up</Link></h4>
          </div>
          <div>
            <Label text={"Email"} />
            <Input
              style="block"
              type={"email"}
              name={"email"}
              placholder={"ex:john00.0@exemple.com"}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text={"Password"} />
            <Input
              style="block"
              type={"password"}
              name={"password"}
              placholder={"********"}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type={"submit"} text={"Sign in"} loading={loading} />
        </div>
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
      </div>
    </form>
  );
};
