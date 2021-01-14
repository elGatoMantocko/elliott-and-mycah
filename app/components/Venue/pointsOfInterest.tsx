type MapArgs = {
  position: google.maps.ReadonlyLatLngLiteral;
  label: string | JSX.Element;
  description?: string | JSX.Element;
  zoom?: number;
  mapTypeId?: 'satellite' | 'roadmap';
  heading?: number;
};

type PointsOfInterest = {
  [name in Location]: MapArgs;
};

enum Location {
  Home = 'home',
  YachtClub = 'yacht-club',
  HamptonInn = 'hampton-inn',
  PanPacificHotel = 'pan-pacific-hotel',
  SeaTacAirport = 'sea-tac',
}

export const poi: PointsOfInterest = {
  [Location.Home]: {
    position: { lat: 47.487688475492966, lng: -122.3529181906647 },
    zoom: 20.5,
    label: 'Mantock Household',
    description: 'This is where Mycah, Elliott, and Ellie live!',
    mapTypeId: 'satellite',
    heading: 270,
  },
  [Location.YachtClub]: {
    position: { lat: 47.64540544645757, lng: -122.30839522102245 },
    zoom: 17,
    label: 'Seattle Yacht Club',
  },
  [Location.HamptonInn]: {
    position: { lat: 47.62613719101338, lng: -122.34673533018191 },
    zoom: 19,
    label: 'Hampton Inn',
  },
  [Location.PanPacificHotel]: {
    position: { lat: 47.618412587882325, lng: -122.33747379246103 },
    zoom: 18.5,
    label: 'Pan Pacific Hotel',
  },
  [Location.SeaTacAirport]: {
    position: { lat: 47.45111485957373, lng: -122.3067614522024 },
    zoom: 13,
    label: 'SeaTac Airport',
  },
};
