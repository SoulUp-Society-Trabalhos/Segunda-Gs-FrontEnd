export type DadosGeoJSON = {
  type: string;
  features: {
    geometry: {
      type: string;
      coordinates: any;
    };
  }[];
};