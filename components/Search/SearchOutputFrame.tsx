interface SearchOutputFrameProps {
  entityType: string;
  data: any | any[]; // Accepts both a single object and an array of objects
}

// Configurations for different entity types and their fields
const entityConfigurations = {
  account: {
    fields: [
      { label: "User ID", key: "id" },
      { label: "Email", key: "email" },
      { label: "Password", key: "password" },
      { label: "Created Date", key: "createdAt" },
      { label: "Updated Date", key: "updatedAt" },
      { label: "Status", key: "status" },
    ],
    title: "User Account",
  },
  profile: {
    fields: [
      { label: "Profile ID", key: "id" },
      { label: "Username", key: "name" },
      { label: "Email", key: "userEmail" },
      { label: "Address", key: "address" },
      { label: "Role", key: "role" },
      { label: "Mobile Number", key: "mobileNumber" },
      { label: "Created Date", key: "createdAt" },
      { label: "Updated Date", key: "updatedAt" },
    ],
    title: "User Profile",
  },
  used_car_listing: {
    fields: [
      { label: "ID", key: "id" },
      { label: "Title", key: "title" },
      { label: "Agent Email", key: "agentEmail" },
      { label: "Seller Email", key: "sellerEmail" },
      { label: "Mileage", key: "mileage" },
      { label: "Color", key: "color" },
      { label: "Condition", key: "condition" },
      { label: "Image URL", key: "imgUrl" },
      { label: "Manufactured Year", key: "manufacturedYear" },
      { label: "Price", key: "price" },
      { label: "Description", key: "description" },
      { label: "Created Date", key: "createdAt" },
      { label: "Updated Date", key: "updatedAt" },
    ],
    title: "Used Car Listing",
  },
};

// Define the functional component with typed props
const SearchOutputFrame = ({ entityType, data }: SearchOutputFrameProps) => {
  // Retrieve the configuration for the specified entity type
  const config =
    entityConfigurations[entityType as keyof typeof entityConfigurations];
  if (!config) {
    return <p>No configuration found for this entity type.</p>;
  }

  const { title, fields } = config;

  // Ensure `data` is always treated as an array, even if it's a single object
  const dataArray = Array.isArray(data) ? data : [data];

  return (
    <div className="flex flex-wrap gap-4">
      {dataArray.length === 0 ? (
        <p>No data available.</p>
      ) : (
        dataArray.map((item, index) => (
          <div key={index}>
            <table className="p-6 rounded-lg shadow-lg mt-3 w-full max-w-lg">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th
                    colSpan={2}
                    className="rounded-sm py-2 px-4 font-semibold text-gray-600 text-center bg-gray-100"
                  >
                    {title} {dataArray.length > 1 ? `#${index + 1}` : ""}
                  </th>
                </tr>
                {fields.map(({ label, key }) => (
                  <tr key={key} className="border-b border-gray-200">
                    <td className="py-2 px-4 font-semibold text-gray-600 text-left">
                      {label}:
                    </td>
                    <td className="py-2 px-4 text-gray-700 text-left">
                      {item[key] && !isNaN(Date.parse(item[key]))
                        ? new Date(item[key]).toLocaleString()
                        : item[key] || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchOutputFrame;
