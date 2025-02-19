import React, { useEffect, useState } from "react";
import { SideBar } from "../../components/UI/SideBar";
import { Product } from "../../components/UI/Product";
import { getProducts } from "../../services/productServices";
import { Button } from "../../components/UI/Button";
import { AddProduct } from "../../components/modals/AddProduct";
import { postCommmand } from "../../services/commandSevices";

export const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productListSelected, setProductListSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [notification, setNotification] = useState({});

  const getProducts_FUNCTION = async () => {
    const response = await getProducts(localStorage.getItem("token"));
    setLoading(false);
    setProducts(response.data.products);
    console.log(response);
  };

  const addCommmand = async () => {
    setNotification(null);
    // try {
      const response = await postCommmand(localStorage.getItem("token"),productListSelected);
      console.log(productListSelected);
      

      console.log(response);
    // } catch (error) {
    //   if (error.response) {
    //     setNotification({ type: "error", message: error.response.message });
    //   } else {
    //     setNotification({ type: "error", message: "try later again" });
    //   }
    // }
  };

  useEffect(() => {
    getProducts_FUNCTION();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="mt-7 ml-[18%] w-[80%]">
        <div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Products goes here</h1>
            </div>
            <div className="flex gap-2 w-[25%]">
              <Button text={"Add Product"} onClick={() => setOpenModal(true)} />
              <Button
                text={"Command"}
                bg={"bg-green-600"}
                onClick={addCommmand}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-5 flex-wrap">
          {products && !loading && products.length
            ? products.map((product) => {
                return (
                  <Product
                    product={product}
                    selectedlist={setProductListSelected}
                    productSelected={productListSelected}
                  />
                );
              })
            : "No products founded"}
          {openModal && <AddProduct setOpen={setOpenModal} />}
        </div>
      </div>
    </div>
  );
};
