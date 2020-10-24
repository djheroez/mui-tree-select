/* eslint-disable react/display-name, react/no-multi-comp */
import React, { memo } from "react";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import { Popover } from "@material-ui/core";
import isEqual from "lodash";

import { getDescription } from "../utils";

import {
  CloseSquare,
  MinusSquare,
  PlusSquare,
  TreeDropdownItem
} from "./components";
import { NAME } from "./constants";
import { theme } from "./theme";

const TreeDropdown = ({
  anchorEl,
  hierarchyField,
  itemId,
  itemLabel,
  onClose,
  onSelected,
  open,
  options,
  selectedOption,
  width
}) => {
  const classes = makeStyles(theme(width))();

  const [expanded, setExpanded] = React.useState(
    selectedOption?.get(hierarchyField, "").split(".")
  );
  const [selected, setSelected] = React.useState(
    selectedOption?.get(hierarchyField, "").split(".")
  );

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const renderItem = item => {
    const id = item.get(itemId);
    const label = getDescription({
      option: item,
      itemLabel,
      hierarchyField
    });

    if (item.get("children")?.size) {
      return (
        <TreeDropdownItem
          key={id}
          nodeId={id}
          label={label}
          onClick={event => onSelected(event, id)}
        >
          {item.get("children", fromJS([])).map(child => renderItem(child))}
        </TreeDropdownItem>
      );
    }

    return (
      <TreeDropdownItem
        key={id}
        nodeId={id}
        label={label}
        onClick={event => onSelected(event, id)}
      />
    );
  };

  const renderOptions = () => options.map(option => renderItem(option));

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      disableRestoreFocus
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
      className={classes.selectPopOver}
    >
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {renderOptions()}
      </TreeView>
    </Popover>
  );
};

TreeDropdown.displayName = NAME;

TreeDropdown.defaultProps = {
  hierarchyField: "hierarchy",
  itemId: "id",
  itemLabel: "label",
  open: false,
  options: fromJS([])
};

TreeDropdown.propTypes = {
  anchorEl: PropTypes.object,
  hierarchyField: PropTypes.string,
  itemId: PropTypes.string,
  itemLabel: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  open: PropTypes.bool,
  options: PropTypes.object,
  selectedOption: PropTypes.object,
  width: PropTypes.number
};

export default memo(TreeDropdown, (prev, next) => {
  return (
    isEqual(prev.anchorEl, next.anchorEl) &&
    prev.hierarchyField === next.hierarchyField &&
    prev.itemId === next.itemId &&
    prev.itemLabel === next.itemLabel &&
    prev.options.equals(next.options) &&
    prev.selectedOption === next.selectedOption &&
    prev.open === next.open &&
    isEqual(prev.selectedOption, next.selectedOption) &&
    prev.width === next.width
  );
});
