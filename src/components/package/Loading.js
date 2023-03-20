import ReactLoading from "react-loading";

const LoadingAnimation = ({ type, color }) => (
  <ReactLoading
    type={"spinningBubbles"}
    color={"#5E2E53"}
    height={200}
    width={200}
    delay={200}
  />
);

export default LoadingAnimation;
