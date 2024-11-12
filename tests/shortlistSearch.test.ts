import { SearchBuyerShortlistController } from '@/controls/ShortlistControllers/SearchBuyerShortlistController'
import { ShortlistEntity } from '@/entities/Shortlist'
import { UsedCarListing } from '@prisma/client'

jest.mock('@/entities/Shortlist')

describe('SearchBuyerShortlistController', () => {
  let mockShortlistEntity: jest.Mocked<ShortlistEntity>
  let controller: SearchBuyerShortlistController

  beforeEach(() => {
    // Create a mock instance of ShortlistEntity
    mockShortlistEntity = {
      searchBuyerShortlistEntity: jest.fn(),
    } as unknown as jest.Mocked<ShortlistEntity>

    // Mock the getInstance method to return the mocked entity
    ;(ShortlistEntity.getInstance as jest.Mock).mockReturnValue(
      mockShortlistEntity,
    )

    // Reset the singleton instance before each test
    ;(SearchBuyerShortlistController as any).instance = undefined

    // Retrieve the singleton instance of the controller
    controller = SearchBuyerShortlistController.getInstance()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return the same instance with getInstance (Singleton Pattern)', () => {
    const instance1 = SearchBuyerShortlistController.getInstance()
    const instance2 = SearchBuyerShortlistController.getInstance()
    expect(instance1).toBe(instance2)
  })

  test('should return an array of UsedCarListing when a match is found', async () => {
    const mockResults: UsedCarListing[] = [
      {
        id: '1',
        title: 'Sample Car',
        agentEmail: 'agent@example.com',
        sellerEmail: 'seller@example.com',
        viewCount: 10,
        shortlistCount: 5,
        mileage: 12000,
        color: 'Red',
        condition: 'Used',
        imgUrl: 'https://example.com/car.jpg',
        manufacturedYear: 2020,
        price: 15000,
        description: 'A sample car description',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    // Mock the searchBuyerShortlistEntity to return mockResults
    mockShortlistEntity.searchBuyerShortlistEntity.mockResolvedValue(
      mockResults,
    )

    const result = await controller.searchBuyerShortlistController('Sample Car')

    expect(result).toEqual(mockResults)
    expect(mockShortlistEntity.searchBuyerShortlistEntity).toHaveBeenCalledWith(
      'Sample Car',
    )
  })

  test('should return null when no match is found', async () => {
    // Mock searchBuyerShortlistEntity to return null
    mockShortlistEntity.searchBuyerShortlistEntity.mockResolvedValue(null)

    const result =
      await controller.searchBuyerShortlistController('Nonexistent Car')

    expect(result).toBeNull()
    expect(mockShortlistEntity.searchBuyerShortlistEntity).toHaveBeenCalledWith(
      'Nonexistent Car',
    )
  })

  test('should call searchBuyerShortlistEntity on ShortlistEntity with the correct title', async () => {
    // Mock to avoid undefined return
    mockShortlistEntity.searchBuyerShortlistEntity.mockResolvedValue([])

    await controller.searchBuyerShortlistController('Sample Car')

    expect(mockShortlistEntity.searchBuyerShortlistEntity).toHaveBeenCalledWith(
      'Sample Car',
    )
  })
})
