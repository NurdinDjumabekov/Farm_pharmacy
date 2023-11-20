import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getBooks = createAsyncThunk(
  'getBooks',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await fetch(api);
      if (response.status === 200) {
        const records = await response.json();
        return records;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
    }
  }
);

export const getOne = createAsyncThunk(
  'getOne',
  async function (api, { dispatch, rejectWithValue }) {
    try {
      const response = await fetch(api);
      if (response.status === 200) {
        const records = await response.json();
        return records;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
    }
  }
);

const bookSlice = createSlice({
  name: 'bookSlice',
  initialState: {
    books: [],
    loading: false,
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload.results;
    });

    builder.addCase(getBooks.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(getBooks.pending, (state, action) => {
      state.loading = true;
    });

    // getOne
    builder.addCase(getOne.fulfilled, (state, action) => {
      state.loading = false;
      state.info = action.payload;
    });

    builder.addCase(getOne.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(getOne.pending, (state, action) => {
      state.loading = true;
    });
    // post
    // builder.addCase(createbook.fulfilled, (state, action) =>
    // {
    //     state.loading = false;
    //     state.error = null;
    //     state.success = action.payload;
    // })
    // builder.addCase(createbook.rejected, (state, action) =>
    // {
    //     state.loading = false;
    //     state.error = action.payload;
    // })
    // builder.addCase(createbook.pending, (state, action) =>
    // {
    //     state.loading = true;
    // })
    // // change
    // builder.addCase(changebook.fulfilled, (state, action) =>
    // {
    //     state.loading = false;
    //     state.info = action.payload;
    // })
    // builder.addCase(changebook.rejected, (state, action) =>
    // {
    //     state.loading = false;
    //     state.error = action.payload;
    // })
    // builder.addCase(changebook.pending, (state, action) =>
    // {
    //     state.loading = true;
    // })
    // // delete
    // builder.addCase(deletebook.pending, (state, action) =>
    // {
    //     state.delLoading = true;
    // })
    // builder.addCase(deletebook.fulfilled, (state, action) =>
    // {
    //     state.delLoading = false;
    //     state.delMessage = action.payload
    // })
    // builder.addCase(deletebook.rejected, (state, action) =>
    // {
    //     if (action.payload === undefined) state.delError = 'Ошибка, что то пошло не так'
    //     else state.delError = action.error
    //     state.delLoading = false;
    // })
  },
});

export default bookSlice.reducer;