import React, {  useEffect, useMemo, useState } from "react";
import Navbar from "components/Navbar/Index";
// import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { faBuilding, faEnvelope, faGlobe, faHome, faMapMarkerAlt, faRoad } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { useAlertContext } from "utils/alertUtils";
import AddressTable from "components/AddressTable/AddressTable"
import countryData from "data/country.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

function Address() {
  // const [sidebarToggle] = useOutletContext();
  const [addressTableLoading, setAddressTableLoading] = useState(true);
  const [addressTableContent, setAddressTableContent] = useState([]);
  const {showAlert} = useAlertContext();

  const countryList = useMemo(()=>{
    const countrySelectArr = [0]
    console.log(countryData[210],'countryData.length');
    countryData.forEach((country, index) => {
      countrySelectArr.push({label:country.CountryName, key:country.code, value:index+1})
    });
    return countrySelectArr
  },[])
  const AddressDataHeader = [
    {
      key: "adresseType",
      label: "address type",
    },
    {
      key: "country",
      label: "country",
    },
    {
      key: "city",
      label: "city",
    },
    {
      key: "street",
      label: "street",
    },
    {
      key: "zipCode",
      label: "zip Code",
    },
    {
      key: "validFrom",
      label: "valid From",
    },
    {
      key: "validTo",
      label: "valid To",
    },
    {
      key: "action",
      label : "Aksi"
    }
  ];
  const AddressFormFields = [
    {
      name: "adresseType",
      type: "select",
      label: "Address type",
      options: [ {key:0,value:'None',label:'None'}, {key:1,value:'Default',label:'Default'}, {key:2,value:'ShipFrom',label:'ShipFrom'}, {key:3,value:'ShipTo',label:'ShipTo'}, {key:4,value:'Private',label:'Private'}, {key:5,value:'Business',label:'Business'} ],
      icon: <FontAwesomeIcon icon={faHome} />,
      col: "md:w-1/2",
      validation: yup.string().required('Address type is required')
    },
    {
      name: "countryId",
      type: "select",
      label: "Country",
      options: countryList,
      icon: <FontAwesomeIcon icon={faGlobe} />,
      col: "md:w-1/2",
      validation: yup.string().required('Country is required')
    },
    {
      name: "city",
      type: "text",
      label: "city",
      placeholder: "Enter the city",
      icon: <FontAwesomeIcon icon={faBuilding} />,
      col: "md:w-1/2",
      validation: yup.string().required('city is required')
    },
    {
      name: "street",
      type: "text",
      label: "street",
      placeholder: "Enter the street",
      icon: <FontAwesomeIcon icon={faRoad} />,
      col: "md:w-1/2",
    },
    {
      name: "zipCode",
      type: "text",
      label: "zip code",
      placeholder: "Enter the zip code",
      icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
      col: "md:w-1/2",
      validation: yup.string().required('zip code is required')
    },
    {
      name: "validFrom",
      type: "date",
      label:"valid from",

      icon: <FontAwesomeIcon icon={faEnvelope} />,
      col: "md:w-1/2"
    },
    {
      name: "validTo",
      type: "date",
      label:"valid To",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      col: "md:w-1/2"
    },
    // {
    //   name: "productDescription",
    //   type: "textarea",
    //   label: "product description"
    // }
  ];
  
  
  
  function handleSubmitAddressForm(method, data){

    return new Promise((resolve, reject) => {
        if(method==='post'){
          data.status = 1;
          data.userId = Cookies.get('id')

          axios.post(`${process.env.REACT_APP_BASE_URL}/AdresseAsync/Add`, data,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('token')}`
            },   
          }).then((res)=>{
              resolve(res.statusText);
          }).catch((err)=>reject(err))
        }
        else{
          axios.put(`${process.env.REACT_APP_BASE_URL}/AdresseAsync/Update`, JSON.stringify(data),{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('token')}`
            },   
          }).then((res)=>{
              resolve(res.statusText);
          }).catch((err)=>reject(err))
        }
    })
    
  }

  

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/AdresseAsync/Get`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }).then(res=>{
      setAddressTableContent(res.data);
    }).catch((err)=>console.log(err.message)).finally(()=>setAddressTableLoading(false))

  },[addressTableLoading])
  return (
    <>
      <main className="h-full">
        {/* <Navbar toggle={sidebarToggle} /> */}
  
        {/* Main Content */}
        <div className="mainCard">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Manage Your Addresses</h1>
            <p className="text-gray-500 mt-2">Add, edit, or delete your addresses below</p>
          </header>
          
          <div className="border w-full border-gray-200 bg-white py-4 px-6 mt-6 rounded-md">
            <h1 className="mb-8">Address Table</h1>
            <AddressTable
              loading={addressTableLoading}
              setLoading={setAddressTableLoading}
              dataHeader={AddressDataHeader}
              data={addressTableContent}
              // handleDelete={handleDelete}
              handleSubmitForm={handleSubmitAddressForm}
              countryList={countryList}
              formFields={AddressFormFields}
            />
          </div> 
        </div>
      </main>
    </>
  );
  
}

export default Address;
