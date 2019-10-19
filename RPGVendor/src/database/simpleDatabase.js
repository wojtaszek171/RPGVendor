import database from './database'

const { Config } = window.require('node-json-db/dist/lib/JsonDBConfig')
const { JsonDB } = window.require('node-json-db')

const path = 'database.json'
const fs = window.require('fs');

export const createDatabase = () => {
  try {    
    if (!fs.existsSync(path)) {
      fs.writeFile('database.json', JSON.stringify(database) ,(err)=>{
          if(err) {
              errorHandler(err);
              return;
          }
          successHandler();
      });
      
      function errorHandler() {
      }
      
      function successHandler() {
      }
    }
  } catch(err) {
    console.error(err)
  }
}

export const getPlayer = () => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  return db.getData('/player')
}

export const getVendors = () => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  return db.getData('/vendorsById')
}

export const getGameItems = () => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  return db.getData('/items')
}

export const getAction = () => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  return db.getData('/action')
}

export const substractPlayerMoney = (money) => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  let player = db.getData('/player')
  player.cash -= money;
  db.push('/player', player);
  return {
    cash: player.cash
  }
}

export const addPlayerMoney = (money) => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  let player = db.getData('player')
  player.cash += money;
  db.push('/player', player);
  return {
    cash: player.cash
  }
}

export const sellItem = (itemId, vendorId, sellAmount) => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  const player = db.getData('/player')
  const vendor = db.getData('/vendorsById/'+vendorId)
  const itemSellValue = db.getData('/items').itemsById[itemId].sell

  const vendorHasItem = db.getData('/vendorsById/'+vendorId+'/items')[itemId] ? true : false
  
  if (!vendorHasItem) {
    db.push('/vendorsById/'+vendorId+'/items/'+itemId, { 'id': itemId, 'amount': 0 })
  }

  const playerItemAmount = db.getData('/player/inventory/items/'+itemId+'/amount')

  const vendorItemAmount = db.getData('/vendorsById/'+vendorId+'/items/'+itemId+'/amount')

  const newPlayerAmount = playerItemAmount - sellAmount
  const newVendorAmount = vendorItemAmount + sellAmount

  const newPlayerCash = player.cash + sellAmount*itemSellValue
  const newVendorCash = vendor.cash - sellAmount*itemSellValue

  if (newPlayerAmount === 0) {
    db.delete('/player/inventory/items/'+itemId)
  } else {
    db.push('/player/inventory/items/'+itemId+'/amount', newPlayerAmount)
  }
  db.push('/player/cash', newPlayerCash)


  db.push('/vendorsById/'+vendorId+'/cash', newVendorCash)
  db.push('/vendorsById/'+vendorId+'/items/'+itemId+'/amount', newVendorAmount)

  return {
    playerNewData: {
      inventory: player.inventory,
      cash: newPlayerCash
    },
    vendorNewData: {
      id: vendorId,
      cash: newVendorCash,
      items: vendor.items
    }
  }
}
