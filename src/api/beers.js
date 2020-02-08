import axios from 'axios'

export async function getMostRecentBeers () {
  const result = await axios.get( '/api/beers/recent' )
  return result.data.beers
}
