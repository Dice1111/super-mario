"use client";

import React, { use } from "react";
import ViewUsedCarDetailUI from "@/app/boundaries/UserUI/ViewUsedCarDetailUI";

interface Props {
  params: Promise<{ id: string }>;
}

const UsedCarDetailPage = ({ params }: Props) => {
  const unwrappedParams = use(params);
  const boundary = ViewUsedCarDetailUI.getInstance();

  return <>{boundary.displayUsedCarDetailUI(unwrappedParams.id)} </>;
};

export default UsedCarDetailPage;
