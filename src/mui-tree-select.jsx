import React, { cloneElement, forwardRef } from "react";
import PropTypes from "prop-types";
import { FormControl, Input, InputLabel, useThemeProps } from "@mui/material";

import { NAME } from "./constants";
import TreeSelectInput from "./tree-select-input";

const MuiTreeSelect = forwardRef((inProps, ref) => {
  const props = useThemeProps({ props: inProps, name: "MuiTreeSelect" });
  const { inputProps, inputLabelProps, label, id, value, variant } = props;

  const treeSelect = cloneElement(<Input />, {
    inputComponent: TreeSelectInput,
    inputProps: { ...props, ...inputProps },
    label,
    ref
  });

  const shrink =
    inputLabelProps?.shrink !== undefined
      ? inputLabelProps.shrink
      : Boolean(value);

  return label ? (
    <FormControl variant={variant}>
      <InputLabel htmlFor={id} shrink={shrink}>
        {label}
      </InputLabel>
      {treeSelect}
    </FormControl>
  ) : (
    treeSelect
  );
});

MuiTreeSelect.displayName = NAME;

MuiTreeSelect.propTypes = {
  id: PropTypes.string,
  inputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string
};

export default MuiTreeSelect;
