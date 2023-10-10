import { StyleSheet, View, Text, Button } from 'react-native'
import * as Location from 'expo-location'
import Weather from './Weather'
import React, { useState, useEffect } from 'react'

export default function Position() {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [message, setMessage] = useState('Retrieving location...')
  const [isLoading, setIsLoading] = useState(true)

  const getLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync()
      console.log(status)
      try {
        if (status !== 'granted') {
          setMessage('Location not permitted.')
        } else {
          const position = await Location.getCurrentPositionAsync({accruract: Location.Accuracy.High})
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          setMessage('Location retrieved:') 
        }
      } catch (error) {
        setMessage('Error retrieving location.')
        console.log(error)
      }
      setIsLoading(false)
    }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <View>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.coords}>Lat: {latitude.toFixed(3)} Lon: {longitude.toFixed(3)}</Text>
      {isLoading === true &&
        <Button color="black" title="Get location" onPress={getLocation} />
      }
      {isLoading === false &&
        <Weather latitude={latitude} longitude={longitude} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
    coords: {
      color: '#fff',
      backgroundColor: '#000',
      alignSelf: 'center',
      marginBottom: 20
    },
    message: {
      alignSelf: 'center',
    },
});