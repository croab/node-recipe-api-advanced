const restaurants = () => {
  return ([
    {
      name: "Argentina Restaurant",
      location: {
        description: "Fancy Restaurant in South America",
        type: "Point",
        coordinates: [-70.63713, -51.18246],
        address: "Argentina"
      }
    },
    {
      name: "UK Restaurant",
      location: {
        description: "Fancy Restaurant in the UK",
        type: "Point",
        coordinates: [51.850398375243216, 0.4424679652187016],
        address: "UK"
      }
    },
    {
      name: "Belgian Restaurant",
      location: {
        description: "Fancy Restaurant in Belgium",
        type: "Point",
        coordinates: [50.83869702381516, 4.319496119703087],
        address: "Belgium"
      }
    }
  ]);
};

module.exports = restaurants;