
import axios from 'axios'

export async function getPourHistory () {
  const result = await axios.get( '/api/pours' )
  return result.data.pours
}

export async function getBeerStats () {
  const result = await axios.get( '/api/beers/recent/stats' )
  return result.data.recentBeers
}

export async function getPoursChartData () {
  const result = await axios.get( '/api/pours/chart' )
  return result.data.poursChart
}
