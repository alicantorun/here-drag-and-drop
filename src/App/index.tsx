import React from "react";

import DropZone from "./components/dropzone";
import {
  MainTitle,
  DropzoneWrapper,
} from "../App/components/styled-components";

function App() {
  return (
    <div>
      <MainTitle>Here Drag & Drop</MainTitle>
      <DropzoneWrapper>
        <DropZone />
      </DropzoneWrapper>
    </div>
  );
}

export default App;
