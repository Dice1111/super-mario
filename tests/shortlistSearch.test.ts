import { SearchBuyerShortlistController } from "@/controls/ShortlistControllers/SearchBuyerShortlistController";
import { HandleShortlistController } from "@/controls/ShortlistControllers/HandleShortlistController";
import { ShortlistEntity } from "@/entities/Shortlist";
import { UsedCarListing } from "@prisma/client";

jest.mock("@/entities/Shortlist");

describe("SearchBuyerShortlistController and HandleShortlistController", () => {
  let mockShortlistEntity: jest.Mocked<ShortlistEntity>;
  let searchController: SearchBuyerShortlistController;
  let shortlistController: HandleShortlistController;

  beforeEach(() => {
    // Create a mock instance of ShortlistEntity
    mockShortlistEntity = {
      searchBuyerShortlistEntity: jest.fn(),
      handleShortlistEntity: jest.fn(),
    } as unknown as jest.Mocked<ShortlistEntity>;

    // Mock the getInstance method to return the mocked entity
    (ShortlistEntity.getInstance as jest.Mock).mockReturnValue(
      mockShortlistEntity
    );

    // Reset singleton instance before each test
    (SearchBuyerShortlistController as any).instance = undefined;
    (HandleShortlistController as any).instance = undefined;

    // Initialize controllers
    searchController = SearchBuyerShortlistController.getInstance();
    shortlistController = HandleShortlistController.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // *** Search Test Cases ***

  test("should return the same instance with getInstance (Singleton Pattern) for Search", () => {
    const instance1 = SearchBuyerShortlistController.getInstance();
    const instance2 = SearchBuyerShortlistController.getInstance();
    expect(instance1).toBe(instance2);
  });

  test("should return an array of UsedCarListing when a match is found for search", async () => {
    const mockResults: UsedCarListing[] = [
      {
        id: "1",
        title: "Sample Car",
        agentEmail: "agent@example.com",
        sellerEmail: "seller@example.com",
        viewCount: 10,
        shortlistCount: 5,
        mileage: 12000,
        color: "Red",
        condition: "Used",
        imgUrl: "https://example.com/car.jpg",
        manufacturedYear: 2020,
        price: 15000,
        description: "A sample car description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Mock searchBuyerShortlistEntity to return mockResults
    mockShortlistEntity.searchBuyerShortlistEntity.mockResolvedValue(
      mockResults
    );

    const result = await searchController.searchBuyerShortlistController(
      "Sample Car"
    );

    expect(result).toEqual(mockResults);
    expect(mockShortlistEntity.searchBuyerShortlistEntity).toHaveBeenCalledWith(
      "Sample Car"
    );
  });

  test("should return null when no match is found for search", async () => {
    // Mock searchBuyerShortlistEntity to return null
    mockShortlistEntity.searchBuyerShortlistEntity.mockResolvedValue(null);

    const result = await searchController.searchBuyerShortlistController(
      "Nonexistent Car"
    );

    expect(result).toBeNull();
    expect(mockShortlistEntity.searchBuyerShortlistEntity).toHaveBeenCalledWith(
      "Nonexistent Car"
    );
  });

  test("should call searchBuyerShortlistEntity on ShortlistEntity with the correct title for search", async () => {
    // Mock to avoid undefined return
    mockShortlistEntity.searchBuyerShortlistEntity.mockResolvedValue([]);

    await searchController.searchBuyerShortlistController("Sample Car");

    expect(mockShortlistEntity.searchBuyerShortlistEntity).toHaveBeenCalledWith(
      "Sample Car"
    );
  });

  // *** Shortlist Test Cases (Add/Remove Car from Shortlist) ***

  test("should add car to shortlist if it does not exist", async () => {
    // Simulate that the car is not already in the shortlist
    mockShortlistEntity.handleShortlistEntity.mockResolvedValue(true);

    const result = await shortlistController.handleShortlistController("1"); // car ID

    expect(result).toBe(true); // Expect the car to be added to the shortlist
    expect(mockShortlistEntity.handleShortlistEntity).toHaveBeenCalledWith("1");
  });

  test("should remove car from shortlist if it already exists", async () => {
    // Simulate that the car already exists in the shortlist
    mockShortlistEntity.handleShortlistEntity.mockResolvedValue(false);

    const result = await shortlistController.handleShortlistController("1"); // car ID

    expect(result).toBe(false); // Expect the car to be removed from the shortlist
    expect(mockShortlistEntity.handleShortlistEntity).toHaveBeenCalledWith("1");
  });
});
