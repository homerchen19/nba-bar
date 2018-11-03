import React from 'react';
import renderer from 'react-test-renderer';

import DataSection from '../DataSection';

it('be defined', () => {
  expect(DataSection).toBeDefined();
});

it('match snapshot', () => {
  const tree = renderer.create(<DataSection />).toJSON();

  expect(tree).toMatchSnapshot();
});
