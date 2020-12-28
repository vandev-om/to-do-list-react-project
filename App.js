import React, { useState, useEffect } from "react";
import List from "./List";
import Notification from "./Notification";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showNotification(true, "notification-danger", "Please enter value");
    } else if (name && edit) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setEdit(false);
      showNotification(true, "notification-success", "Value changed");
    } else {
      showNotification(true, "notification-success", "Item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showNotification = (show = false, type = "", msg = "") => {
    setNotification({ show, type, msg });
  };
  const clearList = () => {
    showNotification(true, "notification-danger", "Empty list");
    setList([]);
  };
  const removeItem = (id) => {
    showNotification(true, "notification-danger", "Item removed");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEdit(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="to-do-form" onSubmit={handleSubmit}>
        {notification.show && (
          <Notification
            {...notification}
            removeAlert={showNotification}
            list={list}
          />
        )}

        <h3>To do list</h3>
        <div className="form-control">
          <input
            type="text"
            className="to-do"
            placeholder="Running errands"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {edit ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="to-do-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
