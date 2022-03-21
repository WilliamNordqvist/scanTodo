import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  width: 100%;
  margin: ${(props) => props.theme.sizes.xsmall} 0;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledInput = styled.input<{ center: boolean }>`
  width: 90%;
  background: transparent;
  border: none;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.inputColor};
  color:${({ theme }) => theme.color.primaryTextColor};
  border-radius: 0px;
  font-size: 16px;
  margin: ${({ center }) => (center ? "auto" : "0")};

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.color.inputColor};
    opacity: 0.5;
  }
`;

type TInput = {
  value: string;
  setValue: (value: string) => void;
  onEnter?: () => void;
  icon?: JSX.Element;
  placeholder?: string;
  center?: boolean;
};

export const Input: React.VFC<TInput> = ({
  value,
  setValue,
  onEnter,
  icon,
  placeholder,
  center = false,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.length >= 1 && onEnter) {
      onEnter();
    }
  };

  return (
    <InputWrapper>
      <StyledInput
        center={center}
        type="text"
        value={value}
        onChange={onChange}
        onKeyPress={value.length >= 1 ? onKeyPress : () => {}}
        placeholder={placeholder}
      />
      {icon && icon}
    </InputWrapper>
  );
};
