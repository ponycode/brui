import axios from 'axios'

export async function getMostRecentBeers () {
  const result = await axios.get( '/api/beers/recent' )
  return result.data.beers
}

export async function getBeerDetails ( beerId ) {
  const result = await axios.get( `/api/beers/${beerId}` )
  return result.data.beerDetails
}

export async function updateBeerDetails ( beerDetails ) {
  if( !beerDetails.beerId ) throw new Error('beerId is required');
  const result = await axios.post( `/api/beers/${beerDetails.beerId}`, beerDetails )
  return result.data.beerDetails
}

export async function createNewBeer ( beerDetails ) {
  const result = await axios.put( `/api/beers`, beerDetails )
  return result.data.beerDetails
}

export async function getBeerSearch ( searchTerm ) {
  const result = await axios.get( `/api/beers`, { params: { searchTerm } } )
  return result.data.beers
}

export async function deleteBeerImage ( deleteImageUrl ) {
  const result = await axios.delete( deleteImageUrl )
  return result.data.beers
}

export async function addBeerImage ({ addImageUrl, imageFile }) {
  const formData = new FormData()
  formData.append("file", imageFile )

  const result = await axios({
    method: 'post',
    url: addImageUrl,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return result.data
}
