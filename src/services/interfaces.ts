export interface CustomFile extends File {
  invalid?: boolean;
}

export interface CustomFileList extends FileList {
  [index: number]: CustomFile;
}
