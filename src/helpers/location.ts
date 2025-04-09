import qs from 'query-string';

interface QueryParams {
  user?: string;
  branch?: string;
  mode?: string;
  template?: string;
  data?: string;
}

export function getSearchObj(): QueryParams {
  const search = typeof window !== 'undefined' && window.location.search;
  const query = qs.parse(search);

  return {
    user: query.user as string,
    branch: query.branch as string,
    mode: query.mode as string,
    template: query.template as string,
    data: query.data as string,
  };
}
