import {createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    updateVotes(state, action) {
      state.find(a => a.id === action.payload.id).votes = action.payload.votes
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteServices.create(content)
    dispatch(anecdoteSlice.actions.addAnecdote(anecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes))
  }
}

export const addVote = content => {
  return async dispatch => {
    const anecdote = await anecdoteServices.update(content.id, {content: content.content, votes: content.votes+1 })
    dispatch(anecdoteSlice.actions.updateVotes(anecdote))
  }
}

export const { addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer