import Card from "@/components/Card/Card";
import BuyerSearchBar from "@/components/Search/BuyerSearch/BuyerSearchBar";
import { relative } from "path";

export default async function Home() {
  // const session = await getServerSession(authOptions);
  return (
    <main>
      <div>
        <BuyerSearchBar />
      </div>

      <br />
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 ">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}
