const CalendarCard = ({ item, index }) => {
  return (
    <>
      <article key={index}>{item.name}</article>
    </>
  );
};

export default CalendarCard;
