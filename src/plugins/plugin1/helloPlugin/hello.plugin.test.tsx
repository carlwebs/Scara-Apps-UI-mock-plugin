import React from 'react';
import { render } from '@testing-library/react';
import { HelloPlugin } from './hello-plugin';

test('renders learn react link', () => {
  const { getByText } = render(<HelloPlugin />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
