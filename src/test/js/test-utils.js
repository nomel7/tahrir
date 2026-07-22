import { render, cleanup, fireEvent, act, screen, within } from '@testing-library/react';

afterEach(() => {
    cleanup();
});

export { render, fireEvent, act, screen, within };
