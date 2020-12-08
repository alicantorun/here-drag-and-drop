import React, { useState, useEffect, useRef } from "react";
import uploadLogo from "../../../images/upload.png";
import genericLogo from "../../../images/generic.png";
import {
  validateFile,
  fileSize,
  getApi,
  transformData,
} from "../../../services/helpers";
import { CustomFile, CustomFileList } from "../../../services/interfaces";
import {
  Wrapper,
  DropBox,
  UploadLogo,
  Title,
  FileDisplayWrapper,
  FileStatusBar,
  FileType,
  FileTypeLogo,
  FileName,
  FileSize,
  FileErrorMessage,
  FileRemove,
  UploadButton,
  Input,
} from "../styled-components";

import AddressList from "../address-list/";
import Map from "../map";

const DropZone = () => {
  const [selectedFiles, setSelectedFiles] = useState<CustomFile[]>([]);
  const [validFiles, setValidFiles] = useState<CustomFile[]>([]);
  const [parsedFile, setParsedFile] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [unsupportedFiles, setUnsupportedFiles] = useState<any>([]);
  const fileInputRef = useRef<any>();

  const [addresses, setAddresses] = useState<any>([]);

  useEffect(() => {
    let filteredArray = selectedFiles.reduce(
      (file: any, current: CustomFile) => {
        const x = file.find(
          (item: { name: string }) => item.name === current.name
        );

        if (!x) {
          return file.concat([current]);
        } else {
          return file;
        }
      },
      []
    );

    setValidFiles([...filteredArray]);
  }, [selectedFiles, addresses, parsedFile]);

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length) {
      handleFiles(files);
      setAddresses([]);
    }
  };

  const getAddress = async (longitude: string, latitude: string) => {
    return await (await fetch(getApi(longitude, latitude))).json();
  };

  const getAllAddresses = async (parsedFile: any) => {
    return await Promise.all(
      parsedFile.map((file: any) => {
        return getAddress(file.Longitude, file.Latitude);
      })
    );
  };

  const fileType = (fileName: string) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const removeFile = (name: string) => {
    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);

    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);

    setSelectedFiles([...selectedFiles]);

    const unsupportedFileIndex = unsupportedFiles.findIndex(
      (e: any) => e.name === name
    );

    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  const handleFiles = (files: CustomFileList) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setUnsupportedFiles((prevArray: any) => [...prevArray, files[i]]);
      }
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const getParsedFiles = async (files: any) => {
    let results: any = [];

    for (let index = 0; index < files.length; index++) {
      const data = await parseFile(files[index]);
      results.push(...JSON.parse(data as any));
    }

    return results;
  };

  const parseFile = async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (res) => {
        resolve(res.target.result);
      };

      reader.onerror = (err) => reject(err);

      reader.readAsText(file);
    });
  };

  const uploadFiles = async () => {
    setLoading(true);
    try {
      const mapData = await getParsedFiles(validFiles);
      setParsedFile(mapData);
      const addresses = await getAllAddresses(mapData);
      setAddresses(transformData(addresses));
      setLoading(false);
      setSelectedFiles([]);
      setValidFiles([]);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {unsupportedFiles.length === 0 && validFiles.length ? (
        <UploadButton onClick={() => uploadFiles()}>Upload Files</UploadButton>
      ) : null}
      {unsupportedFiles.length ? (
        <p>Please remove all unsupported files.</p>
      ) : null}
      <DropBox
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        onClick={fileInputClicked}
      >
        <Title>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={filesSelected}
          />
          <UploadLogo src={uploadLogo} />
          Drag & Drop files here or click to upload
        </Title>
      </DropBox>
      {!loading && (
        <FileDisplayWrapper>
          {validFiles.map((data, i) => {
            return (
              <FileStatusBar key={i}>
                <div>
                  <FileTypeLogo src={genericLogo} />
                  <FileType>{fileType(data.name)}</FileType>
                  <FileName isInvalid>{data.name}</FileName>
                  <FileSize>({fileSize(data.size)})</FileSize>
                  {data.invalid && (
                    <FileErrorMessage>
                      (File type not permitted)
                    </FileErrorMessage>
                  )}
                </div>
                <FileRemove onClick={() => removeFile(data.name)}>X</FileRemove>
              </FileStatusBar>
            );
          })}
        </FileDisplayWrapper>
      )}
      {loading ? (
        "Loading"
      ) : (
        <>
          <AddressList values={addresses} />
          <Map values={parsedFile} />
        </>
      )}
    </Wrapper>
  );
};
export default DropZone;
