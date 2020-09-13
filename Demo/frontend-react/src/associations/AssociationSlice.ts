import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AssociationStore, AssociationQuery, AssociationData } from './AssociationStore';

const AssociationSlice = createSlice({
  name: 'association',
  initialState: [] as AssociationStore,
  reducers: {
    resetAssociations(state: AssociationStore, action: any) {
      return []
    },
    getAssociations(state: AssociationStore, action: PayloadAction<AssociationQuery>) {
      return state
    },
    addAssociation(state: AssociationStore, action: PayloadAction<AssociationData>) {
      return state
    },
    deleteAssociation(state: AssociationStore, action: PayloadAction<AssociationData>) {
      state = state.filter(item => item.location !== action.payload.location && item.device !== action.payload.device)
      return state
    },
    setAssociations(state: AssociationStore, action: PayloadAction<AssociationData[]>) {
      action.payload.map(x => {
        state.push(x)
        return null
      })
      return state
    },
  }
})

export const { resetAssociations, getAssociations , setAssociations, addAssociation, deleteAssociation } = AssociationSlice.actions

export default AssociationSlice.reducer