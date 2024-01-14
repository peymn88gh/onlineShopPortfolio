import PDynamicForm from "components/Form/PDynamicForm";
import React, { useState, useEffect } from "react"
import * as yup from "yup";
import Stepper from "components/Stepper/Stepper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCubes, faTags, faFolder, faCalendarAlt, faWeight, faRuler, faArrowsAltV, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { faDochub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import DynamicFormSection from "components/Form/DynamicFormSection";

export default function AddProductDetail({closeModal, valueObject, productDetailId}){
 console.log(productDetailId,'valueObject');
      const modalFormFields = [
        {
        name: "availableQuantity",
        type: "number",
        label: "Available Quantity",
        placeholder: "Enter available quantity",
        icon: <FontAwesomeIcon icon={faCubes} />,
        col: "md:w-1/2",
      },
      {
        name: "soldOut",
        type: "number",
        label: "Sold Out",
        placeholder: "Enter sold out quantity",
        icon: <FontAwesomeIcon icon={faCubes} />,
        col: "md:w-1/2",
      },
      {
        name: "price",
        type: "number",
        label: "Price",
        placeholder: "Enter price",
        icon: <FontAwesomeIcon icon={faDollarSign} />,
        col: "md:w-1/2",
      },
      {
        name: "length",
        type: "number",
        label: "Length",
        placeholder: "Enter product length",
        icon: <FontAwesomeIcon icon={faRuler} />,
        col: "md:w-1/2",
      },
      {
        name: "height",
        type: "number",
        label: "Height",
        placeholder: "Enter product height",
        icon: <FontAwesomeIcon icon={faArrowsAltV} />,
        col: "md:w-1/2",
      },
      {
        name: "width",
        type: "number",
        label: "Width",
        placeholder: "Enter product width",
        icon: <FontAwesomeIcon icon={faRuler} />,
        col: "md:w-1/2",
      },
      {
        name: "weigth",
        type: "number",
        label: "Weight",
        placeholder: "Enter product weight",
        icon: <FontAwesomeIcon icon={faWeight} />,
        col: "md:w-1/2",
      },
      {
        name: "unit",
        type: "text",
        label: "Unit",
        placeholder: "Enter product unit",
        icon: <FontAwesomeIcon icon={faTags} />,
        col: "md:w-1/2",
      },
    ];
    function handleSubmitProductDetailForm(method, data){
        const dataCopy = {...data}
        dataCopy.id = productDetailId
        dataCopy.productId = productDetailId
        return new Promise((resolve, reject) => {
            if(method==='post'){
              axios.post(`${process.env.REACT_APP_BASE_URL}/ProductDetailAsync/Add`, dataCopy,{
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get('token')}`
                },   
              }).then((res)=>{
                  resolve(res.statusText);
                  closeModal()
              }).catch((err)=>reject(err))
            }
            else{
              axios.put(`${process.env.REACT_APP_BASE_URL}/ProductDetailAsync/Update`, JSON.stringify(dataCopy),{
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get('token')}`
                },   
              }).then((res)=>{
                  resolve(res.statusText);
                  closeModal()
              }).catch((err)=>reject(err))
            }
        })
        
      }
    return (
        <>
       {/* <section className="bg-white p-4 m-2 rounded-md"> */}
        <DynamicFormSection 
            selectedRowData={valueObject}
            formFields={modalFormFields} 
            handleSubmitForm={handleSubmitProductDetailForm}
        />
       {/* </section> */}
        </>
    );
}