import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../components/package/Loading";

const InstructorDetails = () => {
  const { id } = useParams();
  const [instructorDetail, setInstructorDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/activities/" + id
        );
        console.log(response);
        if (response.status === 200) {
          setInstructorDetail(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setInstructorDetail, setIsLoading, setError, id]);

  console.log("instructorDetail", instructorDetail);

  return (
    <div className="ml-[10vw] mr-[10vw] h-[100vh]">
      {isLoading && (
        <div className="absolute top-[35vh] flex justify-center w-[80vw] mb-[10px] z-[80]">
          <LoadingAnimation color={"#EAEAEA"} type={"spinningBubbles"} />
        </div>
      )}

      <div className="w-full h-[15px]">
        <h1 className="pt-8 mb-4 text-[24px] w-full text-primaryTextColor bg-primaryPurple">
          {instructorDetail?.name}
        </h1>
      </div>

      <section className="pt-[70px]">
        {instructorDetail &&
          instructorDetail.users.map((item, index) => (
            <p className="text-primaryTextColor text-[18px] pt-2">
              {item.firstname} {item.lastname}
            </p>
          ))}
      </section>
    </div>
  );
};

export default InstructorDetails;
