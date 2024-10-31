/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
export interface TypographyProps extends FontDataProps {
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
  className?: string;
  children?: any;
  onClick?: any;
  showMore?: boolean;
}

export interface FontDataProps {
  fontSize?: string | number;
  fontWeight?: string | number;
  lineHeight?: string | number;
}

const StyledTypographyH1 = styled.h1`
  font-family: Lato;
  font-style: normal;
  text-align: ${(props: TypographyProps) => props?.align || 'inherit'};
  color: ${props => props?.color || 'inherit'};
  font-weight: 600;
  font-size: 32px;
`;
const StyledTypographyH2 = styled.h2`
  font-family: Lato;
  font-style: normal;
  text-align: ${(props: TypographyProps) => props?.align || 'inherit'};
  color: ${props => props?.color || 'inherit'};
  font-weight: normal;
  font-size: 24px;
`;
const StyledTypographyH3 = styled.h3`
  font-family: Lato;
  font-style: normal;
  text-align: ${(props: TypographyProps) => props?.align || 'inherit'};
  color: ${props => props?.color || 'inherit'};
  font-weight: normal;
  font-size: 19px;
`;
const StyledTypographyH4 = styled.h4`
  font-family: Lato;
  font-style: normal;
  text-align: ${(props: TypographyProps) => props?.align || 'inherit'};
  color: ${props => props?.color || 'inherit'};
  font-weight: normal;
  font-size: 16px;
`;
const StyledTypographyH5 = styled.h5`
  font-family: Lato;
  font-style: normal;
  text-align: ${(props: TypographyProps) => props?.align || 'inherit'};
  color: ${props => props?.color || 'inherit'};
  font-weight: normal;
  font-size: 14px;
`;
const StyledTypographyH6 = styled.h6`
  font-family: Lato;
  font-style: normal;
  text-align: ${(props: TypographyProps) => props?.align || 'inherit'};
  color: ${props => props?.color || 'inherit'};
  font-weight: normal;
  font-size: 13px;
`;

export default function Typography(props: TypographyProps) {
  const defaultVariant = props?.variant || 'bodyText';
  const nProps = { ...props, variant: defaultVariant };
  switch (props.variant) {
    case 'h1':
      return <StyledTypographyH1 {...nProps} />;
    case 'h2':
      return <StyledTypographyH2 {...nProps} />;

    case 'h3':
      return <StyledTypographyH3 {...nProps} />;

    case 'h4':
      return <StyledTypographyH4 {...nProps} />;

    case 'h5':
      return <StyledTypographyH5 {...nProps} />;

    case 'h6':
      return <StyledTypographyH6 {...nProps} />;

    default:
      return <StyledTypographyH3 {...nProps} />;
  }
}
