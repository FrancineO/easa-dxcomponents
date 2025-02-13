import MapView from '@arcgis/core/views/MapView';

let viewInstance = new MapView({
  ui: {
    components: [] // Remove default UI components
  }
});

const getView = () => viewInstance; // Getter function

const getNewView = () => {
  if (viewInstance) {
    viewInstance.destroy(); // Properly clean up the existing MapView
  }

  viewInstance = new MapView({
    ui: {
      components: [] // Remove default UI components
    }
  });
};

export { getView, getNewView };
