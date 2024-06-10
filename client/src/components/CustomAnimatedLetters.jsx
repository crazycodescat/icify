/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const CustomAnimatedLetters = ({
  text,
  classes,
  animationValue,
  transition,
  viewport = true,
}) => {
  const words = text.split(" ");
  return (
    <>
      <motion.span
        initial="hidden"
        whileInView="visible"
        transition={transition}
        viewport={{ once: viewport }}
      >
        {words.map((word, i) => {
          return (
            <span key={i} className="inline-block">
              {word.split("").map((letter, i) => {
                return (
                  <motion.span
                    variants={animationValue}
                    key={i}
                    className={classes}
                  >
                    {letter}
                  </motion.span>
                );
              })}
              {words.length - 1 === i ? null : <span>&nbsp;</span>}
            </span>
          );
        })}
      </motion.span>
    </>
  );
};

export default CustomAnimatedLetters;
