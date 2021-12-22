import React from 'react';

import {
  MessageContent,
  MessageIcon,
  MessageText,
} from './styles';

interface MessageProps {
  icon: string;
  firstMessage: string;
  secondMessage: string;
}

export function Message({ icon, firstMessage, secondMessage }: MessageProps) {

  return(
    <MessageContent>
      <MessageIcon name={icon} />
      <MessageText>
        {firstMessage}
      </MessageText>
      { secondMessage && (
        <MessageText>
          {secondMessage}
        </MessageText>
      )}
    </MessageContent>
  );
}