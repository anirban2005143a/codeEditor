import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ToastContainer, toast } from 'react-toastify';

// Auto complete for languages
import registerCppCompletions from "../../languages/cpp/cpp";
import registerPythonCompletions from "../../languages/python/python";
import registerJavaCompletions from "../../languages/java/java";
import registerCustomSyntax from "../../syntax/syntax";
import registerCCompletions from "../../languages/c/c";
import registerRubyCompletions from "../../languages/Ruby/Ruby";
import registerPhpCompletions from "../../languages/php/php";
import registerShellCompletions from "../../languages/shell/shell";
import registerGoCompletions from "../../languages/go/go";
import registerRustCompletions from "../../languages/rust/rust";
import registerXmlCompletions from "../../languages/xml/xml";
import registerPerlCompletions from "../../languages/perl/perl";
import registerKotlinCompletions from "../../languages/kotlin/kotlin";
import registerSwiftCompletions from "../../languages/swift/swift";
import registerRCompletions from "../../languages/r/r";
import registerDartCompletions from "../../languages/dart/dart";
import registerHaskellCompletions from "../../languages/haskell/haskell";
import registerYamlCompletions from "../../languages/yaml/yaml";
import handelEditorThemes from "../../themes/theme";
import NavigationPanel from "./NavigationPanel";

import { io } from "socket.io-client";

const socketIoServer = io(`${import.meta.env.VITE_REACT_BACKEND_URL}`);

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [addedLinks, setAddedLinks] = useState({});
  const [selectedLink, setSelectedLink] = useState(null);
  const [newlyAddedLink, setnewlyAddedLink] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [alertMessage, setalertMessage] = useState("");
  const [code, setCode] = useState("// Start coding...");
  const [roomID, setroomID] = useState(123);
  const [socket, setSocket] = useState(socketIoServer);
  const [cursors, setCursors] = useState({});

  const mainRef = useRef(null);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  // Keep track of cursor colors for each user

  useEffect(() => {

    if (roomID && socket) {
      console.log(socket.id);
      socket.emit("joinRoom", roomID);

      socket.on("init", ({ code, cursors }) => {
        setCode(code);
        setCursors(cursors);
      });

      socket.on("userJoined", (socketJoin) => {
        console.log("user join " + socketJoin);
      });

      socket.on("errorMessage", (message) => {
        console.log(message);
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

      socket.on("codeChange", (newCode) => setCode(newCode));

      socket.on("cursorMove", ({ id, cursor }) => {
        setCursors((prev) => ({ ...prev, [id]: cursor }));
        updateCursorDecorations();
      });

      socket.on("removeCursor", (id) => {
        setCursors((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
        updateCursorDecorations();
      });

      return () => {
        socket.off("init");
        socket.off("codeChange");
        socket.off("cursorMove");
        socket.off("removeCursor");
      };
    }
  }, [socket, roomID]);


  const handleCodeChange = (value) => {
    setCode(value); // Update the local code state
    socket.emit("codeChange", { roomID, code: value }); // Emit updated code to other users
  };

  const changeLanguage = (monaco) => {
    if (language === "cpp") {
      registerCppCompletions(monaco);
    }
    if (language === "python") {
      registerPythonCompletions(monaco);
    }
    if (language === "java") {
      registerJavaCompletions(monaco);
    }
    if (language === "c") {
      registerCCompletions(monaco);
    }
    if (language === "ruby") {
      registerRubyCompletions(monaco);
    }
    if (language === "php") {
      registerPhpCompletions(monaco);
    }
    if (language === "shell") {
      registerShellCompletions(monaco);
    }
    if (language === "go") {
      registerGoCompletions(monaco);
    }
    if (language === "rust") {
      registerRustCompletions(monaco);
    }
    if (language === "xml") {
      registerXmlCompletions(monaco);
    }
    if (language === "perl") {
      registerPerlCompletions(monaco);
    }
    if (language === "kotlin") {
      registerKotlinCompletions(monaco);
    }
    if (language === "swift") {
      registerSwiftCompletions(monaco);
    }
    if (language === "r") {
      registerRCompletions(monaco);
    }
    if (language === "dart") {
      registerDartCompletions(monaco);
    }
    if (language === "haskell") {
      registerHaskellCompletions(monaco);
    }
    if (language === "yaml") {
      registerYamlCompletions(monaco);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  //add a default file on select a language
  const addDefaultFileOnSelectLanguage = (languageParams) => {
    const getExtensionFromLanguage = (lang) => {
      switch (lang) {
        case "javascript":
          return "js";
        case "typescript":
          return "ts";
        case "python":
          return "py";
        case "java":
          return "java";
        case "c":
          return "c";
        case "cpp":
          return "cpp";
        case "ruby":
          return "rb";
        case "php":
          return "php";
        case "go":
          return "go";
        case "rust":
          return "rs";
        case "kotlin":
          return "kt";
        case "swift":
          return "swift";
        case "r":
          return "r";
        case "perl":
          return "pl";
        case "dart":
          return "dart";
        case "haskell":
          return "hs";
        case "xml":
          return "xml";
        case "yaml":
          return "yaml";
        case "html":
          return "html";
        case "shell":
          return "sh";
        default:
          return "txt";
      }
    };

    if (languageParams !== "") {
      const extension = getExtensionFromLanguage(languageParams);
      const linkName = `demo.${extension}`;

      if (!addedLinks[linkName]) {
        const newLink = {
          name: linkName,
          code: "// Start coding...",
          language: languageParams,
        };

        setAddedLinks((prevAddedLinks) => ({
          ...prevAddedLinks,
          [linkName]: newLink,
        }));
        setnewlyAddedLink(newLink.name);
        setSelectedLink(newLink);
      } else {
        setSelectedLink(addedLinks[linkName]);
      }
    }
  };

  // cursors 
  const handleCursorChange = () => {
    if (!editorRef.current) return;

    const position = editorRef.current.getPosition();
    console.log("Cursor moved:", position); // Debug log

    if (position) {
      socket.emit("cursorMove", { roomID, cursor: position });
    }
  };
  const updateCursorDecorations = () => {
    if (!editorRef.current || !monacoRef.current) return;

    const monaco = monacoRef.current;
    const editor = editorRef.current;

    let decorations = Object.entries(cursors).map(([id, cursor]) => ({
      range: new monaco.Range(cursor.lineNumber, cursor.column, cursor.lineNumber, cursor.column + 1),
      options: {
        className: "remote-cursor",
        isWholeLine: false,
        glyphMarginClassName: "remote-cursor",
        isWholeLine: false,
        afterContentClassName: "cursor-label",
        overviewRuler: {
          color: "red",
          position: monaco.editor.OverviewRulerLane.Right
        }
      }
    }));

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, decorations);
  };


  //handel mount function 
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Initialize language and theme handlers
    handelEditorThemes(monaco);
    changeLanguage(monaco);
    registerCustomSyntax(monaco);

    editor.onDidChangeCursorPosition(() => {
      handleCursorChange();
      updateCursorDecorations();
    });
  };


  useEffect(() => {
    if (selectedLink) {
      setLanguage(selectedLink.language);
    }
  }, [selectedLink]);

  useEffect(() => {
    if (selectedLink) {
      const obj = selectedLink;
      obj.code = code;
      setSelectedLink(obj);
    }
  }, [code]);

  useEffect(() => {
    addDefaultFileOnSelectLanguage(language);
  }, []);

  useEffect(() => {
    if (alertMessage !== "") {
      toast.error(alertMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [alertMessage]);


  return (
    <div
      id="editor"
      className="md:p-4 p-2 "
      style={{
        backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
      }}
    >
      <ToastContainer />
      <h2 className="text-xl font-semibold py-4">AI-Assisted Code Editor</h2>

      <div className="controlers flex gap-2 w-full justify-start px-2 py-4 items-center">
        <button
          onClick={toggleNav}
          className=" cursor-pointer bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          {isNavOpen ? "Close Panel" : "Open Panel"}
        </button>

        <div className="language w-36 ">
          <select
            onChange={(e) => {
              addDefaultFileOnSelectLanguage(e.target.value);
              setLanguage(e.target.value);
            }}
            value={language}
            id="languages"
            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="kotlin">Kotlin</option>
            <option value="swift">Swift</option>
            <option value="r">R</option>
            <option value="perl">Perl</option>
            <option value="dart">Dart</option>
            <option value="haskell">Haskell</option>
            <option value="xml">XML</option>
            <option value="yaml">YAML</option>
            <option value="html">HTML</option>
            <option value="shell">Shell</option>
          </select>
        </div>

        <div className="theme w-36 ">
          <select
            onChange={(e) => {
              setTheme(e.target.value);
            }}
            value={theme}
            id="theme"
            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast Black</option>
            <option value="monokai">Monokai</option>
            <option value="solarized-dark">Solarized Dark</option>
            <option value="nord">Nord</option>
            <option value="dracula">Dracula</option>
            <option value="one-dark">One Dark</option>
            <option value="one-light">One Light</option>
            <option value="material-light">Material Light</option>
            <option value="paper-light">Paper Light</option>
            <option value="solarized-light">Solarized Light</option>
            <option value="github-light">GitHub Light</option>
            <option value="cyberpunk-neon">Cyberpunk Neon</option>
            <option value="forest-night">Forest Night</option>
            <option value="oceanic-blue">Oceanic Blue</option>
            <option value="deep-space">Deep Space</option>
            <option value="sunset-glow">Sunset Glow</option>
          </select>
        </div>
      </div>

      <div className="flex h-[90vh] my-2">
        <NavigationPanel
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
          isNavOpen={isNavOpen}
          addedLinks={addedLinks}
          setAddedLinks={setAddedLinks}
          newlyAddedLink={newlyAddedLink}
          setnewlyAddedLink={setnewlyAddedLink}
        />
        <div
          ref={mainRef}
          className="h-full bg-green-200 transition-all duration-150"
          style={{ width: isNavOpen ? "80%" : "100%" }}
        >
          <div className="h-full">
            <div id="monacoEditor" className="h-full relative">
              <MonacoEditor
                height="100%"
                language={language}
                theme={theme}
                value={code}
                onChange={handleCodeChange}
                onMount={handleEditorDidMount}
                options={{
                  readOnly: selectedLink ? false : true,
                  automaticLayout: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: {
                    other: true,
                    comments: true,
                    strings: true,
                  },
                  minimap: { enabled: true },
                  formatOnType: true,
                  lineNumbers: "on",
                  suggest: { snippetsPreventQuickSuggestions: false },
                  folding: true,
                  foldingHighlight: true,
                  foldingStrategy: "auto",
                  showFoldingControls: "always",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className=" px-2 font-medium ">Input</h2>
      <div id="input" className=" m-1 md:m-2 min-h-[20vh]">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="p-4 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              name="inputArea"
              id="inputArea"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 outline-0 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 min-h-52"
              placeholder="Write Input..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-md font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Execute
            </button>
            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <label htmlFor="textFileInput" className=" cursor-pointer">
                <svg
                  className="w-8 h-8"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
              </label>
              <input
                id="textFileInput"
                type="file"
                accept=".txt"
                className=" hidden justify-center items-center p-2 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              />

            </div>
          </div>
        </div>
      </div>

      <h2 className=" px-2 font-medium ">Output</h2>
      <div
        id="output"
        className=" min-h-32 bg-slate-200 p-4 md:m-2 m-1 mt-0 rounded-lg border-[1px] border-gray-700"
      ></div>
    </div>
  );
};

export default CodeEditor;