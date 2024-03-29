/* eslint-disable react/display-name, react/no-multi-comp */
import React, { useState } from "react";
import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import { Popover } from "@mui/material";
import isEmpty from "lodash/isEmpty";

import { getDescription } from "../utils";

import {
  CloseSquare,
  MinusSquare,
  PlusSquare,
  TreeDropdownItem
} from "./components";
import { NAME } from "./constants";
import css from "./styles.css";

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
  const current =
    selectedOption && selectedOption[hierarchyField]
      ? selectedOption[hierarchyField].split(".")
      : [];

  const [expanded, setExpanded] = useState(current);
  const [selected, setSelected] = useState(current);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const renderItem = item => {
    const id = item[itemId];
    const label = getDescription({
      option: item,
      itemLabel,
      hierarchyField
    });

    const renderItems = !isEmpty(item.children)
      ? (item.children || []).map(child => renderItem(child))
      : null;

    return (
      <TreeDropdownItem
        key={id}
        nodeId={id}
        label={label}
        onClick={event => onSelected(event, id)}
      >
        {renderItems}
      </TreeDropdownItem>
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
      className={css.selectPopOver}
    >
      <TreeView
        className={css.root}
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
  options: []
};

TreeDropdown.propTypes = {
  anchorEl: PropTypes.object,
  hierarchyField: PropTypes.string,
  itemId: PropTypes.string,
  itemLabel: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSelected: PropTypes.func.isRequired,
  open: PropTypes.bool,
  options: PropTypes.array,
  selectedOption: PropTypes.object,
  width: PropTypes.number
};

export default TreeDropdown;
