import React from "react";

import { Title } from "../styled-components";
import AddressItem from "./components/address-item";

const TEXTS = { ADDRESS_LIST_LABEL: "Address List" };

interface Props {
  values?: any;
}

const InstanceCardList: React.FunctionComponent<Props> = ({ values }) => (
  <>
    {Object.values(values).length ? (
      <>
        <Title>{TEXTS.ADDRESS_LIST_LABEL}</Title>
        {Object.values(values).map((value: any, index: any) => (
          <AddressItem key={index} label={value.label} />
        ))}
      </>
    ) : null}
  </>
);

export default InstanceCardList;
