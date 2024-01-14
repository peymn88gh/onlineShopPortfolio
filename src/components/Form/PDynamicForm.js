import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAlertContext } from "utils/alertUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import PInput from "components/Input/PInput";
import { Button } from 'flowbite-react';
import axios from "axios";
import Cookies from "js-cookie";

 function PDynamicForm({ t, formFields, setCurrentStep, handleSubmitForm, onSubmitSuccess, setTableLoading, selectedRowData, setSelectedRowData }){
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlertContext();
 
  const schema = yup.object().shape(
    formFields.reduce((schemaObj, field) => {
      schemaObj[field.name] = field.validation || yup.string();
      return schemaObj;
    }, {})
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function giveValuetoFields(data){
    Object.keys(data).forEach((fieldName) => {
        // const field = formFields.find((f) => f.name === fieldName);
        // if(field) {
          setValue(fieldName, data[fieldName]);
        // }
    });
  }

  useEffect(() => {
    if (selectedRowData) {
      giveValuetoFields(selectedRowData)
    }
  }, [selectedRowData]);


  const onSubmit = (data) => {
    console.log(data,'data');
    setLoading(true)
    axios.post(`${process.env.REACT_APP_BASE_URL}/ProductAsync/Add`, data,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get('token')}`
      },   
    }).then((res)=>{
        // resolve(res.statusText);
        setCurrentStep(val=>val+1)
    }).catch((err)=>console.log(err)).finally(()=>setLoading(false))

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 m-3">
      
      <div className="flex flex-wrap -mx-2 " >
        {formFields.map((fieldProp) => (
            <Controller
              name={fieldProp.name}
              control={control}
              render={({ field }) => (
                  <PInput 
                    label={fieldProp.label}
                    name={fieldProp.name}
                    id={fieldProp.id}
                    type={fieldProp.type}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={fieldProp.placeholder}
                    error={errors[field.name]?.message}
                    options={fieldProp.options}
                    />
                )}
            />
        ))}
        <Button type="submit" role="submit" isProcessing={loading} disabled={loading} >
          click me33
        </Button>
        <Button onClick={()=>reset()} type="reset" role="reset" >
          reset
        </Button>
      </div>

    </form>
  );
}

export default PDynamicForm;