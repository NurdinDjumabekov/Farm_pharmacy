import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
    "getUsers",
    async function (api, { dispatch, rejectWithValue })
    {
        try {
            const response = await fetch(api);
            if (response.status === 200) {
                const records = await response.json();
                // console.log(records);
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

export const getOne = createAsyncThunk(
    "getOne",
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


export const changeUser = createAsyncThunk(
    "changeUser",
    async function ({ data, api })
    {
        try {
            const response = await fetch(api, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const responseData = await response.json();
            let newData = {
                name: responseData.name,
                email: responseData.email,
                month: responseData.month,
                course: responseData.course,
                role: 'Студент'
            }
            if (responseData.ava) newData = { ...newData, ava: responseData.ava };
            window.localStorage.setItem('data', JSON.stringify(newData))
            return responseData;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }
)

export const deleteUser = createAsyncThunk(
    'deleteRecord',
    async (mockupId) =>
    {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${mockupId}`, {
                method: 'DELETE'
            });
            if (response.status === 200) {
                const data = await response.json();
                return "Успешно удалено";
            } else {
                throw Error(`Error: ${response.status}`);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        users: [],
        info: null,
        loading: false,
        error: null,
        success: null,
        delLoading: false,
        delMessage: false,
        delError: null,
    },
    extraReducers: builder =>
    {
        builder.addCase(getUsers.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.users = action.payload;
        })
        builder.addCase(getUsers.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getUsers.pending, (state, action) =>
        {
            state.loading = true;
        })
        // getOne
        builder.addCase(getOne.fulfilled, (state, action) =>
        {
            state.loading = false;
            state.info = action.payload;
        })
        builder.addCase(getOne.rejected, (state, action) =>
        {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getOne.pending, (state, action) =>
        {
            state.loading = true;
        })
        // post
        // builder.addCase(createUser.fulfilled, (state, action) =>
        // {
        //     state.loading = false;
        //     state.error = null;
        //     state.success = action.payload;
        // })
        // builder.addCase(createUser.rejected, (state, action) =>
        // {
        //     state.loading = false;
        //     state.error = action.payload;
        // })
        // builder.addCase(createUser.pending, (state, action) =>
        // {
        //     state.loading = true;
        // })
        // // change
        // builder.addCase(changeUser.fulfilled, (state, action) =>
        // {
        //     state.loading = false;
        //     state.info = action.payload;
        // })
        // builder.addCase(changeUser.rejected, (state, action) =>
        // {
        //     state.loading = false;
        //     state.error = action.payload;
        // })
        // builder.addCase(changeUser.pending, (state, action) =>
        // {
        //     state.loading = true;
        // })
        // // delete
        // builder.addCase(deleteUser.pending, (state, action) =>
        // {
        //     state.delLoading = true;
        // })
        // builder.addCase(deleteUser.fulfilled, (state, action) =>
        // {
        //     state.delLoading = false;
        //     state.delMessage = action.payload
        // })
        // builder.addCase(deleteUser.rejected, (state, action) =>
        // {
        //     if (action.payload === undefined) state.delError = 'Ошибка, что то пошло не так'
        //     else state.delError = action.error
        //     state.delLoading = false;
        // })
    }
})

export default usersSlice.reducer