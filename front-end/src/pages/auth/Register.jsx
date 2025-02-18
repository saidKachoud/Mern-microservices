import { useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Button } from "../../components/UI/Button";
import { Notification } from "../../components/UI/Notification";
import { sendVerificationCode } from "../../services/authServices";
import Verification from "./Verification";
import { postDataRegister } from "../../services/userServices";

export const Register = () => {
  const [formRegister, setFormSingUp] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [notification, setNotification] = useState({});
  const [loading,setLoading] = useState(false);
  const [sended,setSended] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormSingUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null)
    if(formRegister.password !== formRegister.retypePassword){
      return;
    }
    setLoading(true);
    try{
      const response = await postDataRegister(formRegister);
      setLoading(false)
      if(response.status === 200){
        setSended(true);
      }
    }catch(error){
      setLoading(false);
      if(error.response){
        setNotification({type:"error",message:error.response.data.message});
      }else{
        setNotification({type:"error",message:"Try again later"});
      }
    }
  };

  return (
      <>
      {
        !sended
        ?
          <form onSubmit={handleSubmit}>
            <div className="flex items-center mt-20 ">
              <div className="bg-white flex flex-col gap-5 justify-center p-5 pt-6 mx-auto shadow-2xl border rounded-md border-gray-300">
                <div className="mb-6">
                  <h1 className="text-4xl mb-2">Sign up</h1>
                  <h4>
                    Already have an account?&nbsp;
                    <Link to={"/login"} className="text-blue-500 underline">
                      Sign in
                    </Link>
                  </h4>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label text={"First name"} />
                    <Input
                      type={"text"}
                      name={"username"}
                      placholder={"ex:John"}
                      value={formRegister.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label text={"Last name"} />
                    <Input
                      type={"text"}
                      name={"fullName"}
                      placholder={"ex:doe"}
                      value={formRegister.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Label text={"Email"} />
                  <Input
                    type={"email"}
                    name={"email"}
                    placholder={"ex:John.doe@gmail.com"}
                    value={formRegister.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label text={"Password"} />
                  <Input
                    type={"password"}
                    name={"password"}
                    placholder={"••••••••"}
                    value={formRegister.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label text={"Retype password"} />
                  <Input
                    type={"password"}
                    name={"retypePassword"}
                    placholder={"••••••••"}
                    value={formRegister.retypePassword}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Button type="Submit" text="Sign up" loading={loading}/>
                </div>
              </div>
              {
                notification && <Notification type={notification.type} message={notification.message} />
              }
            </div>
            
          </form>
        : <Verification formData={formRegister}/>
      }
      </>    
  );
};
