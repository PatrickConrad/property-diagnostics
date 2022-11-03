import React, { ReactElement } from 'react'
import Layout from '../../../../../layouts/_setLayout';
import { NextPageWithLayout } from '../../../../_app';

const Images: NextPageWithLayout = () => {
  return (
    <div>Images</div>
  )
}

export default Images


Images.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
          {page}
      </Layout>
  )
}