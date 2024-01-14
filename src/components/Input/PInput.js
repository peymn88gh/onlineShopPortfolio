import React from "react";
import { Label, TextInput, ToggleSwitch, Datepicker, FileInput, Textarea, Select, Checkbox, Radio, RangeSlider } from 'flowbite-react';


function PInput({type, id, label, name, value, onChange, placeholder, error, icon, options}) {
console.log(value,'value of file name');
  const getInput = () => {
    switch (type) {
      case "text":
        return (
            <TextInput
            type="text"
                value={value}
                onChange={onChange}
                id={id}
                placeholder={placeholder}
                color={error ? "failure" : ''}
                helperText={
                    <>
                     {error ?? ''}
                    </>
                }
            />
        
        );
        case "password":
        return (
            <TextInput
                type="password"
                value={value}
                onChange={onChange}
                id={id}
                placeholder={placeholder}
                color={error ? "failure" : ''}
                helperText={
                  <>
                    {error ?? ''}
                  </>
                }
            />
        );
        case "number":
        return (
            <TextInput
            type="text"
                value={value}
                onChange={onChange}
                id={id}
                placeholder={placeholder}
                color={error ? "failure" : ''}
                helperText={
                    <>
                     {error ?? ''}
                    </>
                }
            />
        
        );
        case "toggle":
          return (
            <>
                <ToggleSwitch checked={value}   onChange={onChange} />
                {error && <p className=" text-red-600 text-sm p-1">{error}</p>}        
            </>
          );
      case "file":
        return (
          // <FileInput 
          //   value={value?.name}
          //   onChange={(event)=>onChange(event.target.files[0])}
          //   id={id} 
          //   helperText={
          //     <>
          //       {error ?? ''}
          //     </>
          //   } 
          // />
          <input type="file" value={value?.name} onChange={(e)=>e.target.files[0]}/>
        );
      case "select":
        return (
          <Select 
            value={value}
            onChange={onChange}
            id={id}
            placeholder={placeholder}
            color={error ? "failure" : ''}
            helperText={
                <>
                {error ?? ''}
                </>
            }
          >
            <option value={''}>choose</option>
            {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
            ))}
          </Select>
        );
        case "textarea":
          return(
            <Textarea 
              value={value}
              onChange={onChange}
              id={id}
              placeholder={placeholder}
              color={error ? "failure" : ''}
              helperText={
                  <>
                  {error ?? ''}
                  </>
              } 
              rows={4} 
              cols={50}
            />
          );
        case "date": 
          return (
            <Datepicker value={value ? value.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }):''}
              color={error?'failure':''} 
              placeholder={placeholder} 
              onSelectedDateChanged={onChange} 
              helperText={
                <>
                  {error ?? ''}
                </>
              }
            />
          );
        case "checkbox":
          return (
            <Checkbox id="promotion" />
          );
        case "radio":
          return (
            <>
              {/* <Radio id='sdc' />
              <Radio id='sdse' />
              <Radio id='ee' /> */}
            </>
            
          );
      default:
        return null;
    }
  };
console.log(value,name);
    return (
        <div className="m-2 min-w-[200px]">
            <div className="mb-1 block">
                <Label htmlFor={name} value={label} />
            </div>
            {getInput()}
        </div>
    );
}




export default PInput;
