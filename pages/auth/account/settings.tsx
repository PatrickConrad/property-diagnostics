import React, { ReactElement } from 'react'
import Layout from '../../../layouts/_setLayout'
import { NextPageWithLayout } from '../../_app'

const Settings: NextPageWithLayout = () => {
  return (
    <div>settings</div>
  )
}

export default Settings

Settings.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    );
}