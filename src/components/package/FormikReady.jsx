import { useFormik, validateYupSchema } from "formik";
import { useState } from "react";

const validate = (values) => {
  const errors = {};

  if (!values.userName) {
    errors.userName = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const FormikForm = () => {
  const [valuepost, setValuepost] = useState(null);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      setValuepost(JSON.stringify(values, null, 2));
      //alert(JSON.stringify(values, null, 2));
    },
  });

  console.log("values", formik.values);
  console.log("valuepost", valuepost);

  return (
    <>
      <form className="pt-11" onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">First Name</label>
        <input
          id="userName"
          name="userName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <div>{formik.errors.userName}</div>
        ) : null}

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormikForm;
