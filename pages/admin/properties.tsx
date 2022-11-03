import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import {helpers} from '../../helpers';
import Layout from '../../layouts/_setLayout';
import { ContextConsumer } from '../../state/rootContext';
import { IAccess } from '../../types/accessTypes';
import { NextPageWithLayout } from '../_app';

const Properties: NextPageWithLayout = () => {
   return(
    <h1>Admin Properties</h1>
  )
}

export default Properties

Properties.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
          {page}
      </Layout>
  );
}  