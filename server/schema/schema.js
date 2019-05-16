const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} = require('graphql');

const { UserType, HealthDataType, HealthAverageType } = require('./types');
const {
  fetchUsers,
  fetchUserById,
  fetchHealthDataByUserId,
  fetchAverageHealthDataGroupByDate,
} = require('../dbCalls');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args) => await fetchUsers(),
    },
    user: {
      type: UserType,
      args: {
        user_id: { type: GraphQLID },
      },
      resolve: async (parent, args) => await fetchUserById(args.user_id),
    },
    userHealthData: {
      type: new GraphQLList(HealthDataType),
      args: {
        user_id: { type: GraphQLID },
      },
      resolve: async (parent, args) =>
        await fetchHealthDataByUserId(args.user_id),
    },
    healthAverageData: {
      type: new GraphQLList(HealthAverageType),
      resolve: async (parent, args) =>
        await fetchAverageHealthDataGroupByDate(),
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
