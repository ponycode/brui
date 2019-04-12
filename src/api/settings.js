
import axios from 'axios'

export async function getSettings ( settings ) {
  const result = await axios.get( '/api/settings', settings )
  return result.data
}

export async function saveSettings ( settings ) {
  const result = await axios.put( '/api/settings', settings )
  return result.data
}

export async function getBeers () {
  const result = await axios.get( '/api/taps/beers' )
  return result.data.beers
}

export async function saveBeer ( beer, tapIndex ) {
  const result = await axios.put( `/api/taps/${tapIndex}/beer`, beer )
  return result.data
}

export async function getTaps () {
  const result = await axios.get( `/api/taps` )
  return result.data
}
