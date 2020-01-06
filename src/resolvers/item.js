module.exports = {
    Query: {
      items: async (_, __, { models}) => {
        return await models.Item.findAll({
          order:['id']
        });
      },
    },
    
}
