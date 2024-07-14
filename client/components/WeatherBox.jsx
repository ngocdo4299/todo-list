import { View, Text, Image } from "react-native";
import { kelvinToCelsius } from "../services/weatherService";

const WeatherBox = ({ location, containerStyles, data }) => {
  return (
    <View className={containerStyles}>
      <View className="flex space-x-10 items-center flex-row">
        <Image
          source={{ uri: data.icon }}
          className="bg-secondary rounded-full w-20 h-20"
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text className={`text-secondary-100 text-left font-pbold text-3xl`}>
            {kelvinToCelsius(data.temperature)}°C
          </Text>
          <Text className={`text-primary text-left font-psemibold`}>
            {location}
          </Text>
          <Text className={`text-sm text-primary font-pextralight text-left`}>
            {data.main}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherBox;
