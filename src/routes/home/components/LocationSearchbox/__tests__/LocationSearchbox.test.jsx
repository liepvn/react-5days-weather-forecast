import { DEFAULT_LOCATION } from 'routes/home/home.constant';

import { fireEvent, render, waitFor, cleanup } from 'test/test-utils';

import { LocationSearchbox } from '..';

const mockDispatch = jest.fn();
const mockOnChange = jest.fn();

describe('LocationSearchbox', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not dispatch action to search locations when it mounted', async () => {
    render(<LocationSearchbox onChange={mockOnChange} />);

    await waitFor(() => {
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  it('should initialize selected value correctly', async () => {
    const selected = [DEFAULT_LOCATION];
    const mockOnChange = jest.fn();
    const { getByRole } = render(<LocationSearchbox onChange={mockOnChange} selected={selected} />, {
      redux: { mockDispatch },
    });
    const input = getByRole('combobox');

    await waitFor(() => {
      expect(input).toHaveValue(DEFAULT_LOCATION.title);
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  it('should show suggestion options and handle onchange correctly', async () => {
    const expectedQuery = 'san';
    const expectedLocations = [
      { title: 'San Francisco', woeid: 2487956 },
      { title: 'San Jose', woeid: 2488042 },
    ];

    const { getByRole, getAllByRole } = render(<LocationSearchbox onChange={mockOnChange} />, {
      redux: { mockDispatch, initialState: { home: { locations: expectedLocations, isSearching: false } } },
    });
    const input = getByRole('combobox');

    fireEvent.change(input, { target: { value: expectedQuery } });

    await waitFor(() => {
      expect(getAllByRole('option').length).toBe(2);
    });

    fireEvent.click(getAllByRole('option')[0]);

    expect(mockOnChange).toHaveBeenCalledWith([expectedLocations[0]]);
  });

  // it('should show suggestion options and handle onchange correctly', async () => {
  //   const expectedQuery = 'san';
  //   const expectedLocations = [
  //     { title: 'San Francisco', woeid: 2487956 },
  //     { title: 'San Jose', woeid: 2488042 },
  //   ];
  //   mockSearchLocationsApi.mockResolvedValue({
  //     data: expectedLocations,
  //   });

  //   const { getByRole, getAllByRole } = render(<LocationSearchbox onChange={mockOnChange} />, {
  //     redux: { mockDispatch, integration: true },
  //   });
  //   const input = getByRole('combobox');

  //   fireEvent.change(input, { target: { value: expectedQuery } });

  //   await waitFor(() => {
  //     expect(getAllByRole('option').length).toBe(2);
  //   });

  //   expect(mockSearchLocationsApi).toHaveBeenCalledTimes(1);
  //   expect(mockSearchLocationsApi).toHaveBeenCalledWith(expectedQuery);

  //   fireEvent.click(getAllByRole('option')[0]);

  //   expect(mockOnChange).toHaveBeenCalledWith([expectedLocations[0]]);
  // });
});
