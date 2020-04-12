const { Beer, BeerImage, Op } = require('../models').models;

module.exports = function( app ){
  app.get('/api/beers/recent', _getMostRecentBeers );

  app.put('/api/beers', _putBeerDetails );
  app.get('/api/beers/:beerId', _getBeerDetails );
  app.post('/api/beers/:beerId', _updateBeerDetails );

  app.get('/api/beers/:beerId/image', _getBeerImage );
  app.post('/api/beers/:beerId/image', _updateBeerImage );
  app.delete('/api/beers/:beerId/image', _deleteBeerImage );

  app.get('/api/beers', _getBeers );
};

async function _deleteBeerImage( req, res ){
  const { beerId } = req.params;

  await BeerImage.destroy({
    where: {
      beerId,
    }
  });

  res.send({ success: true });
}

async function _updateBeerImage( req, res ){
  const { beerId } = req.params;
  const { file } = req.files;

  let existingBeerImage = await BeerImage.findByPk( beerId, { attributes: ['beerId', 'contentType'] });
  if( existingBeerImage ){
    res.status(400);
    res.send({ error: 'You must delete the existing image first' })
    return;
  }

  const beerImage = await BeerImage.create({
    beerId,
    contentType: file.mimetype,
    blob: file.data
  });

  console.log( "UPDATED IMAGE", beerImage );
  res.send({ success: true });
}

async function _getBeerImage( req, res ){
  const beerImage = await BeerImage.findByPk( req.params.beerId );
  if( !beerImage || !beerImage.contentType|| !beerImage.blob ){
    res.status(404);
    res.send('image not found');
    return
  }

  res.set( 'Content-Type', beerImage.contentType );
  res.send( beerImage.blob );
}

async function _getBeers( req, res ){
  let searchTerm = req.query.searchTerm;
  searchTerm = `%${searchTerm}%`;

  const where = {};
  if( searchTerm ){
    where[Op.or] = [
      { name: { [Op.like]: searchTerm } },
      { description: { [Op.like]: searchTerm } }
    ]
  }

  const beers =await Beer.findAll({
    where,
    limit: 100
  });

  res.send({ beers })
}

async function _getMostRecentBeers( req, res ){
  const beers = await Beer.findAll({
    order: [['createdAt', 'DESC']],
    limit: 20
  })
  res.send({ beers })
}

async function _getBeerDetails( req, res ){
  let beerDetails = await Beer.findByPk( req.params.beerId, { include: { model: BeerImage, attributes: ['contentType'] } });
  if( !beerDetails ){
    res.status(404);
    res.send({ message: 'beer not found' });
    return;
  }

  beerDetails = beerDetails.toJSON();

  if( beerDetails && beerDetails.BeerImage ){
    beerDetails.imageUrl = `/api/beers/${beerDetails.beerId}/image`;
    beerDetails.deleteImageUrl = `/api/beers/${beerDetails.beerId}/image`;
  }else{
    beerDetails.imageUrl = null;
    beerDetails.addImageUrl = `/api/beers/${beerDetails.beerId}/image`;
  }

  delete beerDetails.BeerImage;

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
