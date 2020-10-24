import React from "react";
import { fromJS } from "immutable";
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import MuiTreeSelect from "mui-tree-select"
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const formik = useFormik({
    initialValues: { email: "test@test.com", tree: "b1" },
    onSubmit: values => {
      console.log(values);
    }
  });

  const items = fromJS([
    { id: "a", label: "A", hierarchy: "a" },
    { id: "a1", label: "A1", hierarchy: "a.a1" },
    { id: "b", label: "B", hierarchy: "b" },
    { id: "b1", label: "B1", hierarchy: "b.b1" }
  ]);

  return (
     <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
       <MuiTreeSelect
         id="tree"
         name="tree"
         label="Tree"
         items={items}
         onChange={formik.handleChange}
         value={formik.values.tree}
        />
       <button type="submit">Submit</button>
     </form>
   );
}

export default App;
