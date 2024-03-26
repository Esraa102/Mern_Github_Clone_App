const SortRepos = ({ onSort, sortType }) => {
  const BUTTONS = [
    { type: "recent", btnText: "Most Recent" },
    { type: "mostStars", btnText: "Most Stars" },
    { type: "mostForks", btnText: "Most Forks" },
  ];
  return (
    <div className="flex gap-4 flex-wrap justify-center  md:justify-end my-8 w-full md:w-[90%]">
      {BUTTONS.map((btn) => (
        <button
          key={btn.type}
          type="button"
          className={`repo-btn ${
            sortType === btn.type && "border-2 border-main"
          }`}
          onClick={() => onSort(btn.type)}
        >
          {btn.btnText}
        </button>
      ))}
    </div>
  );
};

export default SortRepos;
