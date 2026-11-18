import type { FeatureCollection, Polygon, MultiPolygon } from "geojson";

export type DadosGeoJSON = FeatureCollection<Polygon | MultiPolygon>;
