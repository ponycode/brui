const socketMessages = require('./socketMessages');

exports.sendKegStatuses = async function(){
  const { Keg } = require('../models').models;
  const statuses = await Keg.getAllKegStatuses();
  socketMessages.sendKegStatuses( statuses );
};
