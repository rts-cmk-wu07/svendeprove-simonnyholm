const DialogueModal = ({ question, set }) => {
  return (
    <>
      <div className="absolute w-10 h-5 bottom-[100px] left-8">
        <p>Ønsker du at logge ud?</p>
        <div>
          <button onClick={handleLogout}>Ja</button>
          <button onClick={(e) => setLogOutModal(false)}>Nej</button>
        </div>
      </div>
    </>
  );
};

export default DialogueModal;
