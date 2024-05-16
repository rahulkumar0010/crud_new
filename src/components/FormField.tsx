import React from "react";
import { Field, ErrorMessage } from "formik";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  value: any;
  onChange: any;
  onBlur: any;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  value,
  label,
  type = "text",
  onChange,
  onBlur,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ErrorMessage name={name} component="p" className="text-danger" />
    </div>
  );
};

export default FormField;
