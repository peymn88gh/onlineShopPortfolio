import { faBox, faCalendar, faDollarSign, faInfo, faRuler, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import WrapedTable from "components/Datatables/WrapedTable";
import Navbar from "components/Navbar/Index";
import { useEffect, useRef, useState } from "react";
import { useAlertContext } from "utils/alertUtils";
import { sidebarToggle } from "utils/toggler";
import * as yup from "yup";
import { useApi } from "customHooks/useApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Shipping(){
    const [loading , setLoading] = useState(false)
    const {showAlert} = useAlertContext();
    const [shippingContent , setShippingContent] = useState([])
    const { fetchData } = useApi()
    const getApiEffect = useRef(false)
    const shippingFields = [
        {
          name: "shippingName",
          key: "shippingName",
          type: "text",
          label: "Shipping Name",
          col: "md:w-1/2",
          icon: <FontAwesomeIcon icon={faShippingFast} />, // Shipping Box icon
          placeholder: "Enter shipping name",
          validation: yup.string().required("Shipping name is required"),
        },
        {
          name: "shippingDescription",
          key: "shippingDescription",
          type: "text",
          label: "Shipping Description",
          icon: <FontAwesomeIcon icon={faInfo} />, // Info icon
          placeholder: "Enter shipping description",
          col: "md:w-1/2",
          validation: yup.string(),
        },
        {
          name: "shippingStatus",
          key: "shippingStatus",
          type: "select",
          options: [
            {key:0,value:0,label:'None'},
            {key:1,value:1,label:'DEfault'}
          ],
          label: "Shipping Status",
          icon: <FontAwesomeIcon icon={faShippingFast} />, // Shipping Fast icon
          col: "md:w-1/2",
          placeholder: "Enter shipping status",
          validation: yup.number(),
        },
        {
          name: "minQuantity",
          key: "minQuantity",
          type: "number",
          label: "Minimum Quantity",
          icon: <FontAwesomeIcon icon={faBox} />, // Box icon
          col: "md:w-1/2",
          placeholder: "Enter minimum quantity",
          validation: yup.number().required("Minimum quantity is required").transform((value) => (isNaN(value) ? undefined : value)).nullable(),
        },
        {
          name: "startPublishing",
          key: "startPublishing",
          type: "date",
          label: "Start Publishing",
          icon: <FontAwesomeIcon icon={faCalendar} />, // Calendar icon
          col: "md:w-1/2",
          placeholder: "Select start date",
          validation: yup.date().nullable()
          .transform((curr, orig) => orig === '' ? null : curr).required('Required field'),
        },
        {
          name: "endPublishing",
          key: "endPublishing",
          type: "date",
          label: "End Publishing",
          icon: <FontAwesomeIcon icon={faCalendar} />, // Calendar icon
          col: "md:w-1/2",
          placeholder: "Select end date",
          validation: yup.date().required("End date is required").nullable()
          .transform((curr, orig) => orig === '' ? null : curr).required('Required field'),
        },
        {
          name: "price",
          key: "price",
          type: "number",
          label: "Price",
          icon: <FontAwesomeIcon icon={faDollarSign} />, // Dollar Sign icon
          col: "md:w-1/2",
          placeholder: "Enter price",
          validation: yup.number().required("Price is required").transform((value) => (isNaN(value) ? undefined : value)).nullable(),
        },
        {
          name: "unit",
          key: "unit",
          type:'select',
          options: [
            {key:'KG',value:'KG',label:'kilogram'}
          ],
          label: "Unit",
          icon: <FontAwesomeIcon icon={faRuler} />, // Ruler icon
          col: "md:w-1/2",
          placeholder: "Enter unit",
          validation: yup.string().required("Unit is required"),
        },
      ];
    const filterFields = [
      {
        name: "shippingName",
        key: "shippingName",
        type: "text",
        label: "Shipping Name",
        col: "md:w-1/2",
        icon: <FontAwesomeIcon icon={faShippingFast} />, // Shipping Box icon
        placeholder: "Enter shipping name",
        // validation: yup.string(),
      },
      {
        name: "shippingDescription",
        key: "shippingDescription",
        type: "text",
        label: "Shipping Description",
        icon: <FontAwesomeIcon icon={faInfo} />, // Info icon
        placeholder: "Enter shipping description",
        col: "md:w-1/2",
        validation: yup.string(),
      },
      {
        name: "shippingStatus",
        key: "shippingStatus",
        type: "select",
        options: [
          {key:0,value:0,label:'None'},
          {key:1,value:1,label:'DEfault'}
        ],
        label: "Shipping Status",
        icon: <FontAwesomeIcon icon={faShippingFast} />, // Shipping Fast icon
        col: "md:w-1/2",
        placeholder: "Enter shipping status",
        validation: yup.number('must be number').transform((value) => (isNaN(value) ? undefined : value)).nullable(),
      },
      {
        name: "minQuantity",
        key: "minQuantity",
        type: "number",
        label: "Minimum Quantity",
        icon: <FontAwesomeIcon icon={faBox} />, // Box icon
        col: "md:w-1/2",
        placeholder: "Enter minimum quantity",
        validation: yup.number('must be number').transform((value) => (isNaN(value) ? undefined : value)).nullable(),
      },
      {
        name: "startPublishing",
        key: "startPublishing",
        type: "date",
        label: "Start Publishing",
        icon: <FontAwesomeIcon icon={faCalendar} />, // Calendar icon
        col: "md:w-1/2",
        placeholder: "Select start date",
        validation: yup.date().nullable()
        .transform((curr, orig) => orig === '' ? null : curr),
      },
      {
        name: "endPublishing",
        key: "endPublishing",
        type: "date",
        label: "End Publishing",
        icon: <FontAwesomeIcon icon={faCalendar} />, // Calendar icon
        col: "md:w-1/2",
        placeholder: "Select end date",
        validation: yup.date().required("End date is required").nullable()
        .transform((curr, orig) => orig === '' ? null : curr),
      },
      {
        name: "price",
        key: "price",
        type: "number",
        label: "Price",
        icon: <FontAwesomeIcon icon={faDollarSign} />, // Dollar Sign icon
        col: "md:w-1/2",
        placeholder: "Enter price",
        validation: yup.number('must be number').transform((value) => (isNaN(value) ? undefined : value)).nullable(),
      },
      {
        name: "unit",
        key: "unit",
        type:'select',
        options: [
          {key:'KG',value:'KG',label:'kilogram'}
        ],
        label: "Unit",
        icon: <FontAwesomeIcon icon={faRuler} />, // Ruler icon
        col: "md:w-1/2",
        placeholder: "Enter unit",
        validation: yup.string(),
      },
    ];
      useEffect(()=>{
        if(getApiEffect.current === false) {

        fetchData('/ShippingAsync/GET', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }).then(data=>setShippingContent(data))
        return () => getApiEffect.current = true
      }
      },[loading])
      
      const handleSubmitShipping = async (method, data) => {
        const url = method === 'post' ? '/ShippingAsync/Add' : '/ShippingAsync/Update';
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
      };
    return(
        <>
        <main className='h-full'>
          {/* <Navbar toggle={sidebarToggle} /> */}
          <div className="p-6">
            <div className="mb-6 bg-white rounded-lg shadow-md p-4">
              <header>
                <h1 className="text-2xl font-semibold mb-2">Shipping Management</h1>
                <p className="text-gray-600 mb-4">
                  Manage shipping information and settings for your products.
                </p>
              </header>
              <WrapedTable
                dataHeader={shippingFields}
                handleSubmitForm={handleSubmitShipping}
                loading={loading}
                setLoading={setLoading}
                data={shippingContent}
                filterFields={filterFields}
              />
            </div>
          </div>
        </main>
      </>
      
    );
}