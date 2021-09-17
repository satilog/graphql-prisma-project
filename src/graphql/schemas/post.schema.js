export default `
    type Query {
        fetchAllPosts: [Post!]!
        fetchAllPostsByUserId(userId: Int!): [Post!]!
        searchPost(searchQuery: String!): [Post!]!
    }

    type Mutation {
        createPost(data: CreatePostInput): Post!
        updatePost(data: UpdatePostInput): Post!
    }

    type Post {
        id: Int!
        title: String!
        content: String
        isPublished: Boolean!
        postedAt: Float!
        updatedAt: Float
        postedBy: User!
        comments: [Comment!]!
    } 

    input UpdatePostInput {
        postId: Int!
        title: String
        content: String
        isPublished: Boolean
    }

    input CreatePostInput {
        userId: Int!
        title: String!
        content: String
        isPublished: Boolean
    }
`