import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type UserBalance {
    cashBalance: Float!
    coinBalance: Int!
  }

  type BetSlipItem {
    game: String!
    bet: String!
    odds: String!
  }

  type BetsResponse {
    userBalance: UserBalance!
    betSlip: [BetSlipItem!]!
  }

  type Query {
    bets: BetsResponse!
  }
`;

const userBalance = {
  cashBalance: 23937.00,
  coinBalance: 120000000,
};

const betSlip = [
  {
    game: "Warriors vs Bucks",
    bet: "Warriors -3.5",
    odds: "-120"
  },
  {
    game: "Hornets vs Kings",
    bet: "Kings Moneyline",
    odds: "140"
  },
];

const resolvers = {
  Query: {
    bets: () => ({
      userBalance,
      betSlip,
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
