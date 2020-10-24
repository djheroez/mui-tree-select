import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import TreeItem from "@material-ui/lab/TreeItem";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";

import ItemTransition from "../item-transition";

import { NAME } from "./constants";
import { theme } from "./theme";

const TreeDropdownItem = ({ label, onClick, ...rest }) => {
  const currentTheme = useTheme();
  const classes = makeStyles(theme({ fade, currentTheme }))();

  return (
    <TreeItem
      classes={classes}
      label={
        <Button className={classes.treeItem} onClick={onClick}>
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
