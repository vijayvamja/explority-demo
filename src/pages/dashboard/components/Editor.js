import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { useDispatch } from "react-redux";
import { setBlock } from "../../../store/reducer/dashboard";

const Editor = ({ id, block }) => {
  const dispatch = useDispatch();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  return (
    <Slate
      editor={editor}
      value={block}
      onChange={(value) => dispatch(setBlock({ value, id }))}
    >
      <Editable placeholder="Add Title" />
    </Slate>
  );
};

export default Editor;
