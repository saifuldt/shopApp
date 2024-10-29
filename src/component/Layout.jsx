import { useEffect, useState } from "react"
import { myData } from './LocalStoreg';
import Form from "./Form";

const Layout = () => {

  const [shop, setShop] = useState(
    myData()
  );
  useEffect(()=>{
    localStorage.setItem("shop", JSON.stringify(shop))
  },[shop]);

const handleAddData = (newShop)=>{
  setShop([...shop,newShop]);
  console.log(shop);
}

  

  return (
    <>
      <Form handleAddData={handleAddData} shop={shop}/>
    </>
  )
}

export default Layout