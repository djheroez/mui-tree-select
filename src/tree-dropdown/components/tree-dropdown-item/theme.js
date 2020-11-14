export const treeItemTheme = ({ fade, currentTheme }) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3
    }
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(currentTheme.palette.text.primary, 0.4)}`
  }
});

export const buttonTheme = {
  treeButton: {
    textTransform: "none",

    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "transparent"
    }
  }
};
