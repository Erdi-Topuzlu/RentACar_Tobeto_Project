import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedLTR = ({ direction, children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView && !isVisible) {
      controls.start("visible");
      setIsVisible(true);
    } else if (!inView && isVisible) {
      controls.start("hidden");
      setIsVisible(false);
    }
  }, [inView, isVisible, controls]);

  const variants = {
    hidden: {
      x: direction === "left" ? "-100%" : "100%",
    },
    visible: { x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedUTD = ({ direction, children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView && !isVisible) {
      controls.start("visible");
      setIsVisible(true);
    } else if (!inView && isVisible) {
      controls.start("hidden");
      setIsVisible(false);
    }
  }, [inView, isVisible, controls]);

  const variants = {
    hidden: {
      y: direction === "up" ? "100%" : "-100%",
    },
    visible: { y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
};

export { AnimatedUTD, AnimatedLTR };
