import React from 'react';
import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import MuiTreeSelect from "mui-tree-select";
import logo from './logo.svg';
import './App.css';

const App = () => {
  const { control, register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  const items = [
    { id: "a", label: "A", hierarchy: "a" },
    { id: "a1", label: "A1", hierarchy: "a.a1" },
    { id: "b", label: "B", hierarchy: "b" },
    { id: "b1", label: "B1", hierarchy: "b.b1" }
  ];

  return (
    <div className="App">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          id="tree"
          name="tree"
          label="Tree Field"
          defaultValue=""
          render={({ name, onBlur, onChange, value }) =>
            <MuiTreeSelect
              id="tree"
              name={name}
              label="Tree"
              value={value}
              onChange={onChange}
              items={items}
            />
        }
        />
        <Controller control={control} as={TextField} id="email" name="email" label="Email" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
