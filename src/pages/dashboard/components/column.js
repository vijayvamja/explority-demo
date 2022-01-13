import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./../style.scss";
import Editor from "./Editor";
const Column = ({ column, index }) => {
  const blocks = useSelector((state) => state.dashboard.cards);

  return (
    <Droppable key={column.id} droppableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column-container"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>
            <div className='title-wrapper'>
              <span className="column-title">{column.title}</span>
            </div>
            <div>
              {column.cardIds.map((blockId, index) => {
                const data = blocks[blockId];
                return (
                  <Draggable key={data.id} draggableId={data.id} index={index}>
                    {(provided) => (
                      <div
                        className="card-container"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Editor
                          block={data.content}
                          key={data.id}
                          id={data.id}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
