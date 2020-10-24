import React from "react";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
// web.cjs is required for IE 11 support
import { useSpring, animated } from "@react-spring/web";

import { NAME } from "./constants";

const ItemTransition = props => {
  const { in: propIn } = props;
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: propIn ? 1 : 0,
      transform: `translate3d(${propIn ? 0 : 20}px,0,0)`
    }
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
};

ItemTransition.displayName = NAME;

ItemTransition.propTypes = {
  // Show the component; triggers the enter or exit states
  in: PropTypes.bool
};

export default ItemTransition;
