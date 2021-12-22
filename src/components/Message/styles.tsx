import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const MessageContent = styled.View`
flex: 1;

align-items: center;
justify-content: center;
padding: 24px;
`;

export const MessageText = styled.Text`
font-size: ${RFValue(18)}px;
color: ${({ theme }) => theme.colors.primary};
justify-content: center;
`;

export const MessageIcon = styled(Feather)`
font-size: ${RFValue(64)}px;
color: ${({ theme }) => theme.colors.attention};

margin-bottom: 24px;
`;