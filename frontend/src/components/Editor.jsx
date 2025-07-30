import React, { useEffect } from "react";
import  Codemirror from "codemirror";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
  useEffect(() => {
    async function intitalize() {
      Codemirror.fromTextArea(document.getElementById("code"), {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
      });
    }

    intitalize();
  }, []);
  return (
    <textarea
      id="code"
      className="text-white w-full outline-none text-xl"
    ></textarea>
  );
};

export default Editor;
