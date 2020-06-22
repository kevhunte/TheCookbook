import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { useAuth0 } from "./react-auth0-spa";

// beforeEach (() => {
//   const { loading, user } = useAuth0();
//
// });

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
