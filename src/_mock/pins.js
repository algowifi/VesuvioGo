const thumbnail = (name) => `/VesuvioGo/assets/images/pins/${name}`

export default [
  {
    id: 0,
    lat: 40.825,
    lng: 14.404,
    name: "Parco Nazionale del Vesuvio",
    points: "3",
    thumbnail: thumbnail("vesuvio.jpg"),
    isVisited: false
  },{
    id: 1,
    lat: 40.8075,
    lng: 14.35,
    name: "MAV - Museo Archeologico Virtuale",
    points: "3",
    thumbnail: thumbnail("mav.jpg"),
    isVisited: true
  }
]