import { useInView } from "react-intersection-observer";

export const useScrollReveal = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Re-trigger every time
  });

  return { ref, inView };
};
