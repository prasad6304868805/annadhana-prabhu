export type LocationCategory = 'ALL' | 'POOJA' | 'BIKSHA' | 'ALPAHARAM' | 'SEVA';

export interface SevaBatch {
  name: string;
  nameTe: string;
  time: string;
  status: string;
  statusType: 'emerald' | 'amber' | 'indigo';
  descTe: string;
}

export interface PrasadamItem {
  nameEn: string;
  nameTe: string;
  icon: string;
}

export interface DevotionalLocation {
  id: string;
  name: string;
  nameTe: string;
  taglineTe: string;
  category: Exclude<LocationCategory, 'ALL'>;
  categoryBadge: string;
  area: string;
  areaTe: string;
  description: string;
  shloka: string;
  shlokaMeaning: string;
  latitude: number;
  longitude: number;
  mapX: number; // Position in SVG coordinate system (width: 750, height: 950)
  mapY: number;
  cameraFocus: {
    x: number;
    y: number;
    scale: number;
  };
  timings: string;
  status: string;
  statusType: 'emerald' | 'amber' | 'indigo';
  image: any;
  ctaText: string;
  topBadge: string;
  batches: SevaBatch[];
  prasadamMenu: PrasadamItem[];
}
