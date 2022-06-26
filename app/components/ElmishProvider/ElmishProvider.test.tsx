import { act, render, RenderOptions, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { Effects, Reducer, StateEffectPair } from 'react-use-elmish';

import { ElmishProvider, useDispatch, useElmishContext } from './ElmishProvider';

type TestState = 'test' | null;
type TestActions = 'test';
type TestStateEffectPair = StateEffectPair<TestState, TestActions>;

interface CustomRenderOptions extends RenderOptions {
  reducer: Reducer<TestState, TestActions>;
  initializer: () => StateEffectPair<TestState, TestActions>;
}

/**
 * Custom render function to render the elmish provider.
 *
 * @param ui to render inside the provider
 * @param param1 options
 * @param param1.reducer passed to the elmish provider
 * @param param1.initializer used to initialize provider state
 * @returns testing library render result
 */
const customRender = (
  ui: React.ReactElement,
  { reducer, initializer, ...options }: CustomRenderOptions,
): RenderResult => {
  return render(
    <ElmishProvider reducer={reducer} initializer={initializer}>
      {ui}
    </ElmishProvider>,
    options,
  );
};

const customRenderOptions: CustomRenderOptions = {
  reducer: (state: 'test' | null, action: 'test'): TestStateEffectPair => {
    if (action === 'test') {
      return ['test', Effects.none()];
    }
    return [state, Effects.none()];
  },
  initializer: (): TestStateEffectPair => [null, Effects.none()],
};

it('should hold elmish context', async () => {
  /**
   * Simple component that uses elmish context.
   *
   * @returns element
   */
  const TestButton = () => {
    const [state, dispatch] = useElmishContext<TestState, TestActions>();
    return (
      <>
        <span data-testid="test-state">{state}</span>
        <button data-testid="test-button" onClick={() => dispatch('test')}>
          Press
        </button>
      </>
    );
  };

  const result = customRender(<TestButton />, customRenderOptions);

  const getState = async () => {
    const state = await result.findByTestId('test-state');
    return state.innerHTML;
  };

  expect(await getState()).toEqual('');

  await act(async () => {
    const button = await result.findByTestId('test-button');
    button.click();
  });

  await waitFor(async () => {
    const state = await result.findByTestId('test-state');
    return state.innerText != null;
  });

  expect(await getState()).toEqual('test');
});

it('should fire dispatch events with the useDispatch hook', async () => {
  const TestButton = () => {
    const dispatch = useDispatch<TestActions>();
    return (
      <button data-testid="test-dispatch-button" onClick={() => dispatch('test')}>
        Press
      </button>
    );
  };

  const spy = jest.spyOn(customRenderOptions, 'reducer');

  // the reducer should only be dispatched when the button is clicked
  const result = customRender(<TestButton />, customRenderOptions);

  expect(spy).not.toHaveBeenCalled();

  // click the button
  await act(async () => {
    const button = await result.findByTestId('test-dispatch-button');
    button.click();
  });

  // after the button is clicked, we can verify that the event was dispatched
  expect(spy).toHaveBeenCalledWith(null, 'test');
});

it('should use an elmish context outside of an elmish provider', () => {
  /**
   * Simple component that uses elmish context.
   *
   * @returns element
   */
  const TestButton = (): JSX.Element => {
    try {
      const [state, dispatch] = useElmishContext<TestState, TestActions>();
      return (
        <>
          <span data-testid="test-state">{state}</span>
          <button data-testid="test-error-button" onClick={() => dispatch('test')}>
            Press
          </button>
        </>
      );
    } catch (err) {
      if (err instanceof Error) {
        return <span data-testid="error">{err.message}</span>;
      }
    }

    return <></>;
  };

  const result = render(<TestButton />);

  expect(result.getByTestId('error').textContent).toEqual(
    'no elmish context found. make sure you have a <ElmishProvider>',
  );
});
