const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Seed the database
// Run `npx prisma migrate reset` to delete all data and replace with below

async function main() {
  // Create user rob
  const rob = await prisma.user.upsert({
    where: { email: 'rob@ghost.io' },
    update: {},
    create: {
      email: 'rob@ghost.io',
      name: 'Rob Hope',
      avatar: '/user-1.jpeg'
    },
  });
  // Create user sophie
  const sophie = await prisma.user.upsert({
    where: { email: 'sophie@ghost.io' },
    update: {},
    create: {
      email: 'sophie@ghost.io',
      name: 'Sophie Brect',
      avatar: '/user-2.jpeg'
    },
  });
  // Create user james
  const james = await prisma.user.upsert({
    where: { email: 'james@ghost.io' },
    update: {},
    create: {
      email: 'james@ghost.io',
      name: 'James',
      avatar: '/user-3.jpeg'
    },
  });
  // Create user cameron
  const cameron = await prisma.user.upsert({
    where: { email: 'rob@ghost.io' },
    update: {},
    create: {
      email: 'cameron@ghost.io',
      name: 'Cameron Lawrence',
      avatar: '/user-4.jpeg'
    },
  });
  // Create post by user rob with comments
  const post = await prisma.post.create({
    data: {
      title: 'The best blog post ever!',
      body: 'Here is some awesome content.',
      comments: {
        create: [
          {
            body: "Jeepers now thats a huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.",
            author: {
              connect: { 
                id: rob.id 
              }
            }
          },
          {
            body: "Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious. :)",
            author: {
              connect: { 
                id: sophie.id 
              }
            }
          },
          {
            body: "Thanks Sophie! Last year has been an absolute goldrush for the creator economy. Slowly at first, then all at once. Will be interesting to see how this ecosystem evolves over the next few years",
            author: {
              connect: { 
                id: james.id 
              }
            }
          },
          {
            body: "Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I'll be recommending then...",
            author: {
              connect: { 
                id: cameron.id 
              }
            }
          }
      ]
      },
      author: {
        connect: {
          id: rob.id
        }
      }
    }
  })
}


// run main() above
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })