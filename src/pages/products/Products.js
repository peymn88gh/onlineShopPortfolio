import { faCube, faEnvelope, faFolder, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import ProductTableAdmin from "components/ProductTable/ProductTableAdmin";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { useAlertContext } from "utils/alertUtils";
import * as yup from "yup";
import AddProductDetail from "./add/AddProductDetail";
import { Modal } from 'flowbite-react';
import ReactLoading from 'react-loading';

export default function Products(){
    const [loading , setLoading] = useState(true)
    const [productAdminTableContent, setProductAdminTableContent] = useState([]);
    const [category, setCategory] = useState([]);
    const {showAlert} = useAlertContext();
    const [detailModal, setDetailModal] = useState(false)
    const [detailId, setDetailId] = useState('')
    const [detailLoading, setDetailLoading] = useState(false)
    const [detailValue, setDetailValue] = useState({})
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
          validation: yup.number().required('Category is required')
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
      const handleDelete = useCallback(async (param) => {
        try {
          const deleteResponse = await axios.delete(`${process.env.REACT_APP_BASE_URL}/ProductAsync/${param}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          });
          if (deleteResponse.statusText === 'OK') {
            setLoading(true);
          }
        } catch (err) {
          showAlert('failed', `${err.message}`);
        }
      }, []);
      
      
      async function trimSelectCategory(rawArray) {
        if (rawArray && Array.isArray(rawArray)) {
          return rawArray.map((item) => {
            const intValue = parseInt(item.id, 10); // Convert to integer
            return {
              key: item.id,
              value: isNaN(intValue) ? 0 : intValue, // Handle non-integer values gracefully
              label: item.categoryName,
            };
          });
        }
        return []; // Return an empty array if rawArray is not an array or is falsy
      }
      
      useEffect(()=>{
        if(loading){
    
          axios.get(`${process.env.REACT_APP_BASE_URL}/ProductAsync/Get`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }).then(res=>{
            setProductAdminTableContent(res.data)
          }).catch((err)=>console.log(err.message)).finally(()=>setLoading(false))
        }
      },[loading])
      
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
        if(detailLoading){
          axios.get(`${process.env.REACT_APP_BASE_URL}/ProductDetailAsync/GetById?Id=${detailId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get('token')}`,
            },
          }).then(res=>{
            setDetailValue(res.data)
          }).catch((err)=>console.log(err.message)).finally(()=>{setDetailLoading(false)})
        }
        
      },[detailId, detailLoading])

      
      return (
        <>
        <main className='h-full'>
        
        <div className="p-6">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">Add your Products</h1>
            <p className="text-gray-500 mt-2"></p>
          </header>
        
          <div className="border w-full border-gray-200 bg-white py-4 px-6 mt-6 rounded-md">
            <ProductTableAdmin
              loading={loading}
              setLoading={setLoading}
              dataHeader={productAdminDataHeader}
              data={productAdminTableContent}
              handleDelete={handleDelete}
              handleSubmitForm={handleSubmitProductForm}
              formFields={productAdminFormFields}
              openDetail={setDetailModal}
              setDetailId={setDetailId}
              setDetailLoading={setDetailLoading}
            />
          </div>
          <Modal size={'7xl'} show={detailModal} onClose={() => setDetailModal(false)}>
              <Modal.Header>{detailValue.title}</Modal.Header>
              <Modal.Body>
                {
                  !detailLoading && 
                    <AddProductDetail closeModal={()=>setDetailModal(false)} valueObject={detailValue} productDetailId={detailId}/>
                }
                {
                  detailLoading && 
                    <div className=" min-h-[450px] w-full flex justify-center items-center">
                      <p className="inline p-3 text-accent">fetching </p>
                      <ReactLoading height={50} width={50} color="black" />
                    </div> 
                }
              </Modal.Body>
          </Modal>
        </div>
        </main>
        </>
      );
      
}
// import React, { useContext, useEffect, useState } from 'react';
// import './ProductsLanding.css'
// import { useAuth } from 'context/AuthContext';
// import axios from 'axios';
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import { CartContext, CartDispatchContext } from 'context/CartContext';
// import ProductCard from './ProductCard';
// import Menu from 'components/Menu/LandingMenu';

// function Products() {
  
//   const [products, setProducts] = useState([])
//   const [searchInput, setSearchInput] = useState('');
//   const [filterCriteria, setFilterCriteria] = useState(''); 
//   const dispatch = useContext(CartDispatchContext)
//   const cartContent = useContext(CartContext)
//   // Handle search input change
//   const handleSearchInputChange = (event) => {
//     setSearchInput(event.target.value);
//   };

//   // Handle filter criteria change
//   const handleFilterCriteriaChange = (event) => {
//     setFilterCriteria(event.target.value);
//   };

//   // Filter products based on search input and filter criteria
//   const filteredProducts = products.filter((product) => {
//     const productNameMatches = product.productName.toLowerCase().includes(searchInput.toLowerCase());
//     const filterCriteriaMatches = product.keySearch.toLowerCase().includes(filterCriteria.toLowerCase());

//     // You can customize your filtering logic here
//     return productNameMatches && filterCriteriaMatches;
//   });
  

//   useEffect(() => {
//     axios.post(`${process.env.REACT_APP_BASE_URL}/ProductAsync/GetDataPagedPublished`, {
//       headers: {
//         "Content-Type": "application/json",

//       },
//     }).then(res => {

//       setTimeout(() => {
//         setProducts(res.data);

//       }, 1000);
//     }).catch((err) => console.log(err.message))
//   }, [])

//   return (
//     <div className=" bg-neutral-50 min-h-screen">
//       {/* Menu Bar */}
//       {/* <Menu  
//         siteName={'LeoNetInformatik'} 
//         handleSearchInputChange={handleSearchInputChange} 
//         searchInput={searchInput} 
//       /> */}

//       {/* Header Animation */}
//         {/* <div
//           className='mt-7 text-center backgroundimage'
//         >
//           <h1 className=" z-50 text-white absolute left-72 top-32 text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 pt-10 animate-fade-in-header">
//             Welcome to LeoNetInformatik
//           </h1>
//           <p className=" z-50 text-lg md:text-xl lg:text-2xl text-white absolute  left-72 top-64 mb-8 animate-fade-in-subheader">
//             Discover our amazing products and services
//           </p>
//         </div> */}
//       <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mt-8 text-center">
//           Products
//         </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8 lg:p-12">
      
//         {products.length === 0 ? (
//           // Render skeleton loading placeholders when products are empty
//           Array.from({ length: 8 }).map((_, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg shadow-md">
//               <Skeleton height={200} />
//               <Skeleton height={20} width={150} style={{ marginTop: '10px' }} />
//               <Skeleton height={16} width={200} style={{ marginTop: '6px' }} />
//               <Skeleton height={16} width={120} style={{ marginTop: '6px' }} />
//             </div>
//           ))
//         ) : (
//           // Render actual product data when available
//           filteredProducts.map((product) => (
            
//             <ProductCard
//               product={product}
//               dispatch={dispatch}
//               selected={
//                 cartContent.find((obj)=>obj.id===product.id)
//                 ??
//                 false
//               }
//             />

//           ))
//         )}
//       </div>
     
//     </div>
//   );
// }

// export default Products;
