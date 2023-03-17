import { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataProvider";
import JoinBtn from "./JoinBtn";
import QuitBtn from "./QuitBtn";

const JoinedOrNot = ({ id, detail }) => {
  const { userData } = useContext(UserDataContext);

  function filterByUserId(item) {
    if (item.id === userData.id) {
      return true;
    }
  }
  const hasJoinedActivity = detail.users.filter(filterByUserId);

  console.log("HasJoinedActivitylength", hasJoinedActivity.length);

  return (
    <div>
      {hasJoinedActivity.length > 0 ? (
        <>
          <QuitBtn id={id} detail={detail} />
        </>
      ) : (
        <>
          <JoinBtn id={id} detail={detail} />
        </>
      )}
    </div>
  );
};

export default JoinedOrNot;
