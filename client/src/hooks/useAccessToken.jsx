import { useContext } from 'react';

import { AccessTokenContext } from '../context/GetAccessToken';

export const useAccessToken = () => useContext(AccessTokenContext);
