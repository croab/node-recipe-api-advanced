const restaurants = () => {
  return ([
    {
      name: "Argentina Restaurant",
      location: {
        description: "Fancy Restaurant in South America",
        type: "Point",
        coordinates: [-51.18246, -70.63713],
        address: "Argentina"
      }
    },
    {
      name: "UK Restaurant",
      location: {
        description: "Fancy Restaurant in the UK",
        type: "Point",
        coordinates: [0.4424679652187016, 51.850398375243216],
        address: "UK"
      }
    },
    {
      name: "Belgian Restaurant",
      location: {
        description: "Fancy Restaurant in Belgium",
        type: "Point",
        coordinates: [4.319496119703087, 50.83869702381516],
        address: "Belgium"
      }
    }
  ]);
};

module.exports = restaurants;