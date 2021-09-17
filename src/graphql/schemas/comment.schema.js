export default `
    type Query {
        allUsers: [User!]!
    }

    type Comment {
        id: Int!
        post: Post
        commenter: User
        content: String!
        commentedAt: Float!
    } 
`