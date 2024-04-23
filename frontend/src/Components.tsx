import styled from "styled-components";

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)<{ signin: boolean }>`
  background-image: url("img/bg3.png");
  background-repeat: no-repeat;
  background-size: cover;
  transform: translateX(-20%);
  ${(props) => (props.signin !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)<{ signin: boolean }>`
  background-image: url("img/bg3.png");
  background-repeat: no-repeat;
  background-size: cover;
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signin !== true ? `transform: translateX(20%);` : null)}
`;
