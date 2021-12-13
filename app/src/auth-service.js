export const getUser = () => {

  if (!getIdToken()) {
    clearLogin();
    return undefined;
  }

  if (!getProfile()) {
    clearLogin();
    return undefined;
  }

  if (isExpired()) {
    clearLogin();
    return undefined;
  }

  return {
    profile : JSON.parse(getProfile()),
    idToken : getIdToken()
  };
}

export const setLogin = (profile, token) => {

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
};

const clearLogin = () => {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
}

const getProfile = () => {
  return localStorage.getItem('profile');
}

const getIdToken = () => {
  return localStorage.getItem('id_token');
}

const isExpired = () => {
  return (getIdToken().expires_at - Date.now()) <= 0;
};
