import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import TreeItem from "@mui/lab/TreeItem";
import { alpha, styled } from "@mui/material/styles";

import ItemTransition from "../item-transition";

import { NAME } from "./constants";
import css from "./styles.css";

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3
    }
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}));
const TreeDropdownItem = ({ label, onClick, ...rest }) => {
  return (
    <StyledTreeItem
      // classes={treeItemClasses}
      label={
        <Button className={css.treeButton} onClick={onClick}>
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
