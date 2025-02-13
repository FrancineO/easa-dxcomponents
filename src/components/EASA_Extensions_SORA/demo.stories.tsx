import type { StoryObj } from '@storybook/react';
import { EasaExtensionsSORA } from './index';

type configInfo = {
  values?: Array<any>;
  value?: string;
  componentType?: string;
  label?: string;
};

type info = {
  config: configInfo;
  type: string;
  children?: Array<info>;
};

export default {
  title: 'Templates/SORA',
  argTypes: {
    getPConnect: {
      table: {
        disable: true
      }
    }
  },
  component: EasaExtensionsSORA
};

const genComponent = (config: any) => {
  return config.config.text;
};

const setPCore = () => {
  (window as any).PCore = {
    createPConnect: () => ({
      getPConnect: () => ({
        getActionsApi: () => ({ updateFieldValue: () => {} }),
        getContextName: () => '',
        getValue: () => 'C-123',
        getListActions: () => {
          return {
            update: () => {},
            deleteEntry: () => {}
          };
        }
      })
    })
  };
};

const genResponse = () => {
  const demoView = {
    name: 'demoView',
    type: 'View',
    config: {
      template: 'Pega_Extensions_SORA',
      ruleClass: 'Work-',
      inheritedProps: []
    },
    children: [
      {
        name: 'A',
        type: 'Region',
        children: [] as Array<info>,
        getPConnect: () => {}
      }
    ],
    classID: 'Work-MyComponents'
  };
  demoView.children[0].children = [
    {
      config: {
        values: [34, 30, 35],
        value: '@FILTERED_LIST .Positions[].pxPositionLatitude'
      },
      type: 'ScalarList'
    },
    {
      config: {
        values: [-118, -110, -114],
        value: '@FILTERED_LIST .Positions[].pxPositionLongitude'
      },
      type: 'ScalarList'
    }
  ];

  demoView.children[0].getPConnect = () => {
    return {
      getRawMetadata: () => {
        return demoView.children[0];
      }
    };
  };
  return demoView;
};

type Story = StoryObj<typeof EasaExtensionsSORA>;
export const Default: Story = {
  render: args => {
    const response = genResponse();
    setPCore();
    const props = {
      template: 'SORALayout',
      ...args,
      getPConnect: () => {
        return {
          getListActions: () => {
            return {
              update: () => {},
              deleteEntry: () => {}
            };
          },
          getActionsApi: () => {
            return {
              updateFieldValue: (prop: string, value: string) => {}
            };
          },
          getChildren: () => {
            return response.children;
          },
          getRawMetadata: () => {
            return response;
          },
          getInheritedProps: () => {
            return response.config.inheritedProps;
          },
          getContextName: () => {
            return 'primary';
          },
          getTarget: () => {
            return 'caseInfo';
          },
          createComponent: (config: any) => {
            return genComponent(config);
          },
          setInheritedProp: () => {
            /* nothing */
          },
          setValue: () => {
            /* nothing */
          },
          getValue: () => {
            /* nothing */
          },
          resolveConfigProps: (f: any) => {
            return { value: f.values };
          }
        };
      }
    };
    return <EasaExtensionsSORA {...props}></EasaExtensionsSORA>;
  },
  args: {
    height: '40rem',
    latitude: 38.7223,
    longitude: -9.1393,
    zoom: 8,
    controlledGroundArea: false,
    flightPathJSON:
      '{"spatialReference":{"latestWkid":3857,"wkid":102100},"rings":[[[-983315.5512089686,4628094.701973546],[-969117.3732049979,4630679.228992439],[-973215.1145182232,4624162.972331126],[-983315.5512089686,4628094.701973546]]]}',
    sGPS: 3,
    sPos: 3,
    sK: 3,
    vO: 10,
    tR: 2,

    tP: 2,
    parachute: true,
    multirotor: true,
    rollAngle: 25,
    hFG: 100,
    hAM: 3,
    simplified: true,
    cd: 1,
    vWind: 10,
    vZ: 10,
    power: true,
    cL: 0.5,
    gliding: true,
    agolToken:
      'mzFcMRqhxzPAoRJavp2MJnT86fp9vdIuHnlcY6yRjycMNMkD4n52uRAbbfniWAIwF7xC9LSoqABJqPl9Q31E_gpA6DFwfyAZreIzmxYXs3AC2UzS8P57XC89gaBRnCMm3zsT6OphM7-kRsQ5aY09VUl_x7V_OpqRzcj8b1Z3N3M.',
    agolUrl: 'https://easa.maps.arcgis.com/',
    printServiceUrl:
      'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
    printWidth: 1000,
    printHeight: 300,
    printFormat: 'jpg',
    printDpi: 300,
    popDensityPortalItemId: '0bfa97c0648449069cf45586578459c5',
    basemapPortalItemId: '979c6cc89af9449cbeb5342a439c6a76',
    landusePortalItemId: '87919279e9394adb9ba4f3f8009e1360',
    geozonePortalItemId: 'e632deb3526647aaa864e2b89e92c738'
  }
};
