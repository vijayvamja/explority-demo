import { Button, Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { PlusCircleFilled } from '@ant-design/icons';

import Column from "./components/column";
import { addBlock, updateData } from "../../store/reducer/dashboard";
import "./style.scss";

const { Header, Content } = Layout;

const Dashboard = () => {
  const [columns, columnOrder] = useSelector((state) => [
    state.dashboard.columns,
    state.dashboard.columnOrder,
  ]);
  const dispatch = useDispatch();

  const onDragEnd = (props) => {
    const { draggableId, source, destination } = props;
    if (!destination || !source) return;

    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
        return;
    };

    const from = columns[source.droppableId];
    const to = columns[destination.droppableId];
    if (from === to) {
      const newCardIds = Array.from(from.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...from,
        cardIds: newCardIds,
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };
      dispatch(updateData({ key: "columns", value: newColumns }));
      return;
    }

    // Moving from one list to another
    const fromCardIds = Array.from(from.cardIds);
    fromCardIds.splice(source.index, 1);
    const newFrom = {
      ...from,
      cardIds: fromCardIds,
    };
    const toCardIds = Array.from(to.cardIds);
    toCardIds.splice(destination.index, 0, draggableId);
    const newTo = {
      ...to,
      cardIds: toCardIds,
    };
    const newColumns = {
      ...columns,
      [newFrom.id]: newFrom,
      [newTo.id]: newTo,
    };
    dispatch(updateData({ key: "columns", value: newColumns }));
  };

  return (
    <div className="page">
      <Header>
        <Button type="primary" onClick={() => dispatch(addBlock())} icon={<PlusCircleFilled />} />
      </Header>
      <Content className="content">
        <DragDropContext onDragEnd={onDragEnd}>
          {columnOrder.map((column, index) => (
            <Column column={columns[column]} key={index} index={index} />
          ))}
        </DragDropContext>
      </Content>
    </div>
  );
};

export default Dashboard;
