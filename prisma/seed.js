// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios')
const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cloudinary = require('cloudinary').v2
const { Role } = require('@prisma/client')


const UNSPLASH_ACCESS_KEY = '1pBBinLyJN3YD8tFiY-a_piaZQbQTGM8sBS38X9h3z8'

async function getCarImages(totalImages) {
  const carImageUrls = []
  const batchSize = 30 // Max images per request with Unsplash

  try {
    while (carImageUrls.length < totalImages) {
      const remaining = totalImages - carImageUrls.length
      const count = remaining < batchSize ? remaining : batchSize

      const response = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: { query: 'car', count, orientation: 'landscape' },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        },
      )

      const newImages = response.data.map((photo) => photo.urls.regular)
      carImageUrls.push(...newImages)
    }
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error)
  }

  return carImageUrls
}

async function uploadToCloudinary(url) {
  try {
    const result = await cloudinary.uploader.upload(url)
    return result.public_id  // Return the public_id instead of secure_url
  } catch (error) {
    console.error(`Error uploading image to Cloudinary: ${error}`)
    return null
  }
}

function generateRandomPhoneNumber() {
  const min = 10000000; // Minimum 8-digit number
  const max = 99999999; // Maximum 8-digit number

  // Generate a random number between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateAccountAndProfileSeeding(role, total) {
  return Array.from({ length: total }, (_, i) => {
    const userEmail = `${role.toLowerCase()}${i + 1}@gmail.com`;
    const password = `${role.toLowerCase()}${i + 1}password`;
    const name = `${role.toLowerCase()}${i + 1}`;
    const address = `This is ${role.toLowerCase()}${i + 1} address`;
    const mobileNumber = generateRandomPhoneNumber().toString();
    
    const account = {
      email: userEmail,
      password: password,
    };

    const profile = {
      userEmail: userEmail,
      name: name,
      address: address,
      mobileNumber: mobileNumber,
      role: role,
    };

    return { account, profile };
  });
}


async function seedUserAccount() {
  const totalSellerToInsert = 100;
  const totalAgentToInsert = 100;
  const totalBuyerToInsert = 100;


  // Generate account and profile data for sellers, agents, and buyers
  const sellers = generateAccountAndProfileSeeding(Role.seller, totalSellerToInsert);
  const agents = generateAccountAndProfileSeeding(Role.agent, totalAgentToInsert);
  const buyers = generateAccountAndProfileSeeding(Role.buyer, totalBuyerToInsert);

  await prisma.user.createMany({ data: sellers.map(s => s.account) });
  console.log(`Seeded ${totalSellerToInsert} seller accounts`)

  await prisma.user.createMany({ data: agents.map(a => a.account) });
  console.log(`Seeded ${totalAgentToInsert} agent accounts`)

  await prisma.user.createMany({ data: buyers.map(b => b.account) });
  console.log(`Seeded ${totalBuyerToInsert} buyer accounts`)

  await prisma.userProfile.createMany({ data: sellers.map(s => s.profile) });
  console.log(`Seeded ${totalSellerToInsert} seller profiles`)

  await prisma.userProfile.createMany({ data: agents.map(a => a.profile) });
  console.log(`Seeded ${totalAgentToInsert} agent profile`)

  await prisma.userProfile.createMany({ data: buyers.map(b => b.profile) });
  console.log(`Seeded ${totalBuyerToInsert} buyer profile`)


}

async function seedCarListing() {
  const totalDataToInsert = 100;
  const carImageUrls = await getCarImages(totalDataToInsert)

  if (carImageUrls.length < totalDataToInsert) {
    console.error('Failed to fetch enough images, seeding aborted.')
    return
  }

  const cloudinaryPublicIds = await Promise.all(
    carImageUrls.map((url) => uploadToCloudinary(url)),
  )

  const carListings = Array.from({ length: totalDataToInsert }, (_, i) => ({
    title: `Car Listing ${i + 1}`,
    agentEmail: `${Role.agent.toLowerCase()}${i + 1}@gmail.com`,
    sellerEmail: `${Role.seller.toLowerCase()}${i + 1}@gmail.com`,
    mileage: Math.floor(Math.random() * 200000),
    color: ['Red', 'Blue', 'Black', 'White', 'Silver'][
      Math.floor(Math.random() * 5)
    ],
    condition: ['New', 'Used', 'Certified'][Math.floor(Math.random() * 3)],
    imgUrl: cloudinaryPublicIds[i], // Store public_id instead of URL
    manufacturedYear: 2000 + Math.floor(Math.random() * 23),
    price: parseFloat((Math.random() * 50000 + 5000).toFixed(2)),
    description: `This is a description for car listing ${i + 1}`,
  }))

  // Insert all listings into the database
  for (const listing of carListings) {
    await prisma.usedCarListing.create({
      data: listing,
    })
  }

  console.log(`\nSeeded ${totalDataToInsert} used car listings with real car images (public_ids)`)
}


// Generate random review data for an agent from randomly selected buyers and sellers
async function createRatingAndReview(agentEmail, totalReviews) {
  const reviewSeeding = Array.from({ length: totalReviews }, (_, i) => {
  
    const buyerEmail = `buyer${Math.floor(Math.random() * 100) + 1}@gmail.com`;
    const sellerEmail = `seller${Math.floor(Math.random() * 100) + 1}@gmail.com`;
   

    // Create a review for the agent from the selected buyer/seller
    return {
      agentEmail,
      userEmail: Math.random() < 0.6 ? buyerEmail : sellerEmail, // Randomly assign either a buyer or seller
      comment: ['Good', 'Bad', 'Too Bad', 'Too Good', 'Average'][Math.floor(Math.random() * 5)],
      rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1, // Random rating between 1 and 5
    };
  });

  // Insert reviews into the database
  try {
    await prisma.agentReview.createMany({
      data: reviewSeeding,
    });
    console.log(`Seeded ${totalReviews} reviews for agent: ${agentEmail}`);
  } catch (error) {
    console.error('Error seeding reviews:', error);
  }
}

// Main function to loop through agents and create reviews for each agent
async function seedReviews() {
  const totalAgents = 100;
  const totalReviewsPerAgent = 5; // Each agent will get 5 reviews (randomly from 3 buyers and 2 sellers)

  // Assuming you already have a list of agent emails (agent1, agent2, ..., agent100)
  const agentEmails = Array.from({ length: totalAgents }, (_, i) => `agent${i + 1}@gmail.com`);

  // Loop through each agent and create reviews
  for (let i = 0; i < agentEmails.length; i++) {
    const agentEmail = agentEmails[i];
    await createRatingAndReview(agentEmail, totalReviewsPerAgent);
  }

  console.log('\nFinished seeding all reviews!');
}




async function main() {
  console.log("\Data Seeding Started !!\n")

  console.log("\nUser Account Seeding Started....\n")
  await seedUserAccount().catch(console.error);
  console.log("\nUsed Car Listing Seeding Started....\n")
  await seedCarListing().catch(console.error);
  console.log("\nReview Seeding Started....\n")
  await seedReviews().catch(console.error);

  console.log("\nAll Seeding Done !!\n")


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
