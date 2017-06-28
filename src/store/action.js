export const addMethod = ({ dispatch }) => {
  dispatch('ADD_METHOD')
}

export const editMethod = ({ dispatch }, e) => {
  dispatch('EDIT_METHOD', e.target.value)
}

export const minusMethod = ({ dispatch }) => {
  dispatch('MINUS_METHOD')
}

