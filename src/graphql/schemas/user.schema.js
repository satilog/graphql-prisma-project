export default `
    type Query {
        fetchOneUser(userId: Int!): User!
        fetchAllUsers: [User!]!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        createUserAndPost(data: CreateUserAndPostInput!): User!
    }

    type User {
        id: Int!
        firstName: String!
        lastName: String!
        email: String!
        createdAt: Float!
        updatedAt: Float
        comments: [Comment!]!
        posts: [Post!]!
    } 

    input CreateUserInput {
        firstName: String!
        lastName: String!
        email: String!
    }

    input CreateUserAndPostInput {
        firstName: String!
        lastName: String!
        email: String!
        post: CreateUserAndPostPostInput
    }

    input CreateUserAndPostPostInput {
        title: String!
        content: String
        isPublished: Boolean
    }
`