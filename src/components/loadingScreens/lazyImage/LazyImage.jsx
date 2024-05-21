import { useEffect, useRef, useState } from "react";

const LazyImage = (props) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  let callback = (entries, oberver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    });
  };

  useEffect(() => {
    let observer = new IntersectionObserver(callback);

    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      // observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, []);
  return inView ? (
    <img {...props} />
  ) : (
    <div
      ref={ref}
      style={{
        width: "93%",
        height: "200px",
        backgroundColor: "#cccccc",
      }}
    />
  );
};

export default LazyImage;
