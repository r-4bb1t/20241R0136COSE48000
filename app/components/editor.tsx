import { Editor as MDEditor } from "@toast-ui/react-editor";
import { use, useEffect, useRef, useState } from "react";
import cc from "classcat";

import "@toast-ui/editor/dist/toastui-editor.css";
import "./editor.css";

export default function Editor({
  text,
  onChange,
  disabled,
}: {
  text: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [innerText, setInnerText] = useState(text);
  const editor = useRef<MDEditor>(null);

  useEffect(() => {
    setInnerText(text);
    if (editor.current) {
      const e = editor.current.getInstance();
      e.setMarkdown(text);
      e.moveCursorToStart();
    }
  }, [text]);

  return (
    <MDEditor
      ref={editor}
      previewStyle="tab"
      initialValue={text}
      initialEditType="markdown"
      onChange={() =>
        setInnerText(editor.current?.getInstance().getMarkdown() ?? "")
      }
      onBlur={() => onChange(innerText)}
      usageStatistics={false}
      height="800px"
      editable={!disabled}
    />
  );
}
