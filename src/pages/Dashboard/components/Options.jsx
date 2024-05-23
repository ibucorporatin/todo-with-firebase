import React from "react";

function Options({
  status,
  id,
  updateList,
  filter = false,
  setSelectedFilter,
  selectedFilter,
}) {
  const options = [
    { value: "completed", label: "Completed" },
    { value: "favorite", label: "Favourite" },
    { value: "deleted", label: "Delete" },
  ];

  if (filter) {
    options.unshift({ value: "", label: "Clear" });
  }

  const handleClick = (value) => {
    if (filter) {
      setSelectedFilter(value);
    } else {
      if (status !== value) {
        updateList(id, value);
      }
    }
  };

  return (
    <section
      className="options-container"
      style={{
        top: filter ? "100%" : "25px",
        right: filter ? "15%" : "0",
      }}
    >
      {options.map((option) => (
        <span
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`${
            (filter && selectedFilter === option.value) ||
            (!filter && status === option.value)
              ? "option-selected"
              : ""
          }`}
        >
          {option.label}
        </span>
      ))}
    </section>
  );
}

export default Options;
