
import React, { useMemo } from "react";
import * as yup from "yup";
export default function useSchema(props){
    const {formFields} = props
    const schema = useMemo(
        () => yup.object().shape(
            formFields.reduce((schemaObj, field) => {
              schemaObj[field.name] = field.validation || yup.string();
              return schemaObj;
            }, {}),[formFields]
        )
    
    );
    return { schema }
}
