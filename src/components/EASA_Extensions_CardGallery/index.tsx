import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  withConfiguration,
  registerIcon,
  Progress,
  EmptyState,
  ErrorState,
  Flex
} from '@pega/cosmos-react-core';
import { Task } from './Task';
import { loadDetails, getFilters } from './utils';
import { MainCard } from './styles';
import { StyledCardContent } from './styles';
import '../create-nonce';

import * as plusIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/plus.icon';
import * as pencilIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/pencil.icon';

registerIcon(plusIcon, pencilIcon);
type CardGalleryProps = {
  heading: string;
  dataPage: string;
  useInDashboard: boolean;
  numCards?: number;
  createClassname?: string;
  rendering: 'vertical' | 'horizontal';
  minWidth?: string;
  detailsDataPage: string;
  detailsViewName: string;
  getPConnect: any;
  propertyToForward: string;
  addActions: any;
};

export const EasaExtensionsCardGallery = (props: CardGalleryProps) => {
  const {
    dataPage = '',
    useInDashboard = true,
    numCards,
    createClassname = '',
    minWidth = '400px',
    rendering = 'vertical',
    detailsDataPage = '',
    detailsViewName = '',
    propertyToForward = '',
    getPConnect
  } = props;
  const [tasks, setTasks] = useState<any>();
  const filters = useRef<any>({});
  const errorMsg = useRef<string>('');
  const isEmpty = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const getDetails = (id: string, classname: string) => {
    return loadDetails({
      id,
      classname,
      detailsDataPage,
      detailsViewName,
      getPConnect
    });
  };

  const loadTasks = (isFiltered: boolean) => {
    let payload = {};
    errorMsg.current = '';
    if (useInDashboard) {
      const filterExpr = getFilters(filters.current);
      payload = {
        dataViewParameters: {},
        query: {
          ...(filterExpr ? { filter: filterExpr } : null),
          select: [
            {
              field: 'pyLabel'
            },
            {
              field: 'LegalName'
            },
            {
              field: 'pxUpdateDateTime'
            },
            {
              field: 'pyID'
            },
            {
              field: 'pyGUID'
            },
            {
              field: 'pxCommitDateTime'
            },
            {
              field: 'pxCreateDateTime'
            },
            {
              field: 'pxCreateOperator'
            },
            {
              field: 'pxCreateOpName'
            },
            {
              field: 'pxCreateSystemID'
            },
            {
              field: 'pxSaveDateTime'
            },
            {
              field: 'pxUpdateOperator'
            },
            {
              field: 'pxUpdateOpName'
            },
            {
              field: 'pxUpdateSystemID'
            }
          ]
        }
      };
    }
    (window as any).PCore.getDataApiUtils()
      .getData(dataPage, payload)
      .then(async (response: any) => {
        if (!isFiltered) {
          /* First time - no data loaded */
          if (response?.data?.data !== null) {
            const tmpTasks: any = [];
            response.data.data.forEach((item: any) => {
              tmpTasks.push({
                id: item.pyGUID,
                title: item.pyLabel,
                status: item.pyStatusWork,
                classname: createClassname,
                insKey: item.pzInsKey,
                isVisible: true,
                propertyToForward,
                getPConnect,
                properties: { ...item }
              });
            });
            let numTasks = tmpTasks.length;
            if (numTasks > 0) {
              tmpTasks.forEach(async (tmpTask: any) => {
                const details = await getDetails(tmpTask.id, tmpTask.classname);
                tmpTask.details = details;

                numTasks -= 1;
                if (numTasks === 0) {
                  setTasks(tmpTasks);
                  setLoading(false);
                  isEmpty.current = false;
                }
              });
            } else {
              setTasks(tmpTasks);
              setLoading(false);
              isEmpty.current = true;
            }
          } else {
            setTasks([]);
            setLoading(false);
            isEmpty.current = true;
          }
        } else {
          setTasks((prevTasks: any[]) => {
            const tmpTasks: any = [];
            let tmpIsEmpty = true;
            prevTasks?.forEach((tmpTask: any) => {
              let isVisible = false;
              response?.data?.data?.forEach((item: any) => {
                if (item.pyGUID === tmpTask.id) {
                  isVisible = true;
                  tmpIsEmpty = false;
                }
              });
              tmpTasks.push({ ...tmpTask, isVisible });
            });
            isEmpty.current = tmpIsEmpty;
            return tmpTasks;
          });
        }
      })
      .catch((error: any) => {
        if (
          error?.response?.data?.errorDetails?.length > 0 &&
          error.response.data.errorDetails[0].localizedValue
        ) {
          errorMsg.current = error.response.data.errorDetails[0].localizedValue;
        } else {
          errorMsg.current = error.message;
        }
        setLoading(false);
      });
  };

  /* Subscribe to changes to the assignment case */
  useEffect(() => {
    (window as any).PCore.getPubSubUtils().subscribe(
      (window as any).PCore.getEvents().getCaseEvent().ASSIGNMENT_SUBMISSION,
      () => {
        /* If an assignment is updated - force a reload of the events */
        loadTasks(false);
      },
      'ASSIGNMENT_SUBMISSION'
    );
    return () => {
      (window as any).PCore.getPubSubUtils().unsubscribe(
        (window as any).PCore.getEvents().getCaseEvent().ASSIGNMENT_SUBMISSION,
        'ASSIGNMENT_SUBMISSION'
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Subscribe to dashboard filter changes only if useInDashboard is true */
  useEffect(() => {
    if (useInDashboard) {
      (window as any).PCore.getPubSubUtils().subscribe(
        (window as any).PCore.getConstants().PUB_SUB_EVENTS.EVENT_DASHBOARD_FILTER_CHANGE,
        (data: any) => {
          const { filterId, filterExpression } = data;
          if (filterExpression) {
            filters.current[filterId] = filterExpression;
          } else {
            delete filters.current[filterId];
          }
          loadTasks(true);
        },
        'dashboard-component-cardgallery',
        false,
        getPConnect().getContextName()
      );
      (window as any).PCore.getPubSubUtils().subscribe(
        (window as any).PCore.getConstants().PUB_SUB_EVENTS.EVENT_DASHBOARD_FILTER_CLEAR_ALL,
        () => {
          filters.current = {};
          loadTasks(true);
        },
        'dashboard-component-cardgallery',
        false,
        getPConnect().getContextName()
      );
      return () => {
        (window as any).PCore.getPubSubUtils().unsubscribe(
          (window as any).PCore.getConstants().PUB_SUB_EVENTS.EVENT_DASHBOARD_FILTER_CHANGE,
          'dashboard-component-cardgallery',
          getPConnect().getContextName()
        );
        (window as any).PCore.getPubSubUtils().unsubscribe(
          (window as any).PCore.getConstants().PUB_SUB_EVENTS.EVENT_DASHBOARD_FILTER_CLEAR_ALL,
          'dashboard-component-cardgallery',
          getPConnect().getContextName()
        );
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    loadTasks(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCards]);

  const genState = (content: ReactNode) => (
    <Flex container={{ pad: 2 }} height={10}>
      <Flex item={{ grow: 1, alignSelf: 'auto' }}>{content}</Flex>
    </Flex>
  );

  //  let content;
  //  if (loading) {
  //    content = genState(<Progress placement='block' message='Loading content...' />);
  //  } else if (errorMsg.current) {
  //    content = genState(<ErrorState message={errorMsg.current} />);
  //  } else if (isEmpty.current) {
  //    content = genState(<EmptyState message='No items' />);
  //  } else {
  //    content = (
  //      <MainCard rendering={rendering} minWidth={minWidth}>
  //        {tasks?.map((task: any) => (task.isVisible ? <Task key={task.id} {...task} /> : null))}
  //      </MainCard>
  //    );
  //  }

  const content = useMemo(() => {
    if (loading) {
      return genState(<Progress placement='block' message='Loading content...' />);
    }
    if (errorMsg.current) {
      return genState(<ErrorState message={errorMsg.current} />);
    }
    if (isEmpty.current) {
      return genState(<EmptyState message='No items' />);
    }
    return (
      <MainCard rendering={rendering} minWidth={minWidth}>
        {tasks?.map((task: any) => (task.isVisible ? <Task key={task.id} {...task} /> : null))}
      </MainCard>
    );
  }, [loading, tasks, rendering, minWidth]);

  return <StyledCardContent>{content}</StyledCardContent>;
};

export default withConfiguration(EasaExtensionsCardGallery);
