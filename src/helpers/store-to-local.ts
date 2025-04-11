import { message } from 'antd';
import type { ResumeConfig } from '@/components/types';
import { customAssign } from '@/helpers/customAssign';
import _ from 'lodash-es';
import { RESUME_INFO } from '@/data/resume';
import { fetchResume } from './fetch-resume';
import { intl } from '@/i18n';

const DEFAULT_USER = 'visiky';
export const LOCAL_KEY = user => `${user || DEFAULT_USER}-resume-config`;

export async function getConfig(
  lang: string,
  branch: string,
  user?: string
): Promise<ResumeConfig> {
  user = user || DEFAULT_USER;
  // 先从本地缓存获取，否则从远程拉取
  if (typeof localStorage !== 'undefined') {
    const config = localStorage.getItem(LOCAL_KEY(user));
    let result;
    try {
      result = JSON.parse(config || undefined);
    } catch (e) {}
    if (result) {
      return Promise.resolve(result);
    }
  }

  return fetchResume(lang, branch, user).catch(() => {
    message.warn(intl.formatMessage({ id: '从模板中获取' }), 1);
    return _.omit(
      customAssign({}, RESUME_INFO, _.get(RESUME_INFO, ['locales', lang])),
      ['locales']
    );
  });
}

export const saveToLocalStorage: (
  user: string,
  config: ResumeConfig
) => void = _.throttle((user: string, config: ResumeConfig) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LOCAL_KEY(user), JSON.stringify(config));
    message.success(intl.formatMessage({ id: '已缓存在本地' }), 0.65);
  }
}, 5000);
