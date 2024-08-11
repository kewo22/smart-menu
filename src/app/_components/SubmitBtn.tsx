"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type SubmitBtnProps = {
  btnText?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
};

export const SubmitBtn = (props: SubmitBtnProps) => {
  const { btnText = "Submit", isDisabled = false, isLoading = false } = props;

  // not working, check later
  // const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={isLoading || isDisabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && btnText}
    </Button>
  );
};
