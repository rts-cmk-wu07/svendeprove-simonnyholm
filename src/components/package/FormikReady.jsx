import { useFormik, validateYupSchema } from "formik";
import { useState } from "react";

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const FormikForm = () => {
  const [valuepost, setValuepost] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      setValuepost(JSON.stringify(values, null, 2));
      //setStateForCheckbox
      //handleSubmit()
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
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}

        <label htmlFor="">Email Address</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormikForm;

// email
