import * as React from "react";
import { createRoot } from "react-dom/client";
import "./style.less";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<App />);