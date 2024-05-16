import BootstrapTable from "../components/Table";
import { useAddUserMutation, useGetUsersQuery } from "../services/users";
import CustomModal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  handleCloseModal,
  handleShowModal,
  updateModalData,
} from "../store/features/globalSlice";
import FormField from "../components/FormField";
import { fieldType, formikType, userForm } from "../types/users";

import * as Yup from "yup";
import { Formik, Form, FormikValues } from "formik";
import BasicSpinner from "../components/Spinner";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, isError, isLoading } = useGetUsersQuery();
  const [users, setUsers] = useState(data);
  const { showModal, modalData } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useDispatch();
  const [addUser, { isLoading: addLoading }] = useAddUserMutation();

  useEffect(() => {
    setUsers(data);
  }, [data]);

  let tableCol = [
    { key: "id", value: "Id" },
    { key: "name", value: "Name" },
    { key: "phone", value: "Phone" },
    { key: "email", value: "Email" },
    { key: "address", value: "Address" },
  ];
  const renderObj = (key: Object, value: any) => {
    if (key == "address") {
      return value.street + ", " + value.city;
    }
  };
  const handleEdit = (row: any) => {
    const { address, email, id, name, phone } = row;
    dispatch(
      updateModalData({
        street: address?.street,
        city: address?.city,
        email,
        id,
        name,
        phone,
      })
    );
    dispatch(handleShowModal());
  };
  const handleDelete = (row: any) => {
    const { id } = row;
    const newData = users?.filter((item: userForm) => item.id !== id);
    setUsers(newData);
  };
  const actions = [
    { label: "Edit", onClick: handleEdit },
    { label: "Delete", onClick: handleDelete },
  ];
  let initialValue: userForm = {
    name: modalData ? modalData?.name : "",
    phone: modalData ? modalData?.phone : "",
    email: modalData ? modalData?.email : "",
    city: modalData ? modalData?.city : "",
    street: modalData ? modalData?.street : "",
  };
  let fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "street", label: "Street", type: "text" },
  ];
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
  });
  const handleSubmit = async (data: FormikValues) => {
    const { city, street, ...rest } = data;

    if (modalData) {
      const newData = JSON.parse(JSON.stringify(users));
      let id = modalData.id;
      const updatedData = newData.map((item: userForm) =>
        item.id === id ? { id, address: { city, street }, ...rest } : item
      );

      setUsers(updatedData);
      dispatch(handleCloseModal());
      dispatch(updateModalData(null));
    } else {
      // jsonplaceholder not adding user
      const response = await addUser(data).unwrap();
      console.log("Response :", response);
      // update state manually;
      const newData = JSON.parse(JSON.stringify(users));
      let id = newData ? newData[newData.length - 1].id + 1 : 1;
      newData.push({ id, address: { city, street }, ...rest });
      setUsers(newData);
      dispatch(handleCloseModal());
    }
  };

  if (isLoading)
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  if (isError)
    return (
      <div>
        <p>Something went wrong while fetching the data.</p>
      </div>
    );
  return (
    <div>
      <div className="float-end m-2">
        <button onClick={() => dispatch(handleShowModal())}>
          Add New User
        </button>
      </div>
      <BootstrapTable
        data={users || []}
        columns={tableCol}
        renderObj={renderObj}
        actions={actions}
      />
      {showModal ? (
        <CustomModal
          show={showModal}
          onHide={handleCloseModal()}
          title={modalData ? "Edit User" : "Add User"}
          body={
            <div className="m-2">
              <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
              >
                {({ values, handleChange, handleBlur }: formikType) => (
                  <Form>
                    {fields.map((item: fieldType, i: number) => (
                      <FormField
                        label={item.label}
                        name={item.name}
                        value={values[item.name] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        key={i}
                        type={item.type}
                      />
                    ))}
                    <button
                      className="mt-2"
                      type="submit"
                      disabled={addLoading}
                    >
                      {addLoading ? <BasicSpinner /> : "Submit"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          }
          // footer={<Button onClick={handleCloseModal}>Close</Button>}
        />
      ) : null}
    </div>
  );
}
