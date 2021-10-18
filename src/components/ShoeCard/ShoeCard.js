import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  
  const variantStyles = {
    "on-sale": {
      bgColor: "#C5295D",
      text: "Sale"
    },
    "new-release": {
      bgColor: "#6868D9",
      text: "Just Released!"
    }
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === "on-sale" && <SalePrice>{ formatPrice(salePrice)}</SalePrice> }
        </Row>
        {(variant === "on-sale" || variant === "new-release") && <VariantTag bgColor={variantStyles[variant].bgColor}>{variantStyles[variant].text}</VariantTag>}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;


`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${p => p.onSale ?  `line-through solid ${COLORS.gray[700]}  1px`: undefined};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const VariantTag = styled.span`
  position: absolute;
    top: 12px;;
  right: -6px;
  font-size: ${14/18}rem;
  background-color: ${p => p.bgColor};
  border-radius: 2px;
  padding: 8px;
  color: ${COLORS.white};
`

export default ShoeCard;
