import { Button, StyleSheet } from 'react-native'
import { Tabs, Redirect, Stack, router} from 'expo-router'
import { useGlobalContext } from "../../context/GlobalProvider";

const HomeLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/" />;
  return (
    <Stack initialRouteName='home'>
      <Stack.Screen name='home' options={{headerShown: false }}/>
      <Stack.Screen name='profile' options={{ headerShown: false }}/>
      <Stack.Screen name='create-task' options={{ headerShown: false }}/>
      <Stack.Screen name='edit-task' options={{ headerShown: false }}/>
    </Stack>
  )
}

export default HomeLayout

const styles = StyleSheet.create({})