const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const schema = buildSchema(`
    type Query {
        quoteOfTheDay: String,
        random: Float!,
        rollThreeDice: [Int]
    }
`);

const root = {
    // these are called resolver functions
    quoteOfTheDay: () => Math.random() < 0.5 ? 'Take it easy' : 'A choice is brief yet unending',
    random: () => Math.random(),
    rollThreeDice: () => [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
};

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at loalhost:4000/graphql');