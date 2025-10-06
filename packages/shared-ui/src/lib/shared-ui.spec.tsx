import { render } from '@testing-library/react';

import CodingChallengesRepoSharedUi from './shared-ui';

describe('CodingChallengesRepoSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CodingChallengesRepoSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
