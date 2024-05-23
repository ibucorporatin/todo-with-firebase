import React from "react";
import dot from "../../../assets/images/dot.png";
import Options from "./Options";
import useDropdown from "../../../hooks/useDropdown";
function ListItem({ item }) {
  const { ref, isOpen, toggle } = useDropdown();
  const { title, description, status, id, updateList } = item;
  return (
    <div className="list-item-container">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <button className="option-button" ref={ref} onClick={toggle}>
        <img src={dot} alt="dot" />
        {isOpen ? (
          <Options id={id} status={status} updateList={updateList} />
        ) : null}
      </button>
    </div>
  );
}

export default ListItem;
