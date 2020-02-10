import axios from 'axios'

export async function getTaps () {
  const result = await axios.get( `/api/taps` )
  return result.data.taps
}

export async function putKegOnTap ({ tapIndex, beerId, gallons }) {
  const result = await axios.put( `/api/taps/${tapIndex}/keg`, { beerId, gallons })
  return result.data
}

export async function removeKegFromTap ({ tapIndex }) {
  const result = await axios.delete( `/api/taps/${tapIndex}/keg` )
  return result.data
}
