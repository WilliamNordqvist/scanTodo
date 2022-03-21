import React, {
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { Html5Qrcode } from "html5-qrcode";
import styled from "styled-components";
import { getProductFromBarcodePrimary } from "../../api/api";
import { CloseIcon } from "../icons/close";

const Wrapper = styled.section`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Reader = styled.div<{ success: boolean }>`
  width: 100%;
  height: auto;
  border: 10px solid ${({ success }) => (success ? "green" : "transparent")};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: ${({ theme }) => theme.sizes.small};
`;

type TScanner = {
  onClose: Dispatch<SetStateAction<boolean>>;
  onScan: (text: any) => void;
};

export const Scanner: React.VFC<TScanner> = ({
  onClose,
  onScan,
}) => {
  const [success, setSuccess] = useState(false);
  const [html5Qrcode, setHtml5Qrcode] = useState<Html5Qrcode>();

  const onScannerStart = useCallback(
    (html5QrCode: Html5Qrcode) => {
      const qrCodeSuccessCallback = async (decodedText: string) => {
        const productName = await getProductFromBarcodePrimary(decodedText);
        onScan(productName);
        setTimeout(() => {
          html5QrCode.stop();
          onClose(false);
        }, 600);
        setSuccess(true);
      };

      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        qrCodeSuccessCallback,
        () => {}
      );
    },
    [onClose, onScan]
  );

  useEffect(() => {
    const newHtml5Qrcode = new Html5Qrcode("reader");
    setHtml5Qrcode(newHtml5Qrcode);
    onScannerStart(newHtml5Qrcode);
  }, [onScannerStart]);

  return (
    <Wrapper>
      <IconWrapper>
        <CloseIcon
          onClick={() => {
            onClose(false);
            html5Qrcode?.stop();
            
          }}
        />
      </IconWrapper>

      <Reader success={success} id="reader" />
    </Wrapper>
  );
};
