import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import TreeItem from "@material-ui/lab/TreeItem";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";

import ItemTransition from "../item-transition";

import { NAME } from "./constants";
import { buttonTheme, treeItemTheme } from "./theme";

const TreeDropdownItem = ({ label, onClick, ...rest }) => {
  const currentTheme = useTheme();
  const treeItemClasses = makeStyles(treeItemTheme({ fade, currentTheme }))();
  const treeButtonClasses = makeStyles(buttonTheme)();

  return (
    <TreeItem
      classes={treeItemClasses}
      label={
        <Button className={treeButtonClasses.treeButton} onClick={onClick}>
          {label}
        </Button>
      }
      {...rest}
      TransitionComponent={ItemTransition}
    />
  );
};

TreeDropdownItem.displayName = NAME;

TreeDropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TreeDropdownItem;
