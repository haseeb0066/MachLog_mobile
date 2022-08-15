export default function CarMarker({ car, onOpen }) {
  const [marker, setMarker] = useState(null);
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: car.Lt || INITIAL_LAT,
      longitude: car.Ln || INITIAL_LONG,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    })
  );

  useEffect(() => {
    animateMarker();
  }, [car]);

  const animateMarker = () => {
    const newCoordinate = {
      latitude: car.Lt,
      longitude: car.Ln,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    if (Platform.OS === "android") {
      if (marker) {
        marker.animateMarkerToCoordinate(newCoordinate, 15000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  return (
    <Marker.Animated
      key={car.DeviceID}
      ref={(marker) => {
        setMarker(marker);
      }}
      coordinate={coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      onPress={onOpen}
    >
      <Animated.View style={styles.markerWrap}>
        <Text style={styles.numberPlate} numberOfLines={1}>
          {car.NumberPlate}
        </Text>
        <Animated.Image source={Car} style={styles.marker} resizeMode="cover" />
      </Animated.View>
    </Marker.Animated>
  );
}
