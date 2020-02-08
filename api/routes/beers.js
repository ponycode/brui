const { Beer } = require('../models').models;

module.exports = function( app ){
  app.get('/api/beers/recent', _getMostRecentBeers );

  app.put('/api/beers', _putBeerDetails );
  app.get('/api/beers/:beerId', _getBeerDetails );
  app.post('/api/beers/:beerId', _updateBeerDetails );
};

async function _getMostRecentBeers( req, res ){
  const beers = await Beer.findAll({
    order: [['createdAt', 'DESC']],
    limit: 20
  })
  res.send({ beers })
}

async function _getBeerDetails( req, res ){
  const beerDetails = await Beer.findByPk( req.params.beerId )
  res.send({ beerDetails })
}

async function _putBeerDetails( req, res ){
  let beerDetails = req.body;
  if( beerDetails.beerId ) res.status(400).send('This beer already has an id');
  if( !beerDetails.name ) res.status(400).send('Beers must have a name');

  beerDetails = await Beer.create( beerDetails );

  res.send({ beerDetails })
}

async function _updateBeerDetails( req, res ){
  const beerDetails = await Beer.findByPk( req.params.beerId );
  if( !beerDetails ) return res.status(404).send('Beer not found');

  if( beerDetails.beerId !== parseInt(req.params.beerId, 10 ) ) return res.status(400).send('Beer id mismatch');

  const beer = req.body;
  if( beer.name ) beerDetails.name = beer.name;
  if( beer.brewerName ) beerDetails.brewerName = beer.brewerName;
  if( beer.imageUrl ) beerDetails.imageUrl = beer.imageUrl;
  if( beer.abv ) beerDetails.abv = beer.abv;
  if( beer.ibu ) beerDetails.ibu = beer.ibu;
  if( beer.description ) beerDetails.description = beer.description;

  const updatedBeer = await beerDetails.save()

  res.send({ beerDetails: updatedBeer })
}
