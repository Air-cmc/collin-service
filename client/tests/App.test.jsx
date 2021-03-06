/* eslint-disable no-undef */
// tests/App.test.js
/**
 * @test-environment jsdom
 */
// import 'jsdom-global/register';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../src/components/App';
import Places from '../src/components/Places';
import { sampleHome } from './mockData';

const city = 'Seattle, WA';

const server = setupServer(
  rest.get(`/homes/${city}`, (req, res, ctx) => res(ctx.json({ greeting: 'hello there' }))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
/* Other test ideas:
check for skeleton load
check for superhost tag
check for change of className/color when heart is clicked
check for change on arrow click
check for pop up when mouse hovers over description
*/

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
    await waitFor(() => screen.queryAllByRole('span'));
  });

  // test('renders App component', () => {
  //   const {queryByRole} = render(<App />);
  //   expect(queryByRole('div')).toBeTruthy();
  // });
  // it('updates on change', () => {
  //   const {queryByRole} = render(<App />);
  //   const description = queryByRole('button');
  //   fireEvent.change(description, { target: { value: 'value' } });
  //   expect(description.value).not.toBe('ghost');
  // });

  test('loads items eventually', async () => {
    render(<App />);
    // Wait for page to update with query text
    const items = await screen.queryAllByRole('div');
    expect(items).toBeTruthy();
  });

  test('show superhost tag on home cards', async () => {
    render(<App />);
    await waitFor(() => screen.queryAllByText('SUPERHOST'));
  });
});

describe('Places', () => {
  test('Places renders a DOM', () => {
    const { queryAllByRole } = render(
      <Places homeInfo={sampleHome} />,
    );
    expect(queryAllByRole('div')).toBeTruthy();
  });
});

/*
test('displays skeletons when no data has loaded', async () => {
  render(<App />);

  // fireEvent.click(screen.getByText('Load Greeting'));

  // await waitFor(() => screen.getByRole('heading'));

  expect(screen.getByRole('heading')).toHaveTextContent('Loading...');
  // expect(screen.getByRole('button')).toHaveAttribute('disabled');
});

test('handles server error', async () => {
  server.use(
    rest.get(`/homes/${city}`, (req, res, ctx) => res(ctx.status(500))),
  );

  render(<App />);

  fireEvent.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('alert'));

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
});

/// /////////////////////////////////////////////////////////

// // Enable API mocking before tests.
// beforeAll(() => server.listen())

// // Reset any runtime request handlers we may add during the tests.
// afterEach(() => server.resetHandlers())

// // Disable API mocking after the tests are done.
// afterAll(() => server.close())

test('allows the user to log in', async () => {
  server.use(
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
    rest.post('/login', (req, res, ctx) => res(ctx.json({ token: 'mocked_user_token' }))),
  );

  render(<App />);
  userEvent.type(
    screen.getByRole('textbox', { name: /username/i }),
    'john.maverick',
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /password/i }),
    'super-secret',
  );
  userEvent.click(screen.getByText(/submit/i));
  const alert = await screen.findByRole('alert');

  // Assert successful login state
  expect(alert).toHaveTextContent(/welcome/i);
  expect(window.sessionStorage.getItem('token')).toEqual(fakeUserResponse.token);
});

test('handles login exception', () => {
  server.use(
    rest.post('/login', (req, res, ctx) =>
      // Respond with "500 Internal Server Error" status for this test.
      res(
        ctx.status(500),
        ctx.json({ message: 'Internal Server Error' }),
      )),
  );

  render(<Login />);
  userEvent.type(
    screen.getByRole('textbox', { name: /username/i }),
    'john.maverick',
  );
  userEvent.type(
    screen.getByRole('textbox', { name: /password/i }),
    'super-secret',
  );
  userEvent.click(screen.getByText(/submit/i));

  // Assert meaningful error message shown to the user
  expect(alert).toHaveTextContent(/sorry, something went wrong/i);
  expect(window.sessionStorage.getItem('token')).toBeNull();
});
*/
