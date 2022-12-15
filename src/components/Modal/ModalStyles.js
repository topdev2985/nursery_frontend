import styled from 'styled-components';
import {
    primaryFontStyles,
    headingLarge,
} from '../../utilities/typographyStyles';
import { motion } from 'framer-motion';

export const StyledModal = styled(motion.div)`
    position: fixed;
    inset: 0 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 24px;
    background-color: hsla(0, 0%, 0%, 50%);
    z-index: 100;
`;

export const Container = styled(motion.div)`
    width: 100%;
    max-width: 480px;
    padding: 32px;
    border-radius: 8px;
    background-color: hsl(233, 31%, 17%);
`;

export const Title = styled.h2`
    ${headingLarge}
`;

export const Text = styled.p`
    ${primaryFontStyles}
    color: hsl(231, 75%, 93%);
    margin-bottom: 24px;
    line-height: 1.84;
`;

export const CtaGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;
