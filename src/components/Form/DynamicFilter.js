import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "components/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import PrimaryIconButton from "components/Button/PrimaryIconButton";
import SecondaryButton from "components/Button/SecondaryButton";
import { yupResolver } from "@hookform/resolvers/yup";
import useSchema from "./validation";
import { FooterDivider } from "flowbite-react/lib/esm/components/Footer/FooterDivider";

function DynamicFilter({ t, formFields, handleSubmitFilter, setShowForm, showActionButtons=true }) {
  const [loading, setLoading] = useState(false);
  const { schema } = useSchema({formFields})
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    handleSubmitFilter(data)
  }

  function handleReset(e){
    e.preventDefault()
    return reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4">
    <header className="">
        <h2 className=" prose prose-headings ">
            {t('filter')}
        </h2>
    </header>
    <FooterDivider />
      <div className="flex flex-wrap -mx-2 " >
        {formFields && formFields.map((fieldProp) => (
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
          <SecondaryButton onClick={handleReset}
            icon={<FontAwesomeIcon className=" mx-1" icon={faUndo}/>}
            >
              {t('reset')}
            </SecondaryButton>
          <PrimaryIconButton loading={loading} icon={<FontAwesomeIcon icon={faSave} />}>
            {t('filter')}
          </PrimaryIconButton>
          
          {/* {setShowForm && <SecondaryButton onClick={(e) =>{
            // setSelectedRowData(null)
            e.preventDefault()
            setShowForm(false)
          }
            }
            icon={<FontAwesomeIcon className="mx-1" icon={faTimes}/>}
            >{t('cancel')}</SecondaryButton>} */}
        </span>}

      </div>
    </form>
  );
}

export default DynamicFilter;
