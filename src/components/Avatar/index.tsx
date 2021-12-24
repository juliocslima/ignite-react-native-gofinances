import React from 'react';

import {
  PhotoAvatarContainer,
  PhotoAvatarLetters,
  Photo,
} from './styles';

interface AvatarProps {
  name: string;
  photo?: string;
}

export function Avatar({ name, photo }: AvatarProps){

  function getInitials(fullname: string) {
    const allNames = fullname.trim().split(' ');

    if(allNames.length === 1) {
      return allNames[0].substring(0, 1).toUpperCase();
    } else {
      const initials = allNames.reduce((acc, curr, index) => {
        if(index === 0 || index === allNames.length - 1){
          acc = `${acc}${curr.charAt(0).toUpperCase()}`;
        }
        return acc;
      }, '');
      return initials;
    }
  }

  return(
    <>
    { photo ? (
      <Photo source={{ uri: photo}}/>
    ) : (
      <PhotoAvatarContainer>
        <PhotoAvatarLetters>
          { getInitials(name) }
        </PhotoAvatarLetters>
      </PhotoAvatarContainer>
    ) }
    </>
  );
}