import React from "react";
import {
  LoginSloganContainer,
  LogoStyle,
  SloganTypography,
  BoldSloganTypography,
  SloganParagraph,
} from "./LoginSlogan.style";
import betterLogo from "../../assets/better-logo.png";

const LoginSlogan = () => {
  return (
    <LoginSloganContainer>
      <div>
        <div style={{ position: "relative", top: "10px", left: "115px" }}>
          <SloganTypography>
            Where <BoldSloganTypography>Misses</BoldSloganTypography> Reveal
          </SloganTypography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.5em",
          }}
        >
          <LogoStyle src={betterLogo} alt="Better Logo" />
          <SloganTypography>
            <div style={{ position: "relative", top: "-6px", left: "10px" }}>
              <BoldSloganTypography>The</BoldSloganTypography> Truth
            </div>
          </SloganTypography>
        </div>
      </div>
      <SloganParagraph>
        BOOSTED EXPLAINATORY TREE BASED GENERATOR
      </SloganParagraph>
    </LoginSloganContainer>
  );
};

export default LoginSlogan;
