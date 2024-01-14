import React, { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "components/Navbar/Index";
// import { useOutletContext } from "react-router-dom";
import UserTable from "./UserTable";
import axios from "axios";
import ProductTableAdmin from "components/ProductTable/ProductTableAdmin";
import { faBuilding, faCube, faEnvelope, faFolder, faGlobe, faHome, faMapMarkerAlt, faRoad,  faTags } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { useAlertContext } from "utils/alertUtils";
import AddressTable from "components/AddressTable/AddressTable"
import countryData from "data/country.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

function Table() {
  // const [sidebarToggle] = useOutletContext();
  const [userTableLoading, setUserTableLoading] = useState(true);
  const [productAdminTableLoading, setProductAdminTableLoading] = useState(true);
  const [addressTableLoading, setAddressTableLoading] = useState(true);
  const [productAdminTableContent, setProductAdminTableContent] = useState([]);
  const [addressTableContent, setAddressTableContent] = useState([]);
  const [category, setCategory] = useState([]);
  const {showAlert} = useAlertContext();
  const userDataHeader = useMemo(()=>[
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "action",
      label: "Aksi",
    },
  ],[]);
  const userData = useMemo(()=>[
    {
      id: 1,
      name: "Indah Sari Devi",
      email: "mamahdedeh34@gmail.com",
      username: "indahsdev01",
      roles: [{ name: "Admin" }, { name: "Writer" }],
    },
    {
      id: 2,
      name: "Mahindra Putra",
      email: "maheend@gmail.com",
      username: "maheeend01",
      roles: [{ name: "Editor" }],
    },
    {
      id: 3,
      name: "Ujang Ilman",
      email: "ujangil03@gmail.com",
      username: "uujang44",
      roles: [{ name: "Writer" }],
    },

    {
      id: 4,
      name: "Hadi Pradhana",
      email: "hapra09@gmail.com",
      username: "hapra09",
      roles: [{ name: "Writer" }],
    },
    {
      id: 1,
      name: "Indah Sari Devi",
      email: "mamahdedeh34@gmail.com",
      username: "indahsdev01",
      roles: [{ name: "Admin" }, { name: "Writer" }],
    },
    {
      id: 2,
      name: "Mahindra Putra",
      email: "maheend@gmail.com",
      username: "maheeend01",
      roles: [{ name: "Editor" }],
    },
    {
      id: 3,
      name: "Ujang Ilman",
      email: "ujangil03@gmail.com",
      username: "uujang44",
      roles: [{ name: "Writer" }],
    },

    {
      id: 4,
      name: "Hadi Pradhana",
      email: "hapra09@gmail.com",
      username: "hapra09",
      roles: [{ name: "Writer" }],
    },
    {
      id: 4,
      name: "Hadi Pradhana",
      email: "hapra09@gmail.com",
      username: "hapra09",
      roles: [{ name: "Writer" }],
    },
  ],[]);
  const productAdminDataHeader = [
    {
      key: "productName",
      label: "productName",
    },
    {
      key: "productDescription",
      label: "product description",
    },
    {
      key: "categoryId",
      label: "category id",
    },
    {
      key: "userId",
      label: "user id",
    },
    {
      key: "keySearch",
      label: "key search",
    },
    {
      key: "productStatus",
      label: "product status",
    },
    {
      key: "id",
      label: "id",
    },
    {
      key: "status",
      label: "status",
    },
    {
      key: "action",
      label: "Aksi",
    },
  ];
  const productAdminFormFields = [
    {
      name: "productName",
      type: "text",
      label: "Product name",
      placeholder: "Enter Product name",
      icon: <FontAwesomeIcon icon={faCube} />,
      col: "md:w-1/2",
      validation: yup.string().required('Product name is required')
    },
    {
      name: "keySearch",
      type: "text",
      label: "Keywords",
      placeholder: "Enter keyword(s) for Search",
      icon: <FontAwesomeIcon icon={faTags} />,
      col: "md:w-1/2"
    },
    {
      name: "categoryId",
      type: "select",
      label: "Category",
      options: category,
      icon: <FontAwesomeIcon icon={faFolder} />,
      validation: yup.string().required('Category is required')
    },
    {
      name: "startPublishing",
      type: "date",
      label:"start stablishing date",

      icon: <FontAwesomeIcon icon={faEnvelope} />,
      col: "md:w-1/2"
    },
    {
      name: "endPublishing",
      type: "date",
      label:"end stablishing date",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      col: "md:w-1/2"
    },
    {
      name: "productDescription",
      type: "textarea",
      label: "product description"
    }
  ];

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
  
  
  function handleSubmitProductForm(method, data){

    return new Promise((resolve, reject) => {
        if(method==='post'){
          axios.post(`${process.env.REACT_APP_BASE_URL}/ProductAsync/Add`, data,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('token')}`
            },   
          }).then((res)=>{
              resolve(res.statusText);
          }).catch((err)=>reject(err))
        }
        else{
          axios.put(`${process.env.REACT_APP_BASE_URL}/ProductAsync/Update`, JSON.stringify(data),{
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

  const handleDelete = useCallback(async (param) => {
    try {
      const deleteResponse = await axios.delete(`${process.env.REACT_APP_BASE_URL}/ProductAsync/${param}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      if (deleteResponse.statusText === 'OK') {
        setProductAdminTableLoading(true);
      }
    } catch (err) {
      showAlert('failed', `${err.message}`);
    }
  }, []);
  
  
  async function trimSelectCategory(rawArray){
    if(rawArray && (typeof rawArray === 'object')){
      return rawArray.map((item)=>{
        return {key: item.id, value:item.categoryName, label:item.categoryName}
      })
    }
    
  }
  useEffect(()=>{
    if(productAdminTableLoading){

      axios.get(`${process.env.REACT_APP_BASE_URL}/ProductAsync/Get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }).then(res=>{
        setProductAdminTableContent(res.data)
      }).catch((err)=>console.log(err.message)).finally(()=>setProductAdminTableLoading(false))
    }
  },[productAdminTableLoading])
  
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/CategoryAsync/Get`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }).then(res=>{
      trimSelectCategory(res.data).then((arr)=>setCategory(arr))
    }).catch((err)=>console.log(err.message))
  },[])
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
          <div className="border w-full border-gray-200 bg-white py-4 px-6 rounded-md">
          <h1 className="mb-8">Administrative User Table</h1>
            <UserTable
              loading={userTableLoading}
              dataHeader={userDataHeader}
              data={userData}
              handleDelete={handleDelete}
            />
          </div>

          <div className="border w-full border-gray-200 bg-white py-4 px-6 mt-6 rounded-md">
            <h1 className="mb-8">Administrative Product Table</h1>
            <ProductTableAdmin
              loading={productAdminTableLoading}
              setLoading={setProductAdminTableLoading}
              dataHeader={productAdminDataHeader}
              data={productAdminTableContent}
              handleDelete={handleDelete}
              handleSubmitForm={handleSubmitProductForm}
              formFields={productAdminFormFields}
            />
          </div>
          <div className="border w-full border-gray-200 bg-white py-4 px-6 mt-6 rounded-md">
            <h1 className="mb-8"> Address Table</h1>
            <AddressTable
              loading={addressTableLoading}
              setLoading={setAddressTableLoading}
              dataHeader={AddressDataHeader}
              data={addressTableContent}
              handleDelete={handleDelete}
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

export default Table;
