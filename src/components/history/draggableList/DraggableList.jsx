import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import StrictModeDroppable from "./StrictModeDroppable";
import "./DraggableList.css";
import { useHistory } from "../../../HistoryContext";

function DraggableList({ items, onRemoveItem }) {
  const { setCurrentIdVideo, setSimulateClick } = useHistory();

  const [stateItems, updateItems] = useState(items);

  useEffect(() => {
    // Update the items when the 'items' prop changes
    updateItems(items);
  }, [items]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(stateItems);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    // Update the state with the reordered items
    updateItems(updatedItems);
  };

  const handleClick = (id) => {
    setCurrentIdVideo(id);
    localStorage.setItem("currentIdVideo", JSON.stringify(id));
    setSimulateClick(true);
  };

  const handleRemoveItem = (id) => {
    // Filter out the item with the specified id
    const updatedItems = stateItems.filter((item) => item.id !== id);
    // Update the state with the filtered items
    updateItems(updatedItems);
    // Call the parent component's function to maintain consistency
    onRemoveItem(id);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable droppableId="characters">
        {(provided) => (
          <ul
            className="characters"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {stateItems.map(({ id, urlThumbnail }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: snapshot.isDragging ? "#eee" : "white",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <button
                      key={index}
                      className="mt-4 img-container"
                      onClick={() => handleClick(id)}
                    >
                      <img
                        className="w-100"
                        src={urlThumbnail}
                        alt="Thumbnail"
                      />
                    </button>

                    <button
                       className="btn btn-danger btn-sm mt-1"
                      onClick={() => handleRemoveItem(id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}

DraggableList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urlThumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddNewItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default DraggableList;
