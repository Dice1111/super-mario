import UsedCarDetail from "@/components/UsedCarDetail/UsedCarDetail";

class ViewUsedCarDetailUI {
  private static instance: ViewUsedCarDetailUI;

  private constructor() {}

  public static getInstance(): ViewUsedCarDetailUI {
    if (!ViewUsedCarDetailUI.instance) {
      ViewUsedCarDetailUI.instance = new ViewUsedCarDetailUI();
    }
    return ViewUsedCarDetailUI.instance;
  }

  // Update here: id is now a string parameter
  public displayUsedCarDetailUI(id: string): JSX.Element {
    return <UsedCarDetail id={id} />;
  }

  public displaySuccessUI() {
    alert("Review and Rating Data Retrieval Successful");
  }

  public displayErrorUI() {
    alert("Review and Rating Data Retrieval Failed");
  }
}

export default ViewUsedCarDetailUI;
