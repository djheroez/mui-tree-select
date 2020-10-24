/* eslint-disable import/prefer-default-export */
export const theme = width => ({
  root: {
    height: 264,
    flexGrow: 1,
    minWidth: "200px",
    maxWidth: width > 200 ? `${width}px` : "200px"
  },
  selectPopOver: {
    "& ul": {
      padding: "10px"
    }
  }
});
