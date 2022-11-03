import React, { ReactElement } from 'react'
import Layout from '../../layouts/_setLayout'
import { NextPageWithLayout } from '../_app'

const Messages: NextPageWithLayout = () => {
  return (
    <div>messages</div>
  )
}

export default Messages

Messages.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    );
}  