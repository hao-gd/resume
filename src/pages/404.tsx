import React from 'react';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>404</h1>
      <p>
        <FormattedMessage id="页面未找到" defaultMessage="页面未找到" />
      </p>
      <Link to="/">
        <FormattedMessage id="返回首页" defaultMessage="返回首页" />
      </Link>
    </div>
  );
};

export default NotFoundPage;
