export type UserToken = {
  idToken: string;
  expiresAt: number;
}

export type UserProfile = {
  name: string;
  email: string;
  imageUrl: string;
}

export type User = {
  profile: UserProfile;
  token: UserToken;
}

export const getUser = (): User | null => {

  if (!getIdToken()) {
    clearLogin();
    return null;
  }

  if (!getProfile()) {
    clearLogin();
    return null;
  }

  if (isExpired()) {
    clearLogin();
    return null;
  }

  return {
    profile : JSON.parse(getProfile()),
    token : {
      idToken: getIdToken(),
      expiresAt: getExpiresAt()
    }
  };
}

export const setLogin = (profile: any, token: any) => {

  if (profile.email !== 'matt.voget@gmail.com') return;

  localStorage.setItem(
    'profile',
    JSON.stringify({
      name: profile.name,
      email: profile.email,
      imageUrl: profile.imageUrl
    })
  );
  localStorage.setItem('id_token', token.id_token);
  localStorage.setItem('expires_at', token.expires_at);
};

const clearLogin = () => {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
}

const getProfile = (): any => {
  return localStorage.getItem('profile');
}

const getExpiresAt = (): number => {
  return Number.parseInt(localStorage.getItem('expires_at') as string);
}

const getIdToken = (): string => {
  return localStorage.getItem('id_token') as string;
}

const isExpired = () => {
  return (getExpiresAt() - Date.now()) <= 0;
};
