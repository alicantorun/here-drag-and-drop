import React from "react";

interface Props {
  label: string;
}

const AddressItem: React.FunctionComponent<Props> = ({ label }) => (
  <div>{label}</div>
);

export default AddressItem;
