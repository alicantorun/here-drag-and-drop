export const API_KEY = "68vxsTo-imoxtcR6zQLsjTcyLFJuRCivrEVv6_danTU";

export const validateFile = (file: File) => {
  const validTypes = ["application/json"];
  if (validTypes.indexOf(file.type) === -1) {
    return false;
  }
  return true;
};

export const fileSize = (size: number) => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getApi = (longitude: string, latitude: string) =>
  `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${API_KEY}`;

export const transformData = (data: any[]) =>
  data.reduce<any>(
    (addresses, address) => ({
      ...addresses,
      [address.items[0].id]: address.items[0].address,
    }),
    {}
  );
