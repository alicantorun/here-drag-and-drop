import styled from "styled-components";

export const MainTitle = styled.p`
  font-size: 2rem;
  text-align: center !important;
  margin-top: 5%;
  color: #4aa1f3;
  font-weight: bold;
`;

export const DropzoneWrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  p {
    color: red;
    text-align: center;
  }
`;

export const DropBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 800px;
  height: 240px;
  border: 4px dashed #4aa1f3;
`;

export const UploadLogo = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  background-size: 100%;
  text-align: center;
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
`;

export const Title = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #4aa1f3;
  font-family: Arial;
  font-size: 20px;
`;

export const MapWrapper = styled.div`
  height: 500px;
`;

export const FileDisplayWrapper = styled.div`
  /* position: fixed; */
  width: 805px;
`;

export const FileStatusBar = styled.div`
  width: 100%;
  vertical-align: top;
  margin-top: 10px;
  margin-bottom: 20px;
  position: relative;
  line-height: 50px;
  height: 50px;

  > div {
    overflow: hidden;
  }
`;

export const FileType = styled.div`
  display: inline-block !important;
  position: absolute;
  font-size: 12px;
  font-weight: 700;
  line-height: 13px;
  margin-top: 25px;
  padding: 0 4px;
  border-radius: 2px;
  box-shadow: 1px 1px 2px #abc;
  color: #fff;
  background: #0080c8;
  text-transform: uppercase;
`;

export const FileTypeLogo = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  background-size: 100%;
  position: absolute;
`;

export const FileName = styled.span<{ isInvalid: boolean }>`
  display: inline-block;
  vertical-align: top;
  margin-left: 50px;
  color: ${({ isInvalid }) => (isInvalid ? "#9aa9bb" : "#4aa1f3")};
`;

export const FileSize = styled.span`
  display: inline-block;
  vertical-align: top;
  color: #30693d;
  margin-left: 10px;
  margin-right: 5px;
  margin-left: 10px;
  color: #444242;
  font-weight: 700;
  font-size: 14px;
`;

export const FileErrorMessage = styled.span`
  color: red;
`;

export const FileRemove = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
  line-height: 15px;
  cursor: pointer;
  color: red;
  margin-right: -10px;
`;

export const UploadButton = styled.button`
  color: white;
  text-transform: uppercase;
  outline: none;
  background-color: #4aa1f3;
  font-weight: bold;
  padding: 8px 15px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  display: none;
`;
