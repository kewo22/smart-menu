"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type SubmitBtnProps = {
  btnText?: string;
  isDisabled?: boolean;
};

export const SubmitBtn = (props: SubmitBtnProps) => {
  const { btnText = "Submit", isDisabled = false } = props;
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || isDisabled}>
      {btnText}
    </Button>
  );
};
