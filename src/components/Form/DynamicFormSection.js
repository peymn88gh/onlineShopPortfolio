import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "components/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import PrimaryIconButton from "components/Button/PrimaryIconButton";
import SecondaryButton from "components/Button/SecondaryButton";
import { useAlertContext } from "utils/alertUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import { FooterDivider } from "flowbite-react/lib/esm/components/Footer/FooterDivider";

function DynamicFormSection({ t, formFields, handleSubmitForm, onSubmitSuccess, setTableLoading, selectedRowData, setSelectedRowData, setShowForm, showActionButtons=true, externalActionButtons }) {
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
    
    // if(selectedRowData){
    //   data.id=selectedRowData.id
    // }
    // showAlert("loading", "loading ...");
    setLoading(true)
    handleSubmitForm(selectedRowData ? "put" : "post", data)
      .then((res) => {
        // showAlert("success", "Completed");
        setLoading(false);
        if(setTableLoading) setTableLoading(true);
        if(setSelectedRowData) setSelectedRowData(null);
        reset();
        if(onSubmitSuccess){
          onSubmitSuccess(data)
        }
      })
      .catch((err) => {
        // showAlert("failed", err.message);
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4">
      <header className="">
        <h2 className=" prose prose-headings ">
            {/* {t('filter')} */}
            Add/Edit
        </h2>
    </header>
    <FooterDivider />
      <div className="flex flex-wrap -mx-2 " >
        {formFields.map((fieldProp) => (
          <div key={fieldProp.name} className={`w-full ${fieldProp.col} px-2`}>
            <Controller
              name={fieldProp.name}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type={fieldProp.type}
                  label={fieldProp.label}
                  name={fieldProp.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={fieldProp.placeholder}
                  error={errors[field.name]?.message}
                  icon={fieldProp.icon}
                  options={fieldProp.options}
                  addedClass={fieldProp.addedClass}
                />
              )}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        
        {showActionButtons && <span className="flex flex-row gap-2">
          <SecondaryButton onClick={(e) =>{
            e.preventDefault()
            selectedRowData ? giveValuetoFields(selectedRowData) :  reset()
          }
            }
            icon={<FontAwesomeIcon className=" mx-1" icon={faUndo}/>}
            >
              Reset
            </SecondaryButton>
          <PrimaryIconButton loading={loading} icon={<FontAwesomeIcon icon={faSave} />}>
          {selectedRowData? 'Edit' : 'Save'}
          </PrimaryIconButton>
          
          {setShowForm && <SecondaryButton onClick={() =>{
            setSelectedRowData(null)
            setShowForm(false)
          }
            }
            icon={<FontAwesomeIcon className="mx-1" icon={faTimes}/>}
            >Cancel</SecondaryButton>}
        </span>}
        {externalActionButtons}
      </div>
    </form>
  );
}

export default DynamicFormSection;
