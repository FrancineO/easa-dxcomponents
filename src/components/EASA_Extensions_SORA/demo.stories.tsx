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
        disable: true,
      },
    },
  },
  component: EasaExtensionsSORA,
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
            deleteEntry: () => {},
          };
        },
      }),
    }),
  };
};

const genResponse = () => {
  const demoView = {
    name: 'demoView',
    type: 'View',
    config: {
      template: 'Pega_Extensions_SORA',
      ruleClass: 'Work-',
      inheritedProps: [],
    },
    children: [
      {
        name: 'A',
        type: 'Region',
        children: [] as Array<info>,
        getPConnect: () => {},
      },
    ],
    classID: 'Work-MyComponents',
  };
  demoView.children[0].children = [
    {
      config: {
        values: [34, 30, 35],
        value: '@FILTERED_LIST .Positions[].pxPositionLatitude',
      },
      type: 'ScalarList',
    },
    {
      config: {
        values: [-118, -110, -114],
        value: '@FILTERED_LIST .Positions[].pxPositionLongitude',
      },
      type: 'ScalarList',
    },
  ];

  demoView.children[0].getPConnect = () => {
    return {
      getRawMetadata: () => {
        return demoView.children[0];
      },
    };
  };
  return demoView;
};

type Story = StoryObj<typeof EasaExtensionsSORA>;
export const Default: Story = {
  render: (args) => {
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
              deleteEntry: () => {},
            };
          },
          getActionsApi: () => {
            return {
              updateFieldValue: (prop: string, value: string) => {},
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
          },
        };
      },
    };
    return <EasaExtensionsSORA {...props}></EasaExtensionsSORA>;
  },
  args: {
    height: '40rem',
    controlledGroundArea: false,
    mapStateJSON: null,
    // mapStateJSON:
    //   '{"center": {"latitude": 53, "longitude": 16 },"zoom": 3,"basemap": "86265e5a4bbb4187a59719cf134e0018","layerVisibility": { "PopulationDensity": false, "Geozones": true }}',
    flightPathJSON: null,
    // flightPathJSON:
    //   '{"spatialReference":{"latestWkid":3857,"wkid":102100},"paths":[[[775678.2918865071,6818734.746604987],[1190387.388847621,7123737.59871983],[1363115.963515002,6924428.047466287]]],"type":"polyline"}',
    sGPS: 3,
    sPos: 3,
    sK: 3,
    vO: 10,
    criticalArea: 7.1,
    tR: 2,
    tP: 2,
    terminateWithParachute: false,
    multirotor: true,
    maxRollAngle: 25,
    maxPitchAngle: 25,
    hFG: 100,
    hAM: 1,
    simplified: true,
    ballisticApproach: false,
    cd: 1,
    vWind: 10,
    vZ: 10,
    power: true,
    cL: 0.5,
    gliding: true,
    E: 10,
    // To get token for agol use POSTMAN
    // method: POST
    // url: https://easa.maps.arcgis.com/sharing/rest/generateToken
    // username: James Eyre
    // password: <see keeper>
    // f: json
    // referer: https://easa.maps.arcgis.com/sharing/generateToken
    // client: http://localhost:6006/
    // expiration: 21600
    agolToken:
      'mzFcMRqhxzPAoRJavp2MJnT86fp9vdIuHnlcY6yRjycMNMkD4n52uRAbbfniWAIwks94-EJLha6IdQELPZ0v1cmjoLbnRJ2pQ2e-F8cR2l6WXI5bTE7ww9hODBAGP8pg3QJ50ENJ9RUiCvfpYWctq9dPxRe_iDlo036Ka5YYiZs.',
    agolUrl: 'https://easa.maps.arcgis.com/',
    printServiceUrl:
      'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
    printWidth: 1000,
    printHeight: 300,
    printFormat: 'jpg',
    printDpi: 300,
    popDensityPortalItemId: '80efb859d34a4a8f9141a31768b3fa65',
    basemapPortalItemIds:
      '979c6cc89af9449cbeb5342a439c6a76,86265e5a4bbb4187a59719cf134e0018,67372ff42cd145319639a99152b15bc3',
    landusePortalItemId: '87919279e9394adb9ba4f3f8009e1360',
    geozonePortalItemId: 'a0bdecf836b843a9ad3d2eadcb590dc6',
  },
};
