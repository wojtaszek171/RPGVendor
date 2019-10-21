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
      cash: player.cash
    },
    vendorNewData: {
      id: vendor.id,
      cash: vendor.cash,
      items: vendor.items
    }
  }
}

export const disassemblyItem = (itemId, disassemblyAmount) => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  const player = db.getData('/player')
  const disassemblyReward = db.getData('/items/itemsById/'+itemId+'/disassembly')
  const playerItemAmount = db.getData('/player/inventory/items/'+itemId+'/amount')
  const newItemAmount = playerItemAmount - disassemblyAmount
  
  disassemblyReward.forEach(reward => {
    const playerHasItem = db.getData('/player/inventory/items')[reward.id] ? true : false

    if (!playerHasItem) {
      db.push('/player/inventory/items/'+ reward.id, { 'id': reward.id, 'amount': reward.amount })
    } else {
      const newAmount = db.getData('/player/inventory/items/'+ reward.id + '/amount') + reward.amount
      db.push('/player/inventory/items/'+ reward.id +'/amount', newAmount )
    }
  });

  if (newItemAmount === 0) {
    db.delete('/player/inventory/items/'+itemId)
  } else {
    db.push('/player/inventory/items/'+itemId+'/amount', newItemAmount)
  }

  return {
    inventory: player.inventory
  }
}

export const useConsumable = (itemId) => {
  var db = new JsonDB(new Config(path, true, false, '/'));
  const player = db.getData('/player')
  const item = db.getData('/items/itemsById/'+itemId)
  const playerItemAmount = db.getData('/player/inventory/items/'+itemId+'/amount')
  
  if (player.hp + item.healing > 100) {
    db.push('/player/hp', 100)
  } else {
    db.push('/player/hp', player.hp + item.healing)
  }

  if (player.mana + item.mana > 100) {
    db.push('/player/mana', 100)
  } else {
    db.push('/player/mana', player.mana + item.mana)
  }

  if (playerItemAmount - 1 === 0) {
    db.delete('/player/inventory/items/'+itemId)
  } else {
    db.push('/player/inventory/items/'+itemId+'/amount', playerItemAmount - 1)
  }

  return {
    hp: player.hp,
    mana: player.mana,
    inventory: player.inventory
  }
}
