export function parseQueryString(queryString: string) {
  const result: Record<string, string> = {};
  const params = new URLSearchParams(queryString);

  for (const [key, value] of params.entries()) {
    const jsonValue = decodeURIComponent(value);

    if (jsonValue.startsWith("[") && jsonValue.endsWith("]")) {
      try {
        result[key] = JSON.parse(jsonValue);
        continue;
      } catch (err) {
        // Fall through to return the decoded string if JSON.parse fails.
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function setSearchParams(paramsObj: Record<string, unknown>) {
  const params = new URLSearchParams(window.location.search);

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length)
        params.set(key, encodeURIComponent(JSON.stringify(value)));
    } else if (value) {
      params.set(key, String(value));
    }
  });

  window.history.pushState({}, "", `?${params.toString()}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function resetSearchParamsFilters() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");

  const newParams = new URLSearchParams();

  if (page !== null) {
    newParams.set("page", page);
  }

  window.history.pushState({}, "", `?${newParams.toString()}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
