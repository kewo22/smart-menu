"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type SubmitBtnProps = {
  btnText?: string;
};

export const SubmitBtn = (props: SubmitBtnProps) => {
  const { btnText = "Submit" } = props;
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {btnText}
    </Button>
  );
};
