import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAuthors = createAsyncThunk(
    "getAuthors",
    async function (api, { dispatch, rejectWithValue })
    {
        try {
            const response = await fetch(api);
            if (response.status === 200) {
                const records = await response.json();
                return records.results;
            }
            else {
                throw Error(`Error: ${response.status}`);
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
        finally {

        }
    }
)

export const getAutor = createAsyncThunk(
    "getAutor",
    async function (api, { dispatch, rejectWithValue })
    {
        try {
            const response = await fetch(api);
            if (response.status === 200) {
                const records = await response.json();
                return records;
            }
            else {
                throw Error(`Error: ${response.status}`);
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
        finally {

        }
    }
)

const authorsSlice = createSlice({
    name: 'authorSlice',
    initialState: {
        authors: [],
        loading: false,
        error: null,
        success: null,
    },
    extraReducers: builder =>
    {
        builder.addCase(getAuthors.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.authors = action.payload;
        })
        builder.addCase(getAuthors.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getAuthors.pending, (state, action) =>
        {
            state.loading = true;
        })
        // getOne
        builder.addCase(getAutor.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.info = action.payload;
        })
        builder.addCase(getAutor.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getAutor.pending, (state, action) =>
        {
            state.loading = true;
        })
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
    }
})

export default authorsSlice.reducer