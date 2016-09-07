export const startTask = (item) => {
  return {
    type: 'START_TASK',
    item: item
  }
}

export const stopTask = (item) => {
  return {
    type: 'STOP_TASK',
    item: item
  }
}

export const deleteTask = (id) => {
  return {
    type: 'DELETE_TASK',
    item: item
  }
}

export const editTask = (item) => {
  return {
    type: 'EDIT_TASK',
    item: item
  }
}



