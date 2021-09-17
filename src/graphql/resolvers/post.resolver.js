export default {
    Query: {
        fetchAllPosts: async (parent, args, { prisma, req }, info) => {
            try {
                const posts = await prisma.user.findMany({});
                return posts
            } catch (err) {
                throw err;
            }
        },
        fetchAllPostsByUserId: async (parent, args, { prisma, req }, info) => {
            try {
                const posts = await prisma.user.findMany({});
                return posts
            } catch (err) {
                throw err;
            }
        },
        searchPost: async (parent, args, { prisma, req }, info) => {
            try {
                const { searchQuery } = args;

                // Change this to create post along with user
                const matchingPosts = await prisma.post.findMany({
                    where: {
                        AND: [
                            {
                                OR: [
                                    {
                                        title: { contains: searchQuery }
                                    },
                                    {
                                        content: { contains: searchQuery }
                                    },
                                ]
                            },
                            { isPublished: true }
                        ],
                    }
                });

                return matchingPosts;
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createPost: async (parent, args, { prisma, req }, info) => {
            try {
                const params = args.data;

                // console.log(prisma)
                const existingUser = await prisma.user.findUnique({
                    where: {
                        id: params.userId,
                    },
                });
                if (!existingUser) throw new Error("User not found!");

                // Change this to create post along with user
                const createdPost = await prisma.post.create({
                    data: {
                        postedBy: params.userId,
                        title: params.title,
                        content: params.content,
                        isPublished: params.isPublished,
                        postedAt: new Date(),
                    }
                });

                return createdPost;
            } catch (err) {
                throw err;
            }
        },
    },
    Post: {
        postedBy: async (parent, args, { prisma, req }, info) => {
            try {
                // console.log(prisma)
                const existingUser = await prisma.user.findUnique({
                    where: {
                        id: parent.postedBy,
                    },
                });

                return existingUser;
            } catch (err) {
                throw err;
            }
        },
        comments: async (parent, args, { prisma, req }, info) => {
            try {
                // console.log(prisma)
                const comments = await prisma.post.findUnique({
                    where: {
                        id: parent.id,
                    },
                }).Comment();

                return comments;
            } catch (err) {
                throw err;
            }
        },
    }
};
