const data = [
  {
    _id: "664126dcebb0a1a34ea54ba3",
    originalURL: "https://www.youtube.com/watch?v=ASs37eBeiJI",
    __v: 4,
    clicks: [
      {
        time: "2024-05-12T18:30:00.000Z",
        location: "Bhopal IN",
        devices: {
          osName: "Linux",
          browserName: "Brave",
          deviceType: "Desktop",
        },
      },
      {
        time: "2024-05-12T18:30:00.000Z",
        location: "Bhopal IN",
        devices: {
          osName: "Linux",
          browserName: "Chrome",
          deviceType: "Desktop",
        },
      },
      {
        time: "2024-05-12T18:30:00.000Z",
        location: "Raipur CN",
        devices: {
          osName: "Macbook",
          browserName: "Brave",
          deviceType: "Desktop",
        },
      },
    ],
    createdAt: "2024-05-12T20:30:20.772Z",
    shortURL: "http://localhost:3000/s/rd9l3eg6",
    updatedAt: "2024-05-12T20:30:54.561Z",
    userId: "user_2fIb3u00KiTfqc6tTJ3448ASLC6",
  },
];
const clicksAnalytics = {
  devices: {
    osName: {},
    browserName: {},
    deviceType: {},
  },
  location: {
    country: {},
    city: {},
  },
};
data.map((linkItem) => {
  linkItem.clicks.map(({ devices, location }) => {
    // for locations
    const [city, country] = location.split(" ");
    if (city in clicksAnalytics.location.city) {
      clicksAnalytics.location.city[location] += 1;
    } else {
      clicksAnalytics.location.city[location] = 1;
    }
    if (country in clicksAnalytics.location.country) {
      clicksAnalytics.location.country[location] += 1;
    } else {
      clicksAnalytics.location.country[location] = 1;
    }
    // for devices
    Object.entries(devices).map(([key, value]) => {
      if (key === "_id") return;
      if (value in clicksAnalytics.devices[key]) {
        clicksAnalytics.devices[key][value] += 1;
      } else {
        clicksAnalytics.devices[key][value] = 1;
      }
    });
  });
});
console.log(clicksAnalytics);
