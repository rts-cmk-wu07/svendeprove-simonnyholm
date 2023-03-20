import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <>
      <h1>{instructorDetail?.name}</h1>
      <section>
        {instructorDetail &&
          instructorDetail.users.map((item, index) => (
            <p>
              {item.firstname} {item.lastname}
            </p>
          ))}
      </section>
    </>
  );
};

export default InstructorDetails;
