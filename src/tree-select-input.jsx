import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { IconButton, useControlled, useForkRef } from "@mui/material";
import { nativeSelectSelectStyles } from "@mui/material/NativeSelect/NativeSelectInput";
import selectClasses from "@mui/material/Select/selectClasses";
import { styled } from "@mui/material/styles";
import { slotShouldForwardProp } from "@mui/material/styles/styled";
import CloseIcon from "@mui/icons-material/Close";

import TreeDropdown from "./tree-dropdown";
import { getDescription, treeBuilder } from "./utils";
import { INPUT_NAME } from "./constants";
import css from "./styles.css";

const SelectSelect = styled("div", {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      // Win specificity over the input base
      { [`&.${selectClasses.select}`]: styles.select },
      { [`&.${selectClasses.select}`]: styles[ownerState.variant] },
      { [`&.${selectClasses.multiple}`]: styles.multiple }
    ];
  }
})(nativeSelectSelectStyles, {
  // Win specificity over the input base
  [`&.${selectClasses.select}`]: {
    height: "auto", // Resets for multiple select with chips
    minHeight: "1.4375em", // Required for select\text-field height consistency
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
});

const SelectNativeInput = styled("input", {
  shouldForwardProp: prop => slotShouldForwardProp(prop) && prop !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (props, styles) => styles.nativeInput
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});

const TreeSelectInput = forwardRef((props, ref) => {
  const {
    className,
    classes,
    hierarchyField,
    variant,
    disabled,
    id,
    name,
    items,
    itemId,
    itemLabel,
    value: valueProp,
    defaultValue,
    onChange
  } = props;
  const inputRef = useRef(null);
  const displayRef = React.useRef(null);
  const [displayNode, setDisplayNode] = React.useState(null);
  const handleRef = useForkRef(ref, inputRef);
  const [popOverOptions, setPopOverOptions] = useState({});
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: INPUT_NAME
  });

  const open = Boolean(popOverOptions.anchorEl);

  const selectedOption = items.find(item => item[itemId] === value);

  const description = getDescription({
    option: selectedOption,
    itemLabel,
    hierarchyField
  });

  const treeOptions = treeBuilder({ hierarchyField, itemId, items });

  const handlePopoverOpen = event => {
    setPopOverOptions({
      anchorEl: event.currentTarget,
      width: event.currentTarget.getBoundingClientRect().width
    });
  };

  const handlePopoverClose = () => {
    setPopOverOptions({ width: popOverOptions.width });
  };

  const triggerChange = (event, nextValue) => {
    if (onChange) {
      event.persist();
      Object.defineProperty(event, "target", {
        writable: true,
        value: { value: nextValue, name }
      });
      onChange(event);
    }
  };

  const handleChange = event => {
    setValueState(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const onSelected = useCallback(
    (event, nodeId) => {
      setValueState(nodeId);
      triggerChange(event, nodeId);
      handlePopoverClose();
    },
    [onChange]
  );

  const onClear = event => {
    setValueState("");
    triggerChange(event, "");
  };
  const ownerState = {
    ...props,
    variant,
    value,
    open
  };

  const handleDisplayRef = useCallback(node => {
    displayRef.current = node;

    if (node) {
      setDisplayNode(node);
    }
  }, []);

  useImperativeHandle(
    handleRef,
    () => ({
      focus: () => {
        displayNode.focus();
      },
      node: inputRef.current,
      value
    }),
    [value]
  );

  return (
    <>
      <SelectSelect
        role="button"
        ref={handleDisplayRef}
        onFocus={handlePopoverOpen}
        onMouseDown={handlePopoverOpen}
        className={clsx(className, css.treeSelect)}
        ownerState={ownerState}
      >
        {description || (
          <span
            className="notranslate"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: "&#8203;" }}
          />
        )}
      </SelectSelect>
      <SelectNativeInput
        value={value}
        name={name}
        ref={inputRef}
        aria-hidden
        onChange={handleChange}
      />
      <IconButton
        aria-label="clear"
        className={css.clearButton}
        onClick={onClear}
      >
        <CloseIcon />
      </IconButton>
      <TreeDropdown
        selectedOption={selectedOption}
        open={open}
        anchorEl={popOverOptions.anchorEl}
        onClose={handlePopoverClose}
        options={treeOptions}
        width={popOverOptions.width}
        onSelected={onSelected}
        hierarchyField={hierarchyField}
        itemId={itemId}
        itemLabel={itemLabel}
      />
    </>
  );
});

TreeSelectInput.displayName = INPUT_NAME;

TreeSelectInput.defaultProps = {
  defaultValue: "",
  disabled: false,
  hierarchyField: "hierarchy",
  itemId: "id",
  itemLabel: "label",
  items: []
};

TreeSelectInput.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  hierarchyField: PropTypes.string,
  id: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  itemLabel: PropTypes.string,
  items: PropTypes.array,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default TreeSelectInput;
