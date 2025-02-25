import MapView from '@arcgis/core/views/MapView';

let viewInstance = new MapView({
  ui: {
    components: []
  }
});

const getView = () => viewInstance; // Getter function

const getNewView = () => {
  if (viewInstance) {
    viewInstance.destroy(); // Properly clean up the existing MapView
  }

  viewInstance = new MapView({
    ui: {
      components: []
    }
  });
};

export { getView, getNewView };
