const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        cart: async (_, {soldAt}, { models, me }) => {
            return models.Cart.findOne({
                include: [{
                    model: models.ItemInCart,
                    as: 'items'
                }],
                where:{
                    userId:me.id,
                    soldAt:soldAt
                }
            })   
        },

        carts: async (_, __, { models, me }) => {
            return models.Cart.findAll({
                include: [{
                    model: models.ItemInCart,
                    as: 'items'
                }],
                where:{
                    userId:me.id,
                }
            })   
        },
      },

    Mutation: {
        
        addItem: async (_, { itemId, quantity}, { models, me}) => {
            return new Promise((resolve) =>{
                    models.Cart.findOne({
                    include: [{
                        model: models.ItemInCart,
                        as: 'items'
                    }],
                    where:{
                        userId:me.id,
                        soldAt:null
                    }
                }).then( function(cart) {                    
                    if(!cart){
                        cart = models.Cart.create({
                            userId:me.id
                        })                        
                    }
                    models.Item.findByPk(itemId).then( function(item){
                        if(item){
                            if(item.stock>quantity){
                                itemInCart = models.ItemInCart.create({
                                    name:item.name,
                                    image:item.image,
                                    price:item.price,
                                    quantity:quantity,
                                    cartId:cart.id
                                })
                            }else{                                
                                resolve(new UserInputError('Quantidade indisponivel.',))
                            }
                            
                            if(itemInCart){
                                item.update({
                                    stock:item.stock-quantity
                                }).then(function () {
                                    resolve(true)
                                })      
                                
                            }else{
                                // Missing error message
                                resolve(false) 
                            }                            
                        }else{
                            // Missing error message
                            resolve(false)
                        }   
                    })
                                     
                })   
            }) 
       },
    },    
}
