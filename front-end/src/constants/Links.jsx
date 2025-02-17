import { ShoppingBagIcon, ShoppingCartIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import React from "react";
export const LINKS = [
    {
        LINK : "/products",
        ICON : <ShoppingCartIcon className="w-8 h-8" strokeWidth={1}/>,
        TEXT : "Products",
    },
    {
        LINK : "/my_products",
        ICON : <ShoppingBagIcon className="w-8 h-8" strokeWidth={1}/>,
        TEXT : "My products",
    },
    {
        LINK : "/commands",
        ICON : <Square3Stack3DIcon className="w-8 h-8" strokeWidth={1}/>,
        TEXT : "Commands",
    },
]