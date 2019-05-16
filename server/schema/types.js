const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const HealthDataType = new GraphQLObjectType({
  name: 'healthData',
  fields: () => ({
    user_id: { type: GraphQLID },
    date: { type: GraphQLString },
    weight: { type: GraphQLInt },
    alcohol: { type: GraphQLInt },
    calories: { type: GraphQLInt },
    steps: { type: GraphQLInt },
  }),
});

const HealthAverageType = new GraphQLObjectType({
  name: 'healthAverageData',
  fields: () => ({
    date: { type: GraphQLString },
    weight: { type: GraphQLFloat },
    alcohol: { type: GraphQLFloat },
    calories: { type: GraphQLFloat },
    steps: { type: GraphQLFloat },
  }),
});

module.exports = { UserType, HealthDataType, HealthAverageType };
