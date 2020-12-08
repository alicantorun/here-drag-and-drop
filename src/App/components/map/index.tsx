import * as React from "react";

import { MapWrapper, Title } from "../styled-components";
import PinLogo from "../../../images/pin.svg";
import { API_KEY } from "../../../services/helpers";

declare global {
  interface Window {
    H: any;
  }
}

interface Props {
  values?: any;
}

const TEXTS = { ADDRESS_LIST_LABEL: "Map" };

export const Map: React.FunctionComponent<Props> = ({ values }) => {
  const mapRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 52.52, lng: 13.405 },
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1,
    });

    new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    H.ui.UI.createDefault(hMap, defaultLayers);

    const icon = new H.map.Icon(PinLogo);

    const coords = values;

    const getMarkers = () => {
      for (let index = 0; index < coords.length; index++) {
        const element = coords[index];

        const marker = new H.map.Marker(
          { lat: element.Latitude, lng: element.Longitude },
          { icon: icon }
        );

        hMap.addObject(marker);
      }
    };

    getMarkers();

    return () => {
      hMap.dispose();
    };
  }, [mapRef, values]);

  return (
    <>
      {Object.values(values).length ? (
        <>
          <Title>{TEXTS.ADDRESS_LIST_LABEL}</Title>
          <MapWrapper ref={mapRef} />
        </>
      ) : null}
    </>
  );
};

export default Map;
