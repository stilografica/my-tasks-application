export function uuid () {
    return Math.random().toString(16).slice(2)
  }

  export function saveStatePlugin (store) {
    store.subscribe(
      (mutation, state) => {
        localStorage.setItem(
          'board',
          JSON.stringify(state.board)
        )
      }
    )
  }

  export function boardVariant (variant) {
    const variantsColors = {
      "To do": "secondary",
      "In progress": "warning",
      Completed: "success",
    };
    return variantsColors[variant] || 'red';
  };

  export function boardIcon (variant) {
    const variantIcon = {
      "To do": "mdi-folder",
      "In progress": "mdi-format-paint",
      Completed: "mdi-check-circle-outline",
    };
  
    return variantIcon[variant];
  };