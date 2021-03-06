export default
{
    "version": "0.1",
    "items": {
        "types": {
            "1": {
                "id": 1,
                "name": "weapon",
                "stackable": false,
                "canSellOrThrow": true
            },
            "2": {
                "id": 2,
                "name": "consumable",
                "stackable": true,
                "stackSize": 32,
                "canSellOrThrow": true
            },
            "3": {
                "id": 3,
                "name": "crafting material",
                "stackable": true,
                "stackSize": 64,
                "canSellOrThrow": true
            },
            "4": {
                "id": 4,
                "name": "quest item",
                "stackable": false,
                "canSellOrThrow": false
            }
        },
        "itemsById": {
            "1": {
                "id": 1,
                "type": 1,
                "name": "Great Axe",
                "damage": 44,
                "requiredStrength": 30,
                "buy": 500,
                "sell": 50,
                "disassembly": [
                    {
                        id: 9,
                        amount: 5
                    },
                    {
                        id: 8,
                        amount: 1
                    }
                ]
            },
            "2": {
                "id": 2,
                "type": 1,
                "name": "Silver sword",
                "damage": 66,
                "requiredStrength": 50,
                "buy": 1000,
                "sell": 100,
                "disassembly": [
                    {
                        id: 9,
                        amount: 10
                    },
                    {
                        id: 8,
                        amount: 2
                    },
                    {
                        id: 13,
                        amount: 1
                    }
                ]
            },
            "3": {
                "id": 3,
                "type": 1,
                "name": "Steel sword",
                "damage": 50,
                "requiredStrength": 45,
                "buy": 666,
                "sell": 66,
                "disassembly": [
                    {
                        id: 9,
                        amount: 20
                    }
                ]
            },
            "4": {
                "id": 4,
                "type": 2,
                "name": "bread",
                "healing": 20,
                "mana": 0,
                "buy": 5,
                "sell": 1
            },
            "5": {
                "id": 5,
                "type": 2,
                "name": "mana potion",
                "healing": 0,
                "mana": 10,
                "buy": 50,
                "sell": 5
            },
            "6": {
                "id": 6,
                "type": 2,
                "name": "magic cheese",
                "healing": 10,
                "mana": 5,
                "buy": 10,
                "sell": 2
            },
            "7": {
                "id": 7,
                "type": 2,
                "name": "potato",
                "healing": 10,
                "mana": 5,
                "buy": 6,
                "sell": 1
            },
            "8": {
                "id": 8,
                "type": 3,
                "name": "wooden planks",
                "buy": 6,
                "sell": 3
            },
            "9": {
                "id": 9,
                "type": 3,
                "name": "spike",
                "buy": 1,
                "sell": 1
            },
            "10": {
                "id": 10,
                "type": 3,
                "name": "paint",
                "buy": 20,
                "sell": 10
            },
            "11": {
                "id": 11,
                "type": 4,
                "buy": 1300,
                "name": "gold crown"
            },
            "12": {
                "id": 12,
                "type": 4,
                "buy": 100,
                "name": "key to home"
            },
            "13": {
                "id": 13,
                "type": 3,
                "name": "silver bar",
                "buy": 100,
                "sell": 51
            }
        }
    },
    "player": {
        "name": "Gerwant",
        "cash": 2000,
        "hp": 50,
        "mana": 60,
        "inventory": {
           "items": {
                "6": {
                    "id": 6,
                    "amount": 5
                },
                "12": {
                    "id": 12,
                    "amount": 1
                },
                "3": {
                    "id": 3,
                    "amount": 4
                },
                "5": {
                    "id": 5,
                    "amount": 3
                },
                "7": {
                    "id": 7,
                    "amount": 11
                },
                "1": {
                    "id": 1,
                    "amount": 2
                },
                "11": {
                    "id": 11,
                    "amount": 1
                },
                "2": {
                    "id": 2,
                    "amount": 1
                },
                "4": {
                    "id": 4,
                    "amount": 25
                }
            }           
        }
    },
    "action": 'vendor-1',
    "vendorsById": {
        "1": {
            "id": 1,
            "name": "Huan",
            "cash": 15,
            "items": {
                "11": {
                    "id": 11,
                    "amount": 1
                },
                "3": {
                    "id": 3,
                    "amount": 3
                },
                "5": {
                    "id": 5,
                    "amount": 50
                },
                "1": {
                    "id": 1,
                    "amount": 2
                },
                "7": {
                    "id": 7,
                    "amount": 200
                },
                "4": {
                    "id": 4,
                    "amount": 100
                },
                "10": {
                    "id": 10,
                    "amount": 3
                }
            }
        }
    }
}