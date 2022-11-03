import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import {helpers} from '../../helpers';
import Layout from '../../layouts/_setLayout';
import { ContextConsumer } from '../../state/rootContext';
import { NextPageWithLayout } from '../_app';

const Clients: NextPageWithLayout = () => {
  return (
    <h1>Clients</h1>
  )
}

export default Clients

Clients.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
          {page}
      </Layout>
  );
}  