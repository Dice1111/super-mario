// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios')
const prisma = new PrismaClient()

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

async function main() {
  // Fetch 100 car images
  const carImageUrls = await getCarImages(100)

  if (carImageUrls.length < 100) {
    console.error('Failed to fetch enough images, seeding aborted.')
    return
  }

  const carListings = Array.from({ length: 100 }, (_, i) => ({
    title: `Car Listing ${i + 1}`,
    agentEmail: 'agent@gmail.com',
    sellerEmail: 'seller@gmail.com',
    viewCount: Math.floor(Math.random() * 1000),
    shortlistCount: Math.floor(Math.random() * 100),
    mileage: Math.floor(Math.random() * 200000),
    color: ['Red', 'Blue', 'Black', 'White', 'Silver'][
      Math.floor(Math.random() * 5)
    ],
    condition: ['New', 'Used', 'Certified'][Math.floor(Math.random() * 3)],
    imgUrl: carImageUrls[i],
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

  console.log('Seeded 100 used car listings with real car images')
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
