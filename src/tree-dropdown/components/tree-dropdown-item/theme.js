/* eslint-disable import/prefer-default-export */
export const theme = ({ fade, currentTheme }) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3
    }
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(currentTheme.palette.text.primary, 0.4)}`
  },
  treeItem: {
    textTransform: "none",

    "&:hover": {
      textDecoration: "underline",
      backgroundColor: "transparent"
    }
  }
});
