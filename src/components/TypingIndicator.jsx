import { motion } from "framer-motion";

const TypingIndicator = () => {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 w-fit"
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
    >
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-kuning"
        variants={dotVariants}
      />
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-kuning"
        variants={dotVariants}
      />
      <motion.div
        className="w-2.5 h-2.5 rounded-full bg-kuning"
        variants={dotVariants}
      />
    </motion.div>
  );
};

export default TypingIndicator;
