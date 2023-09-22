import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import {
  createMemoryRouter,
  createRoutesFromElements,
  MemoryRouter,
  Outlet,
  Route,
  RouterProvider,
  useParams,
} from 'react-router';
import { Link } from 'react-router-dom';

import { ScrollToTopOutlet } from '.';

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn());
});

it('should render', () => {
  const el = render(<ScrollToTopOutlet />, { wrapper: MemoryRouter });
  expect(el.container).toMatchSnapshot();
});

it('should scroll to top', async () => {
  const El = () => {
    const { id } = useParams();
    return <div data-testid="test-el">{id}</div>;
  };

  const user = userEvent.setup();

  render(
    <RouterProvider
      router={createMemoryRouter(
        createRoutesFromElements(
          <Route element={<ScrollToTopOutlet />}>
            <Route
              element={
                <>
                  <ul>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <li key={value}>
                        <Link data-testid={`link-to-${value}`} to={`/test/${value}`}>
                          Link to 1
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Outlet />
                </>
              }
            >
              <Route path="test">
                <Route path=":id" element={<El />} />
              </Route>
            </Route>
          </Route>,
        ),
        { initialEntries: ['/test/1'] },
      )}
    />,
  );

  await act(() => user.click(screen.getByTestId('link-to-1')));
  await act(() => user.click(screen.getByTestId('link-to-2')));

  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  expect(window.scrollTo).toHaveBeenCalledTimes(2);
});
