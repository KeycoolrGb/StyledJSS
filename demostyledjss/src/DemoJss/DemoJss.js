import React from "react";
import { Button, TomatoButton } from "../Components/Button";
import { StyledLink } from "../Components/Link";
import { Input } from "../Components/TextField";

export default function DemoJss() {
  return (
    <div>
      <Button className="button_style" bgPrimary border>
        Click
      </Button>
      <TomatoButton>aaaa</TomatoButton>
      <StyledLink name="123" id="1">
        Ahii
      </StyledLink>
      <Input inputColor="green" />
    </div>
  );
}
