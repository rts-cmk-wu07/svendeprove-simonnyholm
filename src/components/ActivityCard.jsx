import { useNavigate } from "react-router-dom";

const ActivityCard = ({ index, item }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate("/aktivitet/" + item.id)}
      className="h-[80vw] w-[80vw] relative mb-10 rounded-tl-[39px]
      rounded-tr-[39px] rounded-bl-[39px]"
      key={index}
    >
      <img
        className="h-[80vw] w-[80vw] object-cover rounded-tl-[39px] rounded-tr-[39px] rounded-bl-[39px]"
        src={item.asset.url}
        alt={item.name}
        key={index}
      />
      <div
        key={index}
        className="absolute bottom-0 left-0 right-0 h-[96px] rounded-tr-[39px] rounded-bl-[39px] bg-secondaryPurple opacity-75"
      >
        <h2 className="pt-4 pl-6 font-semibold opacity-100 text-[18px]">
          {item.name}
        </h2>
        <p className="pt-2 pl-6 font-semibold opacity-100 text-[18px]">
          {item.minAge}-{item.maxAge} år
        </p>
      </div>
    </article>
  );
};

export default ActivityCard;
