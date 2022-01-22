import { act, render, RenderOptions, waitFor } from '@testing-library/react';
import React from 'react';
import { Effects, Reducer, StateEffectPair } from 'react-use-elmish';

import { ElmishProvider, useElmishContext } from './ElmishProvider';

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
) => {
  return render(
    <ElmishProvider reducer={reducer} initializer={initializer}>
      {ui}
    </ElmishProvider>,
    options,
  );
};

it('should hold elmish context', async () => {
  // simple component that uses elmish context
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

  const result = customRender(<TestButton />, {
    reducer: (state: 'test' | null, action: 'test'): TestStateEffectPair => {
      if (action === 'test') {
        return ['test', Effects.none()];
      }
      return [state, Effects.none()];
    },
    initializer: (): TestStateEffectPair => [null, Effects.none()],
  });

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
