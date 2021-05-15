import Editor from "@monaco-editor/react";

export default function Test() {
  return (
   <Editor
     width="100%"
     height="90vh"
     theme="vs-dark"
     defaultLanguage="javascript"
     defaultValue="// some comment"
   />
  );
}