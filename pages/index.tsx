import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '@material-ui/core/Container';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

export default function Home() {
  const [value, setValue] = useState(null);
  const [geo, setGeo] = useState(null)
  const [result, setResult] = useState(null)
  const apiKey= "AIzaSyD7f9HrpnKQ0vcnkBcaC_RcspwIE4C5G6c"
  useEffect(() => {
    console.log(value)
    if(value) {
      geocodeByPlaceId(value!.value.place_id)
      .then(data => setGeo(data))
    }
  }, [value])
  useEffect(() => {
    if(geo){
      console.log(geo, geo[0].geometry.location.lat())
      axios.get('http://localhost:8000/?lat=' + geo[0].geometry.location.lat() + '&lon=' + geo[0].geometry.location.lng() )
        .then(setResult)
    }
  }, [geo])
  return (
    <div>
      <Container maxWidth="sm">
        <GooglePlacesAutocomplete 
          apiKey={apiKey}
          selectProps={{
            value,
            onChange: setValue,
          }}
           />
        <div>
          {result !== null && <div>
            {JSON.stringify(result)}
            </div>}
        </div>
      </Container>
    </div>
  )
}
