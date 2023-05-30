const thumbnail = (name) => `/VesuvioGo/assets/images/pins/${name}`

export default [
  {
    id: 0,
    lat: "12",
    lng: "40",
    name: "Parco Nazionale del Vesuvio",
    points: "3",
    thumbnail: thumbnail("vesuvio.jpg"),
    isVisited: false
  },{
    id: 1,
    lat: "14",
    lng: "41",
    name: "MAV - Museo Archeologico Virtuale",
    points: "3",
    thumbnail: thumbnail("mav.jpg"),
    isVisited: true
  }
]