const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const schema = buildSchema(`
    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    },
    type Query {
        getDie(numSides: Int): RandomDie
    }
`);

class RandomDie {
    constructor (numSides) {
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({numRolls}) {
        const output = [];
        for (let i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}

const root = {
    getDie: function({numSides}) {
        return new RandomDie(numSides || 6);
    }
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