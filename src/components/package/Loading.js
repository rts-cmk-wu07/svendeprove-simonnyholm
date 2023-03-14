import ReactLoading from "react-loading";

const LoadingAnimation = ({ type, color }) => (
  <ReactLoading
    type={"cubes"}
    color={"#ff5666"}
    height={200}
    width={200}
    delay={500}
  />
);

export default LoadingAnimation;
