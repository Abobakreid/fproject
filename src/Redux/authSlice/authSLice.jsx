import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const options = {
      method: "GET",
    };
    const res = await fetch(
      "https://a7gezlyapi.azurewebsites.net/api/player/getall",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));
    return res;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addUserPlayer = createAsyncThunk(
  "user/addUserPlayer",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "https://a7gezlyapi.azurewebsites.net/api/player",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUserOwner = createAsyncThunk(
  "user/addUserOwner",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "https://a7gezlyapi.azurewebsites.net/api/owner",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserPlayer = createAsyncThunk(
  "user/updateUserPlayer",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(userData);
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/player/id?id=${userData.id}`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await res.json();
      localStorage.setItem("userItem", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserOwner = createAsyncThunk(
  "user/updateUserOwner",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/owner/id?id=${userData.id}`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      localStorage.setItem("userItem", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddStadiumData = createAsyncThunk(
  "user/AddStadiumData",
  async (stadiumData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(stadiumData, "before");
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/AddStadium`,
        {
          method: "POST",
          body: JSON.stringify(stadiumData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      console.log(data, "after");
      toast.info("Stadium added", {
        position: "bottom-right",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserPlayer = createAsyncThunk(
  "user/loginUserPlayer",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "https://a7gezlyapi.azurewebsites.net/api/player/login",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserOwner = createAsyncThunk(
  "user/loginUserOwner",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        "https://a7gezlyapi.azurewebsites.net/api/owner/login",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
    isLoading: false,
    error: false,
    stadium: null,
    latlng: [],
  },
  reducers: {
    addusersss: (state, action) => {
      state.users = action.payload;
    },
    adduserlng: (state, action) => {
      state.latlng = action.payload;
    },
  },
  extraReducers: {
    //getUsers
    [getUser.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.uesrfilter = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.error = true;
    },

    // add user player
    [addUserPlayer.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [addUserPlayer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [addUserPlayer.rejected]: (state, action) => {
      state.error = true;
    },

    // add user owner
    [addUserOwner.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [addUserOwner.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [addUserOwner.rejected]: (state, action) => {
      state.error = true;
    },

    //updateUserplayer
    [updateUserPlayer.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [updateUserPlayer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [updateUserPlayer.rejected]: (state, action) => {
      state.error = true;
    },

    //updateUserOwner
    [updateUserOwner.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [updateUserOwner.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [updateUserOwner.rejected]: (state, action) => {
      state.error = true;
    },

    //loginUserPlayer
    [loginUserPlayer.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [loginUserPlayer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [loginUserPlayer.rejected]: (state, action) => {
      state.error = true;
    },

    //loginUserOwner
    [loginUserOwner.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [loginUserOwner.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [loginUserOwner.rejected]: (state, action) => {
      state.error = true;
    },

    // AddStadiumData
    [AddStadiumData.pending]: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    [AddStadiumData.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [AddStadiumData.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export const { addusersss, adduserlng } = authSlice.actions;
export default authSlice.reducer;
