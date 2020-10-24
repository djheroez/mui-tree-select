import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { IconButton, useControlled, useForkRef } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import TreeDropdown from "./tree-dropdown";
import { getDescription, treeBuilder } from "./utils";
import { INPUT_NAME } from "./constants";
import { treeSelectTheme } from "./theme";

const TreeSelectInput = forwardRef((props, ref) => {
  const {
    className,
    classes,
    hierarchyField,
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
  const [displayNode, setDisplayNode] = React.useState(null);
  const handleRef = useForkRef(ref, inputRef);
  const css = makeStyles(treeSelectTheme)();
  const [popOverOptions, setPopOverOptions] = useState({});
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: INPUT_NAME
  });

  const open = Boolean(popOverOptions.anchorEl);

  const selectedOption = items.find(item => item.get(itemId) === value);

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
      <div
        id={id}
        ref={setDisplayNode}
        role="button"
        aria-expanded={open ? "true" : undefined}
        tabIndex={0}
        onFocus={handlePopoverOpen}
        onMouseDown={handlePopoverOpen}
        className={clsx(
          classes.root,
          classes.select,
          classes.selectMenu,
          {
            [classes.disabled]: disabled
          },
          className,
          css.treeSelect
        )}
      >
        {description || (
          // eslint-disable-next-line react/no-danger
          <span dangerouslySetInnerHTML={{ __html: "&#8203;" }} />
        )}
      </div>
      <input
        value={value}
        name={name}
        ref={inputRef}
        aria-hidden
        onChange={handleChange}
        className={classes.nativeInput}
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
  items: fromJS([])
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
  items: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default TreeSelectInput;
