import { faDollarSign, faShoppingCart, faStickyNote, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import WrapedTable from "components/Datatables/WrapedTable";
import Navbar from "components/Navbar/Index";
import { useApi } from "customHooks/useApi";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { sidebarToggle } from "utils/toggler";
import * as yup from "yup";

export default function Orders(){
    const [loading , setLoading] = useState(false)
    const [orderContent , setOrderContent] = useState([])
    const getApiEffect = useRef(false);
    const { fetchData } = useApi()
    const orderFields = [
        {
          name: "userId",
          key: "userId",
          type: "number",
          label: "user id",
          col: "md:w-1/2",
          icon: <FontAwesomeIcon icon={faShoppingCart} />, // Shopping Cart icon
          placeholder: "Enter title",
          validation: yup.string().required("userId is required"),
        },
        {
          name: "orderStatus",
          key: "orderStatus",
          type: "number",
          label: "order status",
          icon: <FontAwesomeIcon icon={faDollarSign} />, // Dollar Sign icon
          placeholder: "Total amount",
          col: "md:w-1/2",
          validation: yup.number().required("order Status is required"),
        },
        {
          name: "userNote",
          key: "userNote",
          type: "textarea",
          label: "Note",
          icon: <FontAwesomeIcon icon={faStickyNote} />, // Sticky Note icon
          placeholder: "Enter your note",
          validation: yup.string(),
        },
      ];
      useEffect(()=>{
        if(getApiEffect.current === false || loading) {
          // if(getApiEffect.current === false) {

            fetchData('/OrderAsync/Get', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
              },
            }).then(data=>{setOrderContent(data);setLoading(false)})
            return () => getApiEffect.current = true
          }
        },[loading])
      function onSubmitSuccessOrder(data){
        const tempArr = orderContent.map((ele)=>ele)
        tempArr.push(data)
        setOrderContent(tempArr)
      }
      const handleSubmitOrder = async (method, data) => {
      const url = method === 'post' ? '/OrderAsync/Add' : '/OrderAsync/Update';
        try {
          const response = await fetchData(url, {
            method: method === 'post' ? 'POST' : 'PUT',
            data: method === 'post' ? data : JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          });
        } catch (error) {

        }
      }
    return(
      <>
     <main className="h-full">
      {/* <Navbar toggle={sidebarToggle} /> */}
        <div className="p-6">
        {/* <h1 className="text-2xl font-semibold mb-4">Orders</h1> */}
  
        {/* Surrounding element for the form */}
            <div className="mb-6 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Create New Order</h2>
            <WrapedTable
                dataHeader={orderFields}
                handleSubmitForm={handleSubmitOrder}
                loading={loading}
                setLoading={setLoading}
                onSubmitSuccess={onSubmitSuccessOrder}
                data={orderContent}
            />
            </div>
        </div>
        </main>
        </>
    );
}