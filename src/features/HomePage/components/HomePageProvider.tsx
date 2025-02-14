import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from "react";
import { propertyHttpService } from "src/services/http/property.service";

import type { PropertyDeal } from "src/features/Property/components/types";
import { parseQueryString } from "src/utils/url";

type ActionType = "SUCCESS" | "ERROR" | "LOADING";

type Action = {
  type: ActionType;
  data?: {
    deals?: PropertyDeal[];
    total?: number;
    pageSize: number;
  };
  error?: string;
};

type HomePageContextValue = {
  data?: {
    deals?: PropertyDeal[];
    total?: number;
    pageSize: number;
  };
  isLoading: boolean;
  error?: string;
  searchParams?: Record<string, string>;
};

const HomePageContext = createContext<HomePageContextValue>(
  null as unknown as HomePageContextValue,
);

const reducer = (state: HomePageContextValue, action: Action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        data: action.data,
        isLoading: false,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const initialState: HomePageContextValue = {
  data: {
    deals: [],
    total: 0,
    pageSize: 20,
  },
  isLoading: true,
};

type Props = {
  children: React.ReactNode;
};

export const HomePageProvider = ({ children }: Props) => {
  const [searchParams, setSearchParamsState] = useState<Record<string, string>>(
    {},
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const getDeals = useCallback(async () => {
    const { page, sort, ...filters } = parseQueryString(window.location.search);

    dispatch({ type: "LOADING" });

    const dealsResponse = await propertyHttpService.getDeals({
      page: parseInt(page ?? "") || 1,
      sort: sort as "newest" | "oldest",
      filters,
    });

    console.log(dealsResponse?.deals);

    // TODO: Not ideal, but okay for now
    if (!dealsResponse?.deals) {
      dispatch({ type: "ERROR", error: "no deals found" });
      return;
    }

    dispatch({
      type: "SUCCESS",
      data: {
        deals: dealsResponse.deals,
        total: dealsResponse.total,
        pageSize: dealsResponse.pageSize,
      },
    });
  }, []);

  useEffect(() => {
    // page change fetch. use react-router instead but ok for now
    const handleGetDeals = () => {
      const params = parseQueryString(window.location.search);
      setSearchParamsState(params);
      getDeals();
    };

    // initial fetch
    handleGetDeals();

    window.addEventListener("popstate", handleGetDeals);

    return () => window.removeEventListener("popstate", handleGetDeals);
  }, [getDeals]);

  return (
    <HomePageContext value={{ ...state, searchParams }}>
      {children}
    </HomePageContext>
  );
};

export const useHomePageContext = () => useContext(HomePageContext);
