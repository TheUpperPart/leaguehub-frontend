import styled from '@emotion/styled';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children?: React.ReactNode;

  width?: number;
  height?: number;
  padding?: number;
  margin?: number;
  borderRadius?: number;
}

const Button = ({ onClick, children, type = 'button', ...rest }: ButtonProps) => {
  return (
    <CustomBtn onClick={onClick} type={type} {...rest}>
      {children}
    </CustomBtn>
  );
};

export default Button;

const CustomBtn = styled.button<ButtonProps>`
  width: ${(prop) => (prop.width ? prop.width + 'rem' : 'auto')};
  height: ${(prop) => (prop.width ? prop.height + 'rem' : 'auto')};

  border-radius: ${(prop) => (prop.borderRadius ? prop.borderRadius + 'rem' : '1rem')};

  border: none;

  background-color: #353535;
  border-radius: 1rem;
  color: #f9fafb;
  font-size: 2rem;

  cursor: pointer;
`;
