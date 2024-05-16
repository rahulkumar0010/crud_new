import { FormikValues } from "formik";

export type user = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Object;
  phone: string;
  website: string;
  company: Object;
};
export type userForm = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  street: string;
};

export type fieldType = {
  name: string;
  label: string;
  type: string;
};

export type formikType = {
  values: FormikValues;
  handleChange: any;
  handleBlur: any;
};
