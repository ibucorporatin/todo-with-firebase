import React, { useEffect, useState } from "react";
import logo from "../../assets/images/Group.png";
import Search from "../../assets/images/Vector.png";
import Down from "../../assets/images/Down.png";
import "./dashboard.css";
import ListItem from "./components/ListItem";
import Options from "./components/Options";
import useDropdown from "../../hooks/useDropdown";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config";
import { useNavigate } from "react-router-dom";

const initialData = { title: "", description: "" };
function Dashboard() {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");
  const [loading, setLoading] = useState(true);
  const [addButtonLoading, setAddButtonLoading] = useState(false);
  const { ref, isOpen, toggle } = useDropdown();
  const [data, setData] = useState(initialData);
  const [lists, setLists] = useState([]);
  const [renderList, setrenderList] = useState(lists);

  // to get todo listfrom db
  // useEffect(() => {
  //   if (!uid) {
  //     navigate("/login");
  //   }
  //   const unsubscribe = onSnapshot(
  //     collection(db, "todo", where("uid", "==", uid)),
  //     (snapshot) => {
  //       setLists(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           title: doc.data().title,
  //           description: doc.data().description,
  //           status: doc.data().status,
  //         }))
  //       );
  //       setLoading(false);
  //     },
  //     (error) => {
  //       alert(error.message);
  //       setLoading(false);
  //     }
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    if (!uid) {
      navigate("/login");
      return;
    }

    const q = query(collection(db, "todo"), where("uid", "==", uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setLists(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            status: doc.data().status,
          }))
        );
        setLoading(false);
      },
      (error) => {
        alert(error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // add list
  const onAdd = async () => {
    try {
      if (!data.title) {
        throw new Error("Title is required.");
      }

      setAddButtonLoading(true);

      const docRef = await addDoc(collection(db, "todo"), {
        ...data,
        uid,
        status: "",
      });

      // Update local state with the new todo item
      setLists([{ ...data, id: docRef.id, uid, status: "" }, ...lists]);

      // Reset data state to initial state
      setData(initialData);

      // Set loading state to false
      setAddButtonLoading(false);
    } catch (error) {
      alert(error.message);
      setAddButtonLoading(false);
    }
  };


  const updateList = async (id, newStatus) => {
    try {
      if (!uid) {
        throw new Error("No UID found in localStorage");
      }

      const todoDocRef = doc(db, "todo", id);
      const todoDoc = await getDoc(todoDocRef);

      if (todoDoc.exists() && todoDoc.data().uid === uid) {
        await updateDoc(todoDocRef, { status: newStatus });
        setLists((prevLists) =>
          prevLists.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
      } else {
        throw new Error("Todo item not found or you are not permited.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    setrenderList(lists);
  }, [lists]);

  // search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    let filteredLists = lists;
    if (selectedFilter) {
      filteredLists = lists.filter((item) => {
        return item.status === selectedFilter;
      });
    }
    if (searchQuery) {
      const searchedLists = filteredLists.filter((item) => {
        return (
          searchQuery !== "" &&
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      filteredLists = searchedLists;
    }

    if (selectedFilter == "" && searchQuery == "") {
      setrenderList(lists);
    }

    setrenderList(filteredLists);
  }, [selectedFilter, searchQuery, lists]);

  // search and filter end
  return (
    <div className="max-container padding-container dashboard-container">
      {/* right */}

      <div className="dashboard-left-container">
        <img src={logo} alt="logo" className="login" />
        <div className="dashboard-left-child">
          <h2>TODO</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at
            eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Aliquet at eleifend feugiat
            vitae faucibus nibh dolor dui.
          </p>
          <div className="add-input-contaier ">
            <input
              value={data?.title}
              onChange={(event) => {
                setData({ ...data, title: event.target.value });
              }}
              placeholder="Title"
              type="text"
              name="title"
            />
            <input
              value={data?.description}
              onChange={(event) => {
                setData({ ...data, description: event.target.value });
              }}
              placeholder="Description"
              type="text"
              name="description"
            />

            <button disabled={addButtonLoading} onClick={onAdd}>
              {addButtonLoading ? "Loading..." : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* left */}
      <div className="dashboard-right-container">
        <h2>TODO LIST</h2>
        <div className="search-filter-container">
          <div className="search-container">
            <input
              type="text"
              name="search"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={Search} alt="search" />
          </div>

          <div ref={ref} className="dropdown-container" onClick={toggle}>
            <span>{selectedFilter == "" ? "Filter By" : selectedFilter}</span>
            <button>
              <img src={Down} alt="dropdown" />
            </button>

            {isOpen && (
              <Options
                filter
                setSelectedFilter={setSelectedFilter}
                selectedFilter={selectedFilter}
              />
            )}
          </div>
        </div>

        <div className="dashboard-list-container">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            renderList.map((item) => (
              <ListItem key={item.id} item={{ ...item, updateList }} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
