export default {
    Query: {
        fetchAllUsers: async (parent, args, { prisma, req }, info) => {
            try {
                const users = await prisma.user.findMany({});
                return users
            } catch (err) {
                throw err;
            }
        },
        fetchOneUser: async (parent, args, { prisma, req }, info) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id: args.userId
                    }
                });
                return user
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createUser: async (parent, args, { prisma, req }, info) => {
            try {
                const params = args.data;

                // console.log(prisma)
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: params.email,
                    },
                });
                if (existingUser) throw new Error("Email already exists!");

                // Change this to create post along with user
                const createdUser = await prisma.user.create({
                    data: {
                        firstName: params.firstName,
                        lastName: params.lastName,
                        email: params.email,
                        createdAt: new Date(),
                    }
                });

                return createdUser;
            } catch (err) {
                throw err;
            }
        },
        createUserAndPost: async (parent, args, { prisma, req }, info) => {
            try {
                const params = args.data;

                // console.log(prisma)
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: params.email,
                    },
                });
                if (existingUser) throw new Error("Email already exists!");

                // Change this to create post along with user
                const createdUser = await prisma.user.create({
                    data: {
                        firstName: params.firstName,
                        lastName: params.lastName,
                        email: params.email,
                        createdAt: new Date(),
                        Post: {
                            create: {
                                ...params.post,
                                postedAt: new Date()
                            }
                        }
                    }
                });

                return createdUser;
            } catch (err) {
                throw err;
            }
        },
    },
    User: {
        comments: async (parent, args, { prisma, req }, info) => {
            try {
                // console.log(prisma)
                const comments = await prisma.user.findUnique({
                    where: {
                        id: parent.id,
                    },
                }).Comment();

                return comments;
            } catch (err) {
                throw err;
            }
        },
        posts: async (parent, args, { prisma, req }, info) => {
            try {
                // console.log(prisma)
                const posts = await prisma.user.findUnique({
                    where: {
                        id: parent.id,
                    },
                }).Post();

                return posts;
            } catch (err) {
                throw err;
            }
        },
    }
};
